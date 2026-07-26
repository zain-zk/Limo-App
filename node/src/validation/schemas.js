import { z } from 'zod';

const emailSchema = z.string().trim().email('Invalid email address');

export const bookingCreateSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: emailSchema,
  phone: z.string().trim().min(1, 'Phone is required'),
  preferredContactMethod: z.enum(['email', 'phone']),
  pickupAddress: z.string().trim().min(1, 'Pickup address is required'),
  dropoffAddress: z.string().trim().min(1, 'Drop-off address is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  passengers: z.union([z.string(), z.number()]).transform(String),
  luggage: z.union([z.string(), z.number()]).transform(String),
  serviceType: z.string().trim().min(1, 'Service type is required'),
  vehicleSelection: z.string().trim().optional().nullable(),
  paymentMethod: z.enum(['online', 'driver']),
  flightNumber: z.string().trim().optional().nullable(),
  specialInstructions: z.string().trim().optional().nullable(),
  turnstileToken: z.string().optional().nullable(),
});

export const contactCreateSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  phone: z.string().trim().min(1, 'Phone is required'),
  message: z.string().trim().min(1, 'Message is required'),
  turnstileToken: z.string().optional().nullable(),
});

export const bookingStatusLookupSchema = z.object({
  id: z.string().uuid('Invalid booking ID'),
  email: emailSchema,
});

export function parseSchema(schema, body) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const fields = result.error.flatten().fieldErrors;
    const firstError = Object.values(fields).flat()[0] || 'Validation failed';
    return { ok: false, error: firstError, fields };
  }
  return { ok: true, data: result.data };
}
