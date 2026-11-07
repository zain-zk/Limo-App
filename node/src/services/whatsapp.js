/**
 * WhatsApp admin alerts via Twilio's WhatsApp channel.
 * Reuses TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN.
 * Sends only when TWILIO_WHATSAPP_NUMBER and a destination number are set.
 * SMS (TWILIO_PHONE_NUMBER) is independent and is not used as the sender.
 *
 * Destination: ADMIN_WHATSAPP, or ADMIN_PHONE when that looks like a usable number.
 * If TWILIO_WHATSAPP_CONTENT_SID is set, send that approved template.
 * Otherwise send a free-form body (Twilio sandbox / open 24-hour session).
 */

const CONTENT_VARIABLES = [
  ['1', (booking) => booking.fullName],
  ['2', (booking) => booking.email],
  ['3', (booking) => booking.phone],
  ['4', (booking) => booking.preferredContactMethod || 'phone'],
  ['5', (booking) => booking.serviceType],
  ['6', (booking) => booking.vehicleSelection],
  ['7', (booking) => booking.date],
  ['8', (booking) => booking.time],
  ['9', (booking) => booking.passengers],
  ['10', (booking) => booking.luggage],
  ['11', (booking) => booking.pickupAddress],
  ['12', (booking) => booking.dropoffAddress],
  ['13', (booking) => booking.flightNumber],
];

/**
 * Normalize a phone value to E.164 (+ and digits).
 * Accepts formatting, a leading whatsapp: prefix, and 00 international prefixes.
 * A 10-digit number is treated as North American and prefixed with +1.
 * Returns null when the value is missing or not a usable number.
 */
export function toE164(value) {
  if (value == null) return null;
  let raw = String(value).trim();
  if (!raw) return null;

  raw = raw.replace(/^whatsapp:/i, '').trim();
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.length === 10) digits = `1${digits}`;
  if (digits.length < 8 || digits.length > 15) return null;
  if (digits.startsWith('0')) return null;
  return `+${digits}`;
}

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

function templateValue(value) {
  const text = String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/ {4,}/g, ' ')
    .trim();
  if (!text) return 'N/A';
  return text.length > 1024 ? text.slice(0, 1024) : text;
}

function buildContentVariables(booking) {
  const variables = {};
  for (const [key, read] of CONTENT_VARIABLES) {
    variables[key] = templateValue(read(booking));
  }
  return variables;
}

function resolveDestination(env) {
  const dedicatedRaw = String(env.ADMIN_WHATSAPP || '').trim();
  if (dedicatedRaw) {
    const dedicated = toE164(dedicatedRaw);
    if (dedicated) return dedicated;
    console.warn('[WhatsApp] ADMIN_WHATSAPP is not a usable number; trying ADMIN_PHONE');
  }
  return toE164(env.ADMIN_PHONE);
}

function planBookingWhatsApp(booking, env = process.env) {
  const message = buildBookingMessage(booking);
  const from = toE164(env.TWILIO_WHATSAPP_NUMBER);
  const to = resolveDestination(env);
  const contentSid = String(env.TWILIO_WHATSAPP_CONTENT_SID || '').trim();
  const configured = Boolean(env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && from && to);

  if (!configured) {
    return { configured: false, message };
  }

  const payload = {
    from: `whatsapp:${from}`,
    to: `whatsapp:${to}`,
  };

  if (contentSid) {
    payload.contentSid = contentSid;
    payload.contentVariables = JSON.stringify(buildContentVariables(booking));
    return { configured: true, message, payload, mode: 'template' };
  }

  payload.body = message;
  return { configured: true, message, payload, mode: 'body' };
}

async function deliverViaTwilio(payload, env) {
  const twilio = (await import('twilio')).default;
  const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  await client.messages.create(payload);
}

/**
 * @param {object} booking
 * @param {{ env?: NodeJS.ProcessEnv, deliver?: (payload: object, env: NodeJS.ProcessEnv) => Promise<void> }} [options]
 * Tests pass `deliver` so the Twilio call can be asserted without a network request.
 */
export async function sendBookingWhatsApp(booking, options = {}) {
  const env = options.env ?? process.env;
  const deliver = options.deliver ?? deliverViaTwilio;
  const plan = planBookingWhatsApp(booking, env);

  if (!plan.configured) {
    console.log('[WhatsApp] Dev mode — notification logged:\n', plan.message);
    return { sent: false, provider: 'console', message: plan.message };
  }

  await deliver(plan.payload, env);
  console.log(`[WhatsApp] Sent via Twilio (${plan.mode}) to`, plan.payload.to);
  return { sent: true, provider: 'twilio', mode: plan.mode };
}
