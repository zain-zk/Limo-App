/**
 * Email notifications via Resend (https://resend.com).
 * Set RESEND_API_KEY and EMAIL_FROM in .env
 */

function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

async function sendEmail({ to, subject, html, text }) {
  if (!isEmailConfigured()) {
    console.log('[Email] Dev mode — would send to', to);
    console.log('[Email] Subject:', subject);
    console.log('[Email] Body:', text || html?.slice(0, 200));
    return { sent: false, provider: 'console' };
  }

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return { sent: true, provider: 'resend', id: result.data?.id };
}

export async function sendBookingAckEmail(booking) {
  if (!booking.email?.trim()) return { sent: false, reason: 'no_email' };

  const subject = 'High5 Limo — Booking Request Received';
  const text = [
    `Hi ${booking.fullName},`,
    '',
    'Thank you for choosing High5 Limo. We received your booking request:',
    '',
    `Date: ${booking.date} at ${booking.time}`,
    `Pickup: ${booking.pickupAddress}`,
    `Drop-off: ${booking.dropoffAddress}`,
    `Service: ${booking.serviceType}`,
    booking.vehicleSelection ? `Vehicle: ${booking.vehicleSelection}` : null,
    '',
    'Our team will contact you shortly with a personalized quote.',
    '',
    'High5 Limo',
  ].filter(Boolean).join('\n');

  const html = text.replace(/\n/g, '<br>');

  return sendEmail({ to: booking.email, subject, html, text });
}

export async function sendQuoteEmail(booking, paymentUrl = null) {
  if (!booking.email?.trim()) return { sent: false, reason: 'no_email' };

  const amount = booking.quoteAmount != null ? `$${Number(booking.quoteAmount).toFixed(2)} CAD` : 'TBD';
  const subject = 'High5 Limo — Your Quote';

  const lines = [
    `Hi ${booking.fullName},`,
    '',
    'Your personalized quote is ready:',
    '',
    `Amount: ${amount}`,
    booking.quoteNotes ? `Notes: ${booking.quoteNotes}` : null,
    '',
    paymentUrl
      ? `Pay online securely: ${paymentUrl}`
      : booking.paymentMethod === 'driver'
        ? 'You selected Pay Driver — payment will be collected during your ride.'
        : 'Our team will follow up with payment details.',
    '',
    'High5 Limo',
  ].filter(Boolean);

  const text = lines.join('\n');
  const html = text.replace(/\n/g, '<br>');

  return sendEmail({ to: booking.email, subject, html, text });
}

export async function sendPaymentConfirmationEmail(booking) {
  if (!booking.email?.trim()) return { sent: false, reason: 'no_email' };

  const subject = 'High5 Limo — Payment Confirmed';
  const text = [
    `Hi ${booking.fullName},`,
    '',
    'Your payment has been received. Your ride is confirmed!',
    '',
    `Date: ${booking.date} at ${booking.time}`,
    `Pickup: ${booking.pickupAddress}`,
    booking.quoteAmount != null ? `Amount paid: $${Number(booking.quoteAmount).toFixed(2)} CAD` : null,
    '',
    'Our team will contact you with trip details before your pickup.',
    '',
    'High5 Limo',
  ].filter(Boolean).join('\n');

  const html = text.replace(/\n/g, '<br>');
  return sendEmail({ to: booking.email, subject, html, text });
}

export { isEmailConfigured };
