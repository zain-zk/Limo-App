import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { CONTENT_SECTIONS } from '../types/content.js';

const router = Router();

router.get('/', async (_req, res) => {
  const sections = await prisma.contentSection.findMany();
  const content = Object.fromEntries(sections.map((s) => [s.key, s.data]));
  res.json(content);
});

router.get('/sections', (_req, res) => {
  res.json({ sections: CONTENT_SECTIONS });
});

router.get('/:section', async (req, res) => {
  const section = await prisma.contentSection.findUnique({
    where: { key: req.params.section },
  });

  if (!section) {
    return res.status(404).json({ error: `Section "${req.params.section}" not found` });
  }

  res.json(section.data);
});

router.put('/:section', requireAuth, async (req, res) => {
  const { section } = req.params;

  if (!CONTENT_SECTIONS.includes(section)) {
    return res.status(400).json({ error: `Invalid section "${section}"` });
  }

  const updated = await prisma.contentSection.upsert({
    where: { key: section },
    update: { data: req.body },
    create: { key: section, data: req.body },
  });

  res.json({ success: true, section, data: updated.data });
});

export default router;
