import {
  getFrontendUrl,
  getStripe,
  getStripeCurrency,
  isStripeConfigured,
  toStripeAmount,
} from './stripe.js';
import { prisma } from '../db.js';

/**
 * Create a Stripe Checkout Session for a quoted booking.
 * Returns { url, sessionId, booking }
 */
export async function createCheckoutForBooking(booking) {
  if (!isStripeConfigured()) {
    throw new Error('Stripe is not configured');
  }

  const amount = Number(booking.quoteAmount);
  if (!amount || amount <= 0) {
    throw new Error('Quote amount must be greater than 0');
  }

  if (booking.paymentStatus === 'paid') {
    throw new Error('Booking is already paid');
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
    metadata: { bookingId: booking.id },
    success_url: `${frontendUrl}/payment/success?booking_id=${booking.id}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${frontendUrl}/payment/cancelled?booking_id=${booking.id}`,
  });

  const updated = await prisma.booking.update({
    where: { id: booking.id },
    data: {
      stripeSessionId: session.id,
      paymentUrl: session.url,
      paymentStatus: booking.paymentStatus === 'pay_driver' ? 'pending' : 'pending',
      paymentMethod: 'online',
      status: booking.status === 'new' ? 'pending_quote' : booking.status,
    },
  });

  return { url: session.url, sessionId: session.id, booking: updated };
}

export { isStripeConfigured, getStripe, getFrontendUrl, getStripeCurrency, toStripeAmount };
