import type { TFunction } from 'i18next';
import type { ContentItem } from '../types/content';

export const SERVICE_DEFS = [
  { id: 'airport', icon: 'Plane', match: /airport/i },
  { id: 'short-distance', icon: 'MapPin', match: /short[\s-]*distance/i },
  { id: 'long-distance', icon: 'Car', match: /long[\s-]*distance/i },
  { id: 'corporate', icon: 'Briefcase', match: /corporate/i },
  { id: 'wedding', icon: 'Heart', match: /wedding/i },
  { id: 'special', icon: 'PartyPopper', match: /special/i },
  { id: 'hourly', icon: 'Timer', match: /hourly/i },
] as const;

export type ServiceId = (typeof SERVICE_DEFS)[number]['id'];

/** Services page, footer, and booking options share this list so EN/FR stay aligned. */
export function resolvePublicServices(
  cmsServices: ContentItem[] | undefined,
  t: TFunction,
  language: string,
): ContentItem[] {
  const french = language.toLowerCase().startsWith('fr');
  return SERVICE_DEFS.map((def) => {
    const fromCms = cmsServices?.find((service) => def.match.test(service.title));
    const title = t(`services.items.${def.id}.title`);
    const translatedDescription = t(`services.items.${def.id}.description`);
    return {
      icon: fromCms?.icon || def.icon,
      title,
      description: french ? translatedDescription : (fromCms?.description || translatedDescription),
    };
  });
}
