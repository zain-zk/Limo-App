import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { CONTENT_SECTIONS } from '../types/content.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentPath = join(__dirname, '../data/content.json');

function readContent() {
  const raw = readFileSync(contentPath, 'utf-8');
  return JSON.parse(raw);
}

function writeContent(data) {
  writeFileSync(contentPath, JSON.stringify(data, null, 2), 'utf-8');
}

const router = Router();

router.get('/', (_req, res) => {
  res.json(readContent());
});

router.get('/sections', (_req, res) => {
  res.json({ sections: CONTENT_SECTIONS });
});

router.get('/:section', (req, res) => {
  const content = readContent();
  const section = content[req.params.section];

  if (!section) {
    return res.status(404).json({ error: `Section "${req.params.section}" not found` });
  }

  res.json(section);
});

router.put('/:section', (req, res) => {
  const { section } = req.params;

  if (!CONTENT_SECTIONS.includes(section)) {
    return res.status(400).json({ error: `Invalid section "${section}"` });
  }

  const content = readContent();
  content[section] = req.body;
  writeContent(content);

  res.json({ success: true, section, data: req.body });
});

export default router;
