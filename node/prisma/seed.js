import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { FLEET_PHOTOS, fleetImageFor } from '../src/lib/fleetImages.js';

const prisma = new PrismaClient();
const __dirname = dirname(fileURLToPath(import.meta.url));
const contentPath = join(__dirname, '../src/data/content.json');

const DEFAULT_VEHICLES = [
  {
    name: 'GMC Yukon XL',
    slug: 'gmc-yukon-xl',
    passengers: 6,
    luggage: 6,
    features: ['Wi-Fi', 'Leather Seats', 'Climate Control', 'Premium Sound'],
    imageUrl: FLEET_PHOTOS.yukonXl,
    sortOrder: 0,
  },
  {
    name: 'GMC Yukon Denali',
    slug: 'gmc-yukon-denali',
    passengers: 6,
    luggage: 5,
    features: ['Wi-Fi', 'Heated Seats', 'Panoramic Roof', 'Entertainment System'],
    imageUrl: FLEET_PHOTOS.yukonDenali,
    sortOrder: 1,
  },
  {
    name: 'Cadillac Escalade',
    slug: 'cadillac-escalade',
    passengers: 7,
    luggage: 7,
    features: ['Wi-Fi', 'Premium Interior', 'Advanced Safety', 'Luxury Comfort'],
    imageUrl: FLEET_PHOTOS.escalade,
    sortOrder: 2,
  },
  {
    name: 'Luxury Sedan',
    slug: 'luxury-sedan',
    passengers: 3,
    luggage: 3,
    features: ['Leather Interior', 'Climate Control', 'Premium Sound'],
    sortOrder: 3,
  },
  {
    name: 'Executive SUV',
    slug: 'executive-suv',
    passengers: 6,
    luggage: 5,
    features: ['Wi-Fi', 'Heated Seats', 'Panoramic Roof', 'Entertainment System'],
    sortOrder: 4,
  },
];

async function main() {
  const raw = readFileSync(contentPath, 'utf-8');
  const content = JSON.parse(raw);

  for (const [key, data] of Object.entries(content)) {
    await prisma.contentSection.upsert({
      where: { key },
      update: { data },
      create: { key, data },
    });
    console.log(`Seeded content section: ${key}`);
  }

  for (const vehicle of DEFAULT_VEHICLES) {
    await prisma.vehicle.upsert({
      where: { slug: vehicle.slug },
      update: vehicle,
      create: vehicle,
    });
    console.log(`Seeded vehicle: ${vehicle.name}`);
  }

  const storedVehicles = await prisma.vehicle.findMany();
  for (const vehicle of storedVehicles) {
    const imageUrl = fleetImageFor(vehicle.name, vehicle.imageUrl);
    if ((imageUrl || null) !== (vehicle.imageUrl || null)) {
      await prisma.vehicle.update({ where: { id: vehicle.id }, data: { imageUrl } });
      console.log(`Corrected photo for ${vehicle.name}`);
    }
  }

  const welcomeSlug = 'welcome-to-high5-limo';
  const welcome = await prisma.blogPost.findUnique({ where: { slug: welcomeSlug } });
  if (!welcome) {
    await prisma.blogPost.create({
      data: {
        title: 'Welcome to High5 Limo',
        slug: welcomeSlug,
        excerpt: 'High5 Limo is a premium chauffeur service across Canada for airport pickups, city rides, weddings, corporate travel, and special occasions.',
        body: [
          'Welcome to High5 Limo.',
          'We provide luxury chauffeur transportation across Canada — airport pickup and drop-off, short city trips, long-distance travel, weddings, corporate meetings, special occasions, and hourly chauffeur service.',
          'Our fleet includes the GMC Yukon XL, GMC Yukon Denali, and Cadillac Escalade, each maintained for comfort and reliability.',
          'Request a quote online and our team will confirm the details of your ride.',
        ].join('\n\n'),
        published: true,
        publishedAt: new Date('2026-01-15T12:00:00Z'),
        seoTitle: 'Welcome to High5 Limo',
      },
    });
    console.log('Seeded blog post: welcome-to-high5-limo');
  } else {
    console.log('Blog post already exists: welcome-to-high5-limo');
  }

  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);

  // Never overwrite an existing admin password on every deploy/seed
  const existingAdmin = await prisma.adminUser.findUnique({ where: { username } });
  if (existingAdmin) {
    console.log(`Admin user already exists: ${username}`);
  } else {
    await prisma.adminUser.create({
      data: { username, passwordHash, role: 'superadmin' },
    });
    console.log(`Admin user created: ${username}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
