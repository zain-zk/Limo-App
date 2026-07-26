import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { createCheckoutForBooking } from '../services/payments.js';
import { sendPaymentConfirmationEmail } from '../services/email.js';

const router = Router();

router.post('/create-checkout', requireAuth, async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ error: 'bookingId is required' });
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const result = await createCheckoutForBooking(booking);

    res.json({
      success: true,
      url: result.url,
      sessionId: result.sessionId,
      booking: result.booking,
    });
  } catch (err) {
    console.error('[Stripe] create-checkout failed:', err.message);
    const status = err.message.includes('not configured') ? 503 : 500;
    res.status(status).json({ error: err.message || 'Failed to create payment link' });
  }
});

router.get('/session/:sessionId', async (req, res) => {
  try {
    const { getStripe, isStripeConfigured } = await import('../services/payments.js');
    if (!isStripeConfigured()) {
      return res.status(503).json({ error: 'Stripe is not configured' });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    const bookingId = session.metadata?.bookingId;

    let booking = null;
    if (bookingId) {
      booking = await prisma.booking.findUnique({ where: { id: bookingId } });

      if (session.payment_status === 'paid' && booking && booking.paymentStatus !== 'paid') {
        booking = await prisma.booking.update({
          where: { id: bookingId },
          data: {
            paymentStatus: 'paid',
            status: 'confirmed',
            stripePaymentIntentId:
              typeof session.payment_intent === 'string'
                ? session.payment_intent
                : session.payment_intent?.id || booking.stripePaymentIntentId,
            paidAt: new Date(),
          },
        });
        try {
          await sendPaymentConfirmationEmail(booking);
        } catch (err) {
          console.error('[Email] Payment confirmation failed:', err.message);
        }
      }
    }

    // Public success page only needs a minimal booking snapshot (no PII dump).
    const publicBooking = booking
      ? {
          id: booking.id,
          status: booking.status,
          paymentStatus: booking.paymentStatus,
          quoteAmount: booking.quoteAmount,
          paidAt: booking.paidAt,
        }
      : null;

    res.json({
      sessionId: session.id,
      paymentStatus: session.payment_status,
      booking: publicBooking,
    });
  } catch (err) {
    console.error('[Stripe] session lookup failed:', err.message);
    res.status(400).json({ error: err.message || 'Invalid session' });
  }
});

export default router;

export async function handleStripeWebhook(req, res) {
  const { getStripe, isStripeConfigured } = await import('../services/payments.js');
  if (!isStripeConfigured()) {
    return res.status(503).json({ error: 'Stripe is not configured' });
  }

  const stripe = getStripe();
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!webhookSecret) {
    console.error('[Stripe] STRIPE_WEBHOOK_SECRET is required — rejecting webhook');
    return res.status(503).json({ error: 'Stripe webhook is not configured' });
  }

  if (!signature) {
    return res.status(400).send('Webhook Error: Missing stripe-signature header');
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error('[Stripe] Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      try {
        const booking = await prisma.booking.update({
          where: { id: bookingId },
          data: {
            paymentStatus: 'paid',
            status: 'confirmed',
            stripeSessionId: session.id,
            stripePaymentIntentId:
              typeof session.payment_intent === 'string'
                ? session.payment_intent
                : session.payment_intent?.id || null,
            paidAt: new Date(),
          },
        });
        console.log(`[Stripe] Booking ${bookingId} marked paid + confirmed`);
        try {
          await sendPaymentConfirmationEmail(booking);
        } catch (err) {
          console.error('[Email] Payment confirmation failed:', err.message);
        }
      } catch (err) {
        console.error('[Stripe] Failed to update booking after payment:', err.message);
      }
    }
  }

  res.json({ received: true });
}
