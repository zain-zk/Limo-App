import { Helmet } from 'react-helmet-async';
import { useContent } from '../context/ContentContext';
import { schemaTelephone } from '../lib/phone';

export function LocalBusinessJsonLd() {
  const { site } = useContent();
  const siteUrl = (site.seo?.siteUrl || 'https://high5limo.ca').replace(/\/$/, '');
  const telephone = schemaTelephone(site.phone);

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name || 'High5 Limo',
    url: siteUrl,
    description: site.seo?.defaultDescription || site.tagline || 'Premium luxury limousine and chauffeur service across Canada',
    areaServed: ['Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Hamilton', 'Canada'],
    priceRange: '$$$',
  };

  if (telephone) data.telephone = telephone;
  if (site.email?.trim()) data.email = site.email.trim();

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
