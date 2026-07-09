import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { randomUUID } from 'crypto';
import { sendBookingSms } from '../services/sms.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bookingsPath = join(__dirname, '../data/bookings.json');

const STATUSES = ['new', 'pending_quote', 'confirmed', 'completed', 'cancelled'];

function readBookings() {
  try {
    const raw = readFileSync(bookingsPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeBookings(data) {
  writeFileSync(bookingsPath, JSON.stringify(data, null, 2), 'utf-8');
}

function validateBooking(body) {
  const required = ['fullName', 'phone', 'pickupAddress', 'dropoffAddress', 'date', 'time', 'passengers', 'luggage', 'serviceType', 'paymentMethod'];
  const missing = required.filter((field) => !body[field]?.toString().trim());
  return missing;
}

const router = Router();

router.get('/', (_req, res) => {
  res.json(readBookings());
});

router.get('/:id', (req, res) => {
  const booking = readBookings().find((b) => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  res.json(booking);
});

router.post('/', async (req, res) => {
  const missing = validateBooking(req.body);
  if (missing.length) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }

  const booking = {
    id: randomUUID(),
    ...req.body,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  const bookings = readBookings();
  bookings.unshift(booking);
  writeBookings(bookings);

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

router.patch('/:id', (req, res) => {
  const bookings = readBookings();
  const index = bookings.findIndex((b) => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Booking not found' });

  if (req.body.status && !STATUSES.includes(req.body.status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  bookings[index] = { ...bookings[index], ...req.body, updatedAt: new Date().toISOString() };
  writeBookings(bookings);
  res.json({ success: true, booking: bookings[index] });
});

router.delete('/:id', (req, res) => {
  const bookings = readBookings();
  const filtered = bookings.filter((b) => b.id !== req.params.id);
  if (filtered.length === bookings.length) return res.status(404).json({ error: 'Booking not found' });
  writeBookings(filtered);
  res.json({ success: true });
});

export default router;
