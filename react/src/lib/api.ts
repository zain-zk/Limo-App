import type { CmsContent } from '../types/content';

const API_BASE = '/api';

export async function fetchContent(): Promise<CmsContent> {
  const response = await fetch(`${API_BASE}/content`);

  if (!response.ok) {
    throw new Error('Failed to load site content');
  }

  return response.json();
}

export async function fetchSection<T>(section: keyof CmsContent): Promise<T> {
  const response = await fetch(`${API_BASE}/content/${section}`);

  if (!response.ok) {
    throw new Error(`Failed to load "${section}" content`);
  }

  return response.json();
}

export async function updateSection<T extends keyof CmsContent>(
  section: T,
  data: CmsContent[T],
): Promise<CmsContent[T]> {
  const response = await fetch(`${API_BASE}/content/${section}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update "${section}" content`);
  }

  const result = await response.json();
  return result.data;
}

export interface BookingPayload {
  fullName: string;
  phone: string;
  pickupAddress: string;
  dropoffAddress: string;
  date: string;
  time: string;
  passengers: string;
  luggage: string;
  serviceType: string;
  paymentMethod: 'online' | 'driver';
  flightNumber?: string;
  specialInstructions?: string;
}

export async function submitBooking(data: BookingPayload) {
  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to submit booking');
  }

  return response.json();
}

export async function submitContact(data: { name: string; phone: string; message: string }) {
  const response = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to send message');
  }

  return response.json();
}
