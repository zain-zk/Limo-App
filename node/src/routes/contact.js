import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesPath = join(__dirname, '../data/contact-messages.json');

function readMessages() {
  try {
    const raw = readFileSync(messagesPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeMessages(data) {
  writeFileSync(messagesPath, JSON.stringify(data, null, 2), 'utf-8');
}

const router = Router();

router.post('/', (req, res) => {
  const { name, phone, message } = req.body;

  if (!name?.trim() || !phone?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, phone, and message are required' });
  }

  const entry = {
    id: randomUUID(),
    name: name.trim(),
    phone: phone.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  const messages = readMessages();
  messages.unshift(entry);
  writeMessages(messages);

  console.log('[Contact] New message from', entry.name, entry.phone);
  res.status(201).json({ success: true, message: entry });
});

export default router;
