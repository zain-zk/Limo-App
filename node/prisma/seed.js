import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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
    sortOrder: 0,
  },
  {
    name: 'Luxury Sedan',
    slug: 'luxury-sedan',
    passengers: 3,
    luggage: 3,
    features: ['Leather Interior', 'Climate Control', 'Premium Sound'],
    sortOrder: 1,
  },
  {
    name: 'Executive SUV',
    slug: 'executive-suv',
    passengers: 6,
    luggage: 5,
    features: ['Wi-Fi', 'Heated Seats', 'Panoramic Roof', 'Entertainment System'],
    sortOrder: 2,
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
