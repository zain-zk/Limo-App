import { prisma } from '../db.js';

const PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/fleet', changefreq: 'monthly', priority: '0.8' },
  { path: '/book', changefreq: 'monthly', priority: '0.9' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.7' },
  { path: '/testimonials', changefreq: 'monthly', priority: '0.6' },
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/booking/status', changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function publicSiteUrl(cmsUrl) {
  const cms = typeof cmsUrl === 'string' ? cmsUrl.replace(/\/$/, '') : '';
  const env = (process.env.FRONTEND_URL || '').replace(/\/$/, '');
  if (cms && !/localhost|127\.0\.0\.1/i.test(cms)) return cms;
  if (env && !/localhost|127\.0\.0\.1/i.test(env)) return env;
  return cms || env || 'https://high5limo.ca';
}

export async function sitemapHandler(_req, res) {
  let siteUrl = 'https://high5limo.ca';
  try {
    const section = await prisma.contentSection.findUnique({ where: { key: 'site' } });
    const cmsUrl = section?.data && typeof section.data === 'object' ? section.data.seo?.siteUrl : undefined;
    siteUrl = publicSiteUrl(cmsUrl);
  } catch {
    siteUrl = publicSiteUrl();
  }

  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
    orderBy: { publishedAt: 'desc' },
  });

  const urls = [
    ...PAGES.map((page) => ({
      loc: `${siteUrl}${page.path}`,
      changefreq: page.changefreq,
      priority: page.priority,
    })),
    ...posts
      .filter((post) => post.slug)
      .map((post) => ({
        loc: `${siteUrl}/blog/${post.slug}`,
        lastmod: post.updatedAt ? post.updatedAt.toISOString().slice(0, 10) : undefined,
        changefreq: 'weekly',
        priority: '0.6',
      })),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => {
      const lastmod = url.lastmod ? `<lastmod>${xmlEscape(url.lastmod)}</lastmod>` : '';
      return `  <url><loc>${xmlEscape(url.loc)}</loc>${lastmod}<changefreq>${url.changefreq}</changefreq><priority>${url.priority}</priority></url>`;
    }),
    '</urlset>',
  ].join('\n');

  res.type('application/xml').send(body);
}
