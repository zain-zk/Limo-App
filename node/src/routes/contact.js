import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (_req, res) => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(messages);
});

router.post('/', async (req, res) => {
  const { name, phone, message } = req.body;

  if (!name?.trim() || !phone?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, phone, and message are required' });
  }

  const entry = await prisma.contactMessage.create({
    data: {
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
    },
  });

  console.log('[Contact] New message from', entry.name, entry.phone);
  res.status(201).json({ success: true, message: entry });
});

export default router;
