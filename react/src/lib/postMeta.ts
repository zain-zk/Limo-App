const GENERIC_DESCRIPTIONS = new Set([
  'High5 Limo offers luxury limousine and chauffeur service across Canada. Airport transfers, corporate travel, weddings, and special events. Book your ride today.',
  'Luxury limousine and chauffeur service for airport transfers, weddings, corporate travel, and special events across Canada.',
  'Premium luxury limousine and chauffeur service across Canada',
  'Luxury travel tips, airport guides, and news from High5 Limo.',
  'High5 Limo | Premium Limousine Service Across Canada',
]);

function normalize(value?: string | null) {
  return value?.replace(/\s+/g, ' ').trim() || '';
}

function leadParagraph(body?: string | null) {
  if (!body) return '';
  const paragraph = body
    .split(/\n+/)
    .map((part) => part.replace(/<[^>]+>/g, ' ').trim())
    .find((part) => part.length > 40);
  return paragraph || '';
}

/** Prefer the article's own excerpt or SEO description over the site-wide blurb. */
export function postMetaDescription(
  post: { seoDesc?: string | null; excerpt?: string | null; body?: string | null },
  siteDescription?: string | null,
) {
  const generic = new Set(GENERIC_DESCRIPTIONS);
  const site = normalize(siteDescription);
  if (site) generic.add(site);

  const candidates = [post.excerpt, post.seoDesc, leadParagraph(post.body)];
  for (const candidate of candidates) {
    const text = normalize(candidate);
    if (text && !generic.has(text)) return text.slice(0, 320);
  }
  return undefined;
}
