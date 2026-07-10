import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { sendBookingSms } from '../services/sms.js';

const STATUSES = ['new', 'pending_quote', 'confirmed', 'completed', 'cancelled'];
const PAYMENT_STATUSES = ['unpaid', 'pending', 'paid', 'refunded', 'pay_driver'];

function validateBooking(body) {
  const required = [
    'fullName', 'phone', 'pickupAddress', 'dropoffAddress',
    'date', 'time', 'passengers', 'luggage', 'serviceType', 'paymentMethod',
  ];
  return required.filter((field) => !body[field]?.toString().trim());
}

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
  const missing = validateBooking(req.body);
  if (missing.length) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }

  const paymentMethod = req.body.paymentMethod === 'online' ? 'online' : 'driver';

  const booking = await prisma.booking.create({
    data: {
      fullName: req.body.fullName.trim(),
      phone: req.body.phone.trim(),
      pickupAddress: req.body.pickupAddress.trim(),
      dropoffAddress: req.body.dropoffAddress.trim(),
      date: req.body.date,
      time: req.body.time,
      passengers: req.body.passengers.toString(),
      luggage: req.body.luggage.toString(),
      serviceType: req.body.serviceType,
      paymentMethod,
      flightNumber: req.body.flightNumber?.trim() || null,
      specialInstructions: req.body.specialInstructions?.trim() || null,
      status: 'new',
      paymentStatus: paymentMethod === 'driver' ? 'pay_driver' : 'unpaid',
    },
  });

  try {
    const sms = await sendBookingSms(booking);
    res.status(201).json({ success: true, booking, sms });
  } catch (err) {
    res.status(201).json({
      success: true,
      booking,
      sms: { sent: false, error: err.message },
    });
  }
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
  if (req.body.adminNotes !== undefined) data.adminNotes = req.body.adminNotes;
  if (req.body.quoteNotes !== undefined) data.quoteNotes = req.body.quoteNotes;

  if (req.body.quoteAmount !== undefined && req.body.quoteAmount !== null && req.body.quoteAmount !== '') {
    const amount = Number(req.body.quoteAmount);
    if (Number.isNaN(amount) || amount < 0) {
      return res.status(400).json({ error: 'Invalid quote amount' });
    }
    data.quoteAmount = amount;
    if (!req.body.status && existing.status === 'new') {
      data.status = 'pending_quote';
    }
  }

  const booking = await prisma.booking.update({
    where: { id: req.params.id },
    data,
  });

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
