import Stripe from 'stripe';

let stripeClient = null;

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

export function getStripe() {
  if (!isStripeConfigured()) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY in node/.env');
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  return stripeClient;
}

export function getFrontendUrl() {
  return (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
}

export function getStripeCurrency() {
  return (process.env.STRIPE_CURRENCY || 'cad').toLowerCase();
}

/** Convert CAD dollars to Stripe's smallest currency unit (cents). */
export function toStripeAmount(amountCad) {
  return Math.round(Number(amountCad) * 100);
}
