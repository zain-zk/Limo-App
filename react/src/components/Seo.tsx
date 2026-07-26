import { Helmet } from 'react-helmet-async';
import { useContent } from '../context/ContentContext';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
}

export function Seo({ title, description, path = '' }: SeoProps) {
  const { site } = useContent();
  const seo = site.seo;
  const siteUrl = seo?.siteUrl || 'https://high5limo.ca';
  const pageTitle = title || seo?.defaultTitle || `${site.name} | Premium Limousine Service`;
  const pageDesc = description || seo?.defaultDescription || site.tagline;
  const canonical = `${siteUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={site.name} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
    </Helmet>
  );
}
