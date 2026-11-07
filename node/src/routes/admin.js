import { Router } from 'express';
import { prisma } from '../db.js';
import { fleetImageFor } from '../lib/fleetImages.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** GET /api/admin/stats */
router.get('/stats', requireAuth, async (_req, res) => {
  const [total, byStatus, paidBookings, recent, messages] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.groupBy({ by: ['status'], _count: { id: true } }),
    prisma.booking.findMany({
      where: { paymentStatus: 'paid' },
      select: { quoteAmount: true },
    }),
    prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        fullName: true,
        status: true,
        date: true,
        quoteAmount: true,
        createdAt: true,
      },
    }),
    prisma.contactMessage.count(),
  ]);

  const revenue = paidBookings.reduce((sum, b) => sum + (Number(b.quoteAmount) || 0), 0);
  const statusCounts = Object.fromEntries(byStatus.map((s) => [s.status, s._count.id]));

  res.json({
    totalBookings: total,
    totalMessages: messages,
    revenue,
    statusCounts,
    recentBookings: recent,
  });
});

/** GET /api/admin/reports/bookings?from=YYYY-MM-DD&to=YYYY-MM-DD */
router.get('/reports/bookings', requireAuth, async (req, res) => {
  const { from, to } = req.query;
  const where = {};

  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(from);
    if (to) {
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      where.createdAt.lte = end;
    }
  }

  const bookings = await prisma.booking.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const header = [
    'id', 'fullName', 'email', 'phone', 'date', 'time', 'status',
    'paymentStatus', 'quoteAmount', 'serviceType', 'vehicleSelection', 'createdAt',
  ].join(',');

  const rows = bookings.map((b) =>
    [
      b.id,
      `"${b.fullName.replace(/"/g, '""')}"`,
      b.email,
      b.phone,
      b.date,
      b.time,
      b.status,
      b.paymentStatus,
      b.quoteAmount ?? '',
      b.serviceType,
      b.vehicleSelection ?? '',
      b.createdAt.toISOString(),
    ].join(','),
  );

  const csv = [header, ...rows].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="bookings-report.csv"');
  res.send(csv);
});

/** Vehicle CRUD mounted at /api/vehicles */
export const vehiclesRouter = Router();

async function repairVehicleImages(vehicles) {
  const repaired = [];
  for (const vehicle of vehicles) {
    const imageUrl = fleetImageFor(vehicle.name, vehicle.imageUrl);
    if ((imageUrl || null) !== (vehicle.imageUrl || null)) {
      const updated = await prisma.vehicle.update({
        where: { id: vehicle.id },
        data: { imageUrl },
      });
      repaired.push(updated);
    } else {
      repaired.push(vehicle);
    }
  }
  return repaired;
}

vehiclesRouter.get('/', async (_req, res) => {
  const vehicles = await prisma.vehicle.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });
  res.json(await repairVehicleImages(vehicles));
});

vehiclesRouter.get('/all', requireAuth, async (_req, res) => {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { sortOrder: 'asc' } });
  res.json(await repairVehicleImages(vehicles));
});

vehiclesRouter.post('/', requireAuth, async (req, res) => {
  const { name, passengers, luggage, features, imageUrl, active, sortOrder } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: 'Name is required' });

  const slug = req.body.slug?.trim() || slugify(name);
  const vehicle = await prisma.vehicle.create({
    data: {
      name: name.trim(),
      slug,
      passengers: Number(passengers) || 4,
      luggage: Number(luggage) || 2,
      features: Array.isArray(features) ? features : [],
      imageUrl: imageUrl || null,
      active: active !== false,
      sortOrder: Number(sortOrder) || 0,
    },
  });
  res.status(201).json(vehicle);
});

vehiclesRouter.patch('/:id', requireAuth, async (req, res) => {
  const data = {};
  if (req.body.name) data.name = req.body.name.trim();
  if (req.body.slug) data.slug = req.body.slug.trim();
  if (req.body.passengers != null) data.passengers = Number(req.body.passengers);
  if (req.body.luggage != null) data.luggage = Number(req.body.luggage);
  if (req.body.features) data.features = req.body.features;
  if (req.body.imageUrl !== undefined) data.imageUrl = req.body.imageUrl;
  if (req.body.active !== undefined) data.active = Boolean(req.body.active);
  if (req.body.sortOrder != null) data.sortOrder = Number(req.body.sortOrder);

  try {
    const vehicle = await prisma.vehicle.update({ where: { id: req.params.id }, data });
    res.json(vehicle);
  } catch {
    res.status(404).json({ error: 'Vehicle not found' });
  }
});

vehiclesRouter.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.vehicle.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: 'Vehicle not found' });
  }
});

/** Blog CRUD mounted at /api/blog */
export const blogRouter = Router();

blogRouter.get('/admin/all', requireAuth, async (_req, res) => {
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: 'desc' } });
  res.json(posts);
});

blogRouter.get('/', async (_req, res) => {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      seoTitle: true,
      seoDesc: true,
    },
  });
  res.json(posts);
});

blogRouter.get('/:slug', async (req, res) => {
  const post = await prisma.blogPost.findFirst({
    where: { slug: req.params.slug, published: true },
  });
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

blogRouter.post('/', requireAuth, async (req, res) => {
  const { title, body, excerpt, published, seoTitle, seoDesc } = req.body;
  if (!title?.trim() || !body?.trim()) {
    return res.status(400).json({ error: 'Title and body are required' });
  }

  const slug = req.body.slug?.trim() || slugify(title);
  const post = await prisma.blogPost.create({
    data: {
      title: title.trim(),
      slug,
      body: body.trim(),
      excerpt: excerpt?.trim() || null,
      published: Boolean(published),
      publishedAt: published ? new Date() : null,
      seoTitle: seoTitle?.trim() || null,
      seoDesc: seoDesc?.trim() || null,
    },
  });
  res.status(201).json(post);
});

blogRouter.patch('/:id', requireAuth, async (req, res) => {
  const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ error: 'Post not found' });

  const data = {};
  if (req.body.title) data.title = req.body.title.trim();
  if (req.body.slug) data.slug = req.body.slug.trim();
  if (req.body.body) data.body = req.body.body.trim();
  if (req.body.excerpt !== undefined) data.excerpt = req.body.excerpt?.trim() || null;
  if (req.body.seoTitle !== undefined) data.seoTitle = req.body.seoTitle?.trim() || null;
  if (req.body.seoDesc !== undefined) data.seoDesc = req.body.seoDesc?.trim() || null;

  if (req.body.published !== undefined) {
    data.published = Boolean(req.body.published);
    if (data.published && !existing.publishedAt) {
      data.publishedAt = new Date();
    }
  }

  const post = await prisma.blogPost.update({ where: { id: req.params.id }, data });
  res.json(post);
});

blogRouter.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: 'Post not found' });
  }
});

export default router;
