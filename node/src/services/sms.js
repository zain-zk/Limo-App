/**
 * SMS notification service (Twilio).
 * Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, ADMIN_PHONE in .env
 */

function buildBookingMessage(booking) {
  return [
    'New Booking Received',
    `Customer: ${booking.fullName}`,
    booking.email ? `Email: ${booking.email}` : null,
    `Phone: ${booking.phone}`,
    `Contact via: ${booking.preferredContactMethod || 'phone'}`,
    `Service: ${booking.serviceType}`,
    booking.vehicleSelection ? `Vehicle: ${booking.vehicleSelection}` : null,
    `Date: ${booking.date}`,
    `Time: ${booking.time}`,
    `Passengers: ${booking.passengers}`,
    `Bags: ${booking.luggage}`,
    `Pickup: ${booking.pickupAddress}`,
    `Drop-off: ${booking.dropoffAddress}`,
    booking.flightNumber ? `Flight: ${booking.flightNumber}` : null,
  ].filter(Boolean).join('\n');
}

export async function sendBookingSms(booking) {
  const adminPhone = process.env.ADMIN_PHONE;
  const message = buildBookingMessage(booking);

  if (
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER &&
    adminPhone
  ) {
    const twilio = (await import('twilio')).default;
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: adminPhone,
    });

    console.log('[SMS] Sent via Twilio to', adminPhone);
    return { sent: true, provider: 'twilio' };
  }

  console.log('[SMS] Dev mode — notification logged:\n', message);
  return { sent: false, provider: 'console', message };
}
