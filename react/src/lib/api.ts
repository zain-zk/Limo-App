import type { CmsContent } from '../types/content';

const API_BASE = '/api';
const TOKEN_KEY = 'limo_admin_token';

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function authFetch(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(url, { ...options, headers });
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Login failed');
  }

  const data = await response.json();
  setAuthToken(data.token);
  return data;
}

export async function fetchMe() {
  const response = await authFetch(`${API_BASE}/auth/me`);
  if (!response.ok) throw new Error('Not authenticated');
  return response.json();
}

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
  const response = await authFetch(`${API_BASE}/content/${section}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Failed to update "${section}" content`);
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

export interface Booking extends BookingPayload {
  id: string;
  status: string;
  quoteAmount?: number | null;
  quoteNotes?: string | null;
  paymentStatus?: string;
  adminNotes?: string | null;
  stripeSessionId?: string | null;
  stripePaymentIntentId?: string | null;
  paymentUrl?: string | null;
  paidAt?: string | null;
  createdAt: string;
  updatedAt?: string;
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

export async function fetchBookings(): Promise<Booking[]> {
  const response = await authFetch(`${API_BASE}/bookings`);
  if (!response.ok) throw new Error('Failed to load bookings');
  return response.json();
}

export async function updateBooking(
  id: string,
  data: {
    status?: string;
    paymentStatus?: string;
    quoteAmount?: number | null;
    quoteNotes?: string | null;
    adminNotes?: string | null;
  },
) {
  const response = await authFetch(`${API_BASE}/bookings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update booking');
  }
  return response.json();
}

export async function updateBookingStatus(id: string, status: string) {
  return updateBooking(id, { status });
}

export async function createPaymentLink(bookingId: string) {
  const response = await authFetch(`${API_BASE}/payments/create-checkout`, {
    method: 'POST',
    body: JSON.stringify({ bookingId }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create payment link');
  }

  return response.json() as Promise<{
    success: boolean;
    url: string;
    sessionId: string;
    booking: Booking;
  }>;
}

export async function fetchPaymentSession(sessionId: string) {
  const response = await fetch(`${API_BASE}/payments/session/${sessionId}`);
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to verify payment');
  }
  return response.json() as Promise<{
    sessionId: string;
    paymentStatus: string;
    booking: Booking | null;
  }>;
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

export async function fetchContactMessages() {
  const response = await authFetch(`${API_BASE}/contact`);
  if (!response.ok) throw new Error('Failed to load messages');
  return response.json();
}
