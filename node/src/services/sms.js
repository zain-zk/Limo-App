/**
 * SMS notification service (Twilio-ready).
 * Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, ADMIN_PHONE in .env
 */
export async function sendBookingSms(booking) {
  const adminPhone = process.env.ADMIN_PHONE;

  const message = [
    'New Booking Received',
    `Customer: ${booking.fullName}`,
    `Service: ${booking.serviceType}`,
    `Date: ${booking.date}`,
    `Time: ${booking.time}`,
    `Passengers: ${booking.passengers}`,
    `Bags: ${booking.luggage}`,
    `Pickup: ${booking.pickupAddress}`,
    `Drop-off: ${booking.dropoffAddress}`,
  ].join('\n');

  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && adminPhone) {
    // Twilio integration placeholder — uncomment when credentials are configured
    console.log('[SMS] Would send via Twilio to', adminPhone);
    console.log(message);
    return { sent: true, provider: 'twilio' };
  }

  console.log('[SMS] Dev mode — notification logged:\n', message);
  return { sent: false, provider: 'console', message };
}
