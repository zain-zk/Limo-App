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

export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  passengers: number;
  luggage: number;
  features: string[];
  imageUrl?: string | null;
  active: boolean;
  sortOrder: number;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  seoTitle?: string | null;
  seoDesc?: string | null;
}

export interface BlogPost extends BlogPostSummary {
  body: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalBookings: number;
  totalMessages: number;
  revenue: number;
  statusCounts: Record<string, number>;
  recentBookings: Array<{
    id: string;
    fullName: string;
    status: string;
    date: string;
    quoteAmount?: number | null;
    createdAt: string;
  }>;
}

export interface BookingStatusResult {
  id: string;
  status: string;
  paymentStatus: string;
  date: string;
  time: string;
  pickupAddress: string;
  dropoffAddress: string;
  serviceType: string;
  vehicleSelection?: string | null;
  quoteAmount?: number | null;
  quoteNotes?: string | null;
  paymentUrl?: string | null;
  paidAt?: string | null;
}

export interface BookingPayload {
  fullName: string;
  email: string;
  phone: string;
  preferredContactMethod: 'email' | 'phone';
  pickupAddress: string;
  dropoffAddress: string;
  date: string;
  time: string;
  passengers: string;
  luggage: string;
  serviceType: string;
  vehicleSelection?: string;
  paymentMethod: 'online' | 'driver';
  flightNumber?: string;
  specialInstructions?: string;
  turnstileToken?: string;
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
    sendQuoteEmail?: boolean;
    autoPaymentLink?: boolean;
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

export async function submitContact(data: {
  name: string;
  phone: string;
  message: string;
  turnstileToken?: string;
}) {
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

export async function fetchVehicles(): Promise<Vehicle[]> {
  const response = await fetch(`${API_BASE}/vehicles`);
  if (!response.ok) throw new Error('Failed to load vehicles');
  return response.json();
}

export async function fetchAllVehicles(): Promise<Vehicle[]> {
  const response = await authFetch(`${API_BASE}/vehicles/all`);
  if (!response.ok) throw new Error('Failed to load vehicles');
  return response.json();
}

export async function createVehicle(data: Partial<Vehicle> & { name: string }) {
  const response = await authFetch(`${API_BASE}/vehicles`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create vehicle');
  }
  return response.json();
}

export async function updateVehicle(id: string, data: Partial<Vehicle>) {
  const response = await authFetch(`${API_BASE}/vehicles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update vehicle');
  return response.json();
}

export async function deleteBooking(id: string) {
  const response = await authFetch(`${API_BASE}/bookings/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete booking');
  return response.json();
}

export async function deleteVehicle(id: string) {
  const response = await authFetch(`${API_BASE}/vehicles/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete vehicle');
  return response.json();
}

export async function fetchBlogPosts(): Promise<BlogPostSummary[]> {
  const response = await fetch(`${API_BASE}/blog`);
  if (!response.ok) throw new Error('Failed to load blog posts');
  return response.json();
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const response = await fetch(`${API_BASE}/blog/${slug}`);
  if (!response.ok) throw new Error('Post not found');
  return response.json();
}

export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  const response = await authFetch(`${API_BASE}/blog/admin/all`);
  if (!response.ok) throw new Error('Failed to load blog posts');
  return response.json();
}

export async function createBlogPost(data: {
  title: string;
  body: string;
  slug?: string;
  excerpt?: string;
  published?: boolean;
  seoTitle?: string;
  seoDesc?: string;
}) {
  const response = await authFetch(`${API_BASE}/blog`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create post');
  }
  return response.json();
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>) {
  const response = await authFetch(`${API_BASE}/blog/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
}

export async function deleteBlogPost(id: string) {
  const response = await authFetch(`${API_BASE}/blog/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete post');
  return response.json();
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const response = await authFetch(`${API_BASE}/admin/stats`);
  if (!response.ok) throw new Error('Failed to load stats');
  return response.json();
}

export async function downloadBookingsReport(from?: string, to?: string) {
  const params = new URLSearchParams();
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  const response = await authFetch(`${API_BASE}/admin/reports/bookings?${params}`);
  if (!response.ok) throw new Error('Failed to download report');
  return response.blob();
}

export async function lookupBookingStatus(id: string, email: string): Promise<BookingStatusResult> {
  const response = await fetch(`${API_BASE}/booking-status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, email }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Booking not found');
  }
  return response.json();
}
