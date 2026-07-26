import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { sendBookingSms } from '../services/sms.js';
import { sendBookingAckEmail, sendQuoteEmail } from '../services/email.js';
import { verifyTurnstile } from '../services/turnstile.js';
import { bookingCreateSchema, parseSchema } from '../validation/schemas.js';
import { createCheckoutForBooking } from '../services/payments.js';

const STATUSES = ['new', 'pending_quote', 'confirmed', 'completed', 'cancelled'];
const PAYMENT_STATUSES = ['unpaid', 'pending', 'paid', 'refunded', 'pay_driver'];

const router = Router();

router.get('/', requireAuth, async (_req, res) => {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(bookings);
});

router.get('/:id', requireAuth, async (req, res) => {
  const booking = await prisma.booking.findUnique({ where: { id: req.params.id } });
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  res.json(booking);
});

router.post('/', async (req, res) => {
  const parsed = parseSchema(bookingCreateSchema, req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.error, fields: parsed.fields });
  }

  const captcha = await verifyTurnstile(parsed.data.turnstileToken, req.ip);
  if (!captcha.success) {
    return res.status(400).json({ error: captcha.error || 'CAPTCHA verification failed' });
  }

  const paymentMethod = parsed.data.paymentMethod === 'online' ? 'online' : 'driver';

  const booking = await prisma.booking.create({
    data: {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      preferredContactMethod: parsed.data.preferredContactMethod,
      pickupAddress: parsed.data.pickupAddress,
      dropoffAddress: parsed.data.dropoffAddress,
      date: parsed.data.date,
      time: parsed.data.time,
      passengers: parsed.data.passengers,
      luggage: parsed.data.luggage,
      serviceType: parsed.data.serviceType,
      vehicleSelection: parsed.data.vehicleSelection || null,
      paymentMethod,
      flightNumber: parsed.data.flightNumber || null,
      specialInstructions: parsed.data.specialInstructions || null,
      status: 'pending_quote',
      paymentStatus: paymentMethod === 'driver' ? 'pay_driver' : 'unpaid',
    },
  });

  const notifications = { sms: null, email: null };

  try {
    notifications.sms = await sendBookingSms(booking);
  } catch (err) {
    notifications.sms = { sent: false, error: err.message };
  }

  try {
    notifications.email = await sendBookingAckEmail(booking);
  } catch (err) {
    notifications.email = { sent: false, error: err.message };
  }

  res.status(201).json({ success: true, booking, notifications });
});

router.patch('/:id', requireAuth, async (req, res) => {
  const existing = await prisma.booking.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ error: 'Booking not found' });

  if (req.body.status && !STATUSES.includes(req.body.status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  if (req.body.paymentStatus && !PAYMENT_STATUSES.includes(req.body.paymentStatus)) {
    return res.status(400).json({ error: 'Invalid payment status' });
  }

  const data = {};

  if (req.body.status) data.status = req.body.status;
  if (req.body.paymentStatus) data.paymentStatus = req.body.paymentStatus;
  if (req.body.fullName) data.fullName = req.body.fullName;
  if (req.body.phone) data.phone = req.body.phone;
  if (req.body.email) data.email = req.body.email;
  if (req.body.adminNotes !== undefined) data.adminNotes = req.body.adminNotes;
  if (req.body.quoteNotes !== undefined) data.quoteNotes = req.body.quoteNotes;

  if (req.body.quoteAmount !== undefined && req.body.quoteAmount !== null && req.body.quoteAmount !== '') {
    const amount = Number(req.body.quoteAmount);
    if (Number.isNaN(amount) || amount < 0) {
      return res.status(400).json({ error: 'Invalid quote amount' });
    }
    data.quoteAmount = amount;
    if (!req.body.status && (existing.status === 'new' || existing.status === 'pending_quote')) {
      data.status = 'pending_quote';
    }
  }

  let booking = await prisma.booking.update({
    where: { id: req.params.id },
    data,
  });

  const sendQuoteNotification = req.body.sendQuoteEmail === true;
  const autoPaymentLink = req.body.autoPaymentLink === true;

  if (sendQuoteNotification && booking.quoteAmount && booking.quoteAmount > 0) {
    let paymentUrl = booking.paymentUrl;

    if (autoPaymentLink && booking.paymentMethod === 'online' && booking.paymentStatus !== 'paid') {
      try {
        const checkout = await createCheckoutForBooking(booking);
        booking = checkout.booking;
        paymentUrl = checkout.url;
      } catch (err) {
        console.error('[Booking] Auto payment link failed:', err.message);
      }
    }

    try {
      await sendQuoteEmail(booking, paymentUrl);
    } catch (err) {
      console.error('[Booking] Quote email failed:', err.message);
    }
  }

  res.json({ success: true, booking });
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.booking.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: 'Booking not found' });
  }
});

export default router;
