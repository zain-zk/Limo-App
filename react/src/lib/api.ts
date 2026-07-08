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
