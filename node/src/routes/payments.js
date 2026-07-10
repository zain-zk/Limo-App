import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import {
  getFrontendUrl,
  getStripe,
  getStripeCurrency,
  isStripeConfigured,
  toStripeAmount,
} from '../services/stripe.js';

const router = Router();

/**
 * Admin: create (or reuse) a Stripe Checkout Session for a quoted booking.
 * POST /api/payments/create-checkout
 * Body: { bookingId }
 */
router.post('/create-checkout', requireAuth, async (req, res) => {
  try {
    if (!isStripeConfigured()) {
      return res.status(503).json({
        error: 'Stripe is not configured',
        hint: 'Add STRIPE_SECRET_KEY to node/.env (use Stripe test keys for local development)',
      });
    }

    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ error: 'bookingId is required' });
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.paymentStatus === 'paid') {
      return res.status(400).json({ error: 'This booking is already paid' });
    }

    const amount = Number(booking.quoteAmount);
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Save a quote amount greater than 0 before creating a payment link' });
    }

    const stripe = getStripe();
    const frontendUrl = getFrontendUrl();
    const currency = getStripeCurrency();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: toStripeAmount(amount),
            product_data: {
              name: `High5 Limo — ${booking.serviceType}`,
              description: [
                `${booking.date} ${booking.time}`,
                `${booking.pickupAddress} → ${booking.dropoffAddress}`,
                booking.quoteNotes || null,
              ].filter(Boolean).join(' · '),
            },
          },
        },
      ],
      metadata: {
        bookingId: booking.id,
      },
      success_url: `${frontendUrl}/payment/success?booking_id=${booking.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/payment/cancelled?booking_id=${booking.id}`,
    });

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        stripeSessionId: session.id,
        paymentUrl: session.url,
        paymentStatus: 'pending',
        paymentMethod: 'online',
        status: booking.status === 'new' ? 'pending_quote' : booking.status,
      },
    });

    res.json({
      success: true,
      url: session.url,
      sessionId: session.id,
      booking: updated,
    });
  } catch (err) {
    console.error('[Stripe] create-checkout failed:', err.message);
    res.status(500).json({ error: err.message || 'Failed to create payment link' });
  }
});

/**
 * Public: verify a Checkout session after redirect (useful before/without webhook locally).
 * GET /api/payments/session/:sessionId
 */
router.get('/session/:sessionId', async (req, res) => {
  try {
    if (!isStripeConfigured()) {
      return res.status(503).json({ error: 'Stripe is not configured' });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    const bookingId = session.metadata?.bookingId;

    let booking = null;
    if (bookingId) {
      booking = await prisma.booking.findUnique({ where: { id: bookingId } });

      // Sync DB if webhook hasn't run yet (common in local/dev without Stripe CLI)
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
      }
    }

    res.json({
      sessionId: session.id,
      paymentStatus: session.payment_status,
      booking,
    });
  } catch (err) {
    console.error('[Stripe] session lookup failed:', err.message);
    res.status(400).json({ error: err.message || 'Invalid session' });
  }
});

export default router;

/**
 * Stripe webhook — must be mounted with express.raw on the main app.
 * Handles checkout.session.completed
 */
export async function handleStripeWebhook(req, res) {
  if (!isStripeConfigured()) {
    return res.status(503).json({ error: 'Stripe is not configured' });
  }

  const stripe = getStripe();
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } else {
      // Dev fallback when webhook secret is not set (not secure for production)
      event = typeof req.body === 'string' || Buffer.isBuffer(req.body)
        ? JSON.parse(req.body.toString())
        : req.body;
      console.warn('[Stripe] WEBHOOK_SECRET missing — parsing body without signature verification (dev only)');
    }
  } catch (err) {
    console.error('[Stripe] Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      try {
        await prisma.booking.update({
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
      } catch (err) {
        console.error('[Stripe] Failed to update booking after payment:', err.message);
      }
    }
  }

  res.json({ received: true });
}
