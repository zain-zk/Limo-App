import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { sendBookingWhatsApp, toE164 } from '../src/services/whatsapp.js';

const booking = {
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  phone: '+1 416 555 0199',
  preferredContactMethod: 'email',
  serviceType: 'Airport Transfer',
  vehicleSelection: 'Executive Sedan',
  date: '2026-11-08',
  time: '14:30',
  passengers: '2',
  luggage: '3',
  pickupAddress: 'YYZ Terminal 1',
  dropoffAddress: '100 King St W, Toronto',
  flightNumber: 'AC123',
};

const configured = {
  TWILIO_ACCOUNT_SID: 'ACxxxxxxxx',
  TWILIO_AUTH_TOKEN: 'test-token',
  TWILIO_WHATSAPP_NUMBER: '+1 415 523 8886',
  ADMIN_WHATSAPP: '+1 (416) 555-0100',
};

describe('toE164', () => {
  test('normalizes formatting, whatsapp prefix, and 10-digit NANP numbers', () => {
    assert.equal(toE164('+1 (415) 523-8886'), '+14155238886');
    assert.equal(toE164('whatsapp:+14165550100'), '+14165550100');
    assert.equal(toE164('4165550100'), '+14165550100');
    assert.equal(toE164('0044 20 7946 0958'), '+442079460958');
  });

  test('rejects missing and unusable values', () => {
    assert.equal(toE164(''), null);
    assert.equal(toE164('   '), null);
    assert.equal(toE164('admin'), null);
    assert.equal(toE164('555-0199'), null);
    assert.equal(toE164(null), null);
  });
});

describe('sendBookingWhatsApp', () => {
  test('logs a console fallback when WhatsApp is not configured', async () => {
    let called = false;
    const result = await sendBookingWhatsApp(booking, {
      env: { TWILIO_PHONE_NUMBER: '+14165550000', ADMIN_PHONE: '+14165550100' },
      deliver: async () => {
        called = true;
      },
    });

    assert.equal(called, false);
    assert.equal(result.sent, false);
    assert.equal(result.provider, 'console');
    assert.match(result.message, /Customer: Ada Lovelace/);
    assert.match(result.message, /Email: ada@example.com/);
    assert.match(result.message, /Phone: \+1 416 555 0199/);
    assert.match(result.message, /Contact via: email/);
    assert.match(result.message, /Service: Airport Transfer/);
    assert.match(result.message, /Vehicle: Executive Sedan/);
    assert.match(result.message, /Date: 2026-11-08/);
    assert.match(result.message, /Time: 14:30/);
    assert.match(result.message, /Passengers: 2/);
    assert.match(result.message, /Bags: 3/);
    assert.match(result.message, /Pickup: YYZ Terminal 1/);
    assert.match(result.message, /Drop-off: 100 King St W, Toronto/);
    assert.match(result.message, /Flight: AC123/);
  });

  test('omits empty vehicle and flight lines from the free-form body', async () => {
    const result = await sendBookingWhatsApp(
      { ...booking, vehicleSelection: '', flightNumber: null, email: '' },
      { env: {} },
    );

    assert.doesNotMatch(result.message, /Vehicle:/);
    assert.doesNotMatch(result.message, /Flight:/);
    assert.doesNotMatch(result.message, /Email:/);
    assert.match(result.message, /Contact via: email/);
  });

  test('sends a session body when configured without a template', async () => {
    let payload;
    const result = await sendBookingWhatsApp(booking, {
      env: { ...configured, TWILIO_WHATSAPP_CONTENT_SID: '   ', TWILIO_PHONE_NUMBER: '' },
      deliver: async (body) => {
        payload = body;
      },
    });

    assert.deepEqual(result, { sent: true, provider: 'twilio', mode: 'body' });
    assert.equal(payload.from, 'whatsapp:+14155238886');
    assert.equal(payload.to, 'whatsapp:+14165550100');
    assert.match(payload.body, /Customer: Ada Lovelace/);
    assert.equal(payload.contentSid, undefined);
    assert.equal(payload.contentVariables, undefined);
  });

  test('prefers ADMIN_WHATSAPP over ADMIN_PHONE', async () => {
    let to;
    await sendBookingWhatsApp(booking, {
      env: { ...configured, ADMIN_WHATSAPP: '+14165550111', ADMIN_PHONE: '+14165550222' },
      deliver: async (payload) => {
        to = payload.to;
      },
    });
    assert.equal(to, 'whatsapp:+14165550111');
  });

  test('falls back to ADMIN_PHONE when ADMIN_WHATSAPP is unset or unusable', async () => {
    const seen = [];
    const deliver = async (payload) => {
      seen.push(payload.to);
    };

    await sendBookingWhatsApp(booking, {
      env: { ...configured, ADMIN_WHATSAPP: '', ADMIN_PHONE: '+1 (416) 555-0100' },
      deliver,
    });
    await sendBookingWhatsApp(booking, {
      env: { ...configured, ADMIN_WHATSAPP: 'nope', ADMIN_PHONE: '4165550188' },
      deliver,
    });

    assert.deepEqual(seen, ['whatsapp:+14165550100', 'whatsapp:+14165550188']);
  });

  test('uses the approved template and booking content variables when a SID is set', async () => {
    let payload;
    const result = await sendBookingWhatsApp(
      {
        ...booking,
        vehicleSelection: null,
        flightNumber: '',
        pickupAddress: 'Line one\nLine two',
      },
      {
        env: { ...configured, TWILIO_WHATSAPP_CONTENT_SID: 'HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
        deliver: async (body) => {
          payload = body;
        },
      },
    );

    assert.equal(result.mode, 'template');
    assert.equal(payload.body, undefined);
    assert.equal(payload.contentSid, 'HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    assert.deepEqual(JSON.parse(payload.contentVariables), {
      1: 'Ada Lovelace',
      2: 'ada@example.com',
      3: '+1 416 555 0199',
      4: 'email',
      5: 'Airport Transfer',
      6: 'N/A',
      7: '2026-11-08',
      8: '14:30',
      9: '2',
      10: '3',
      11: 'Line one Line two',
      12: '100 King St W, Toronto',
      13: 'N/A',
    });
  });

  test('does not send when account credentials or the sender number are missing', async () => {
    let called = false;
    const deliver = async () => {
      called = true;
    };

    const missingSender = await sendBookingWhatsApp(booking, {
      env: { ...configured, TWILIO_WHATSAPP_NUMBER: '' },
      deliver,
    });
    const missingToken = await sendBookingWhatsApp(booking, {
      env: { ...configured, TWILIO_AUTH_TOKEN: '' },
      deliver,
    });

    assert.equal(called, false);
    assert.equal(missingSender.provider, 'console');
    assert.equal(missingToken.provider, 'console');
  });

  test('propagates Twilio failures so booking creation can record them', async () => {
    await assert.rejects(
      () => sendBookingWhatsApp(booking, {
        env: configured,
        deliver: async () => {
          throw new Error('sandbox not joined');
        },
      }),
      /sandbox not joined/,
    );
  });
});
