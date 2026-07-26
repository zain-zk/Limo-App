import { Router } from 'express';
import { prisma } from '../db.js';
import { bookingStatusLookupSchema, parseSchema } from '../validation/schemas.js';

const router = Router();

/**
 * Public booking status lookup — requires booking UUID + customer email.
 * POST /api/booking-status
 */
router.post('/', async (req, res) => {
  const parsed = parseSchema(bookingStatusLookupSchema, req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.error, fields: parsed.fields });
  }

  const booking = await prisma.booking.findUnique({ where: { id: parsed.data.id } });

  if (!booking || booking.email.toLowerCase() !== parsed.data.email.toLowerCase()) {
    return res.status(404).json({ error: 'Booking not found. Check your booking ID and email.' });
  }

  res.json({
    id: booking.id,
    status: booking.status,
    paymentStatus: booking.paymentStatus,
    date: booking.date,
    time: booking.time,
    pickupAddress: booking.pickupAddress,
    dropoffAddress: booking.dropoffAddress,
    serviceType: booking.serviceType,
    vehicleSelection: booking.vehicleSelection,
    quoteAmount: booking.quoteAmount,
    quoteNotes: booking.quoteNotes,
    paymentUrl: booking.paymentStatus === 'paid' ? null : booking.paymentUrl,
    paidAt: booking.paidAt,
  });
});

export default router;
