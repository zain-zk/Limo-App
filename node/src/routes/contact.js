import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { verifyTurnstile } from '../services/turnstile.js';
import { contactCreateSchema, parseSchema } from '../validation/schemas.js';

const router = Router();

router.get('/', requireAuth, async (_req, res) => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(messages);
});

router.post('/', async (req, res) => {
  const parsed = parseSchema(contactCreateSchema, req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.error, fields: parsed.fields });
  }

  const captcha = await verifyTurnstile(parsed.data.turnstileToken, req.ip);
  if (!captcha.success) {
    return res.status(400).json({ error: captcha.error || 'CAPTCHA verification failed' });
  }

  const entry = await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      message: parsed.data.message,
    },
  });

  console.log('[Contact] New message from', entry.name, entry.phone);
  res.status(201).json({ success: true, message: entry });
});

export default router;
