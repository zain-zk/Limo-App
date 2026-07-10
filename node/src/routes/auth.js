import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../db.js';
import { requireAuth, signToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username?.trim() || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const admin = await prisma.adminUser.findUnique({
    where: { username: username.trim() },
  });

  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken({ sub: admin.id, username: admin.username });
  res.json({ token, username: admin.username });
});

router.get('/me', requireAuth, async (req, res) => {
  const admin = await prisma.adminUser.findUnique({
    where: { id: req.user.sub },
    select: { id: true, username: true, createdAt: true },
  });

  if (!admin) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(admin);
});

export default router;
