import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const prisma = new PrismaClient();
const __dirname = dirname(fileURLToPath(import.meta.url));
const contentPath = join(__dirname, '../src/data/content.json');

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

  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });

  console.log(`Admin user ready: ${username}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
