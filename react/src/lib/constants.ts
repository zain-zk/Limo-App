export const SITE_PHONE = '+1234567890';
export const SITE_PHONE_DISPLAY = '+1 (234) 567-890';
export const SITE_DOMAIN = 'https://high5limo.ca';

export const SERVICE_AREAS = [
  'Toronto',
  'Mississauga',
  'Brampton',
  'Vaughan',
  'Hamilton',
  'Oakville',
  'Markham',
  'Richmond Hill',
];

export const SERVICE_TYPES = [
  { value: 'airport', label: 'Airport Pickup & Drop-off' },
  { value: 'short-distance', label: 'Short Distance' },
  { value: 'long-distance', label: 'Long Distance' },
  { value: 'corporate', label: 'Corporate Travel' },
  { value: 'wedding', label: 'Wedding Service' },
  { value: 'special', label: 'Special Occasions' },
  { value: 'hourly', label: 'Hourly Chauffeur Service' },
] as const;
