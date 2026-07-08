import express from 'express';
import cors from 'cors';
import contentRoutes from './routes/content.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'limo-cms-api' });
});

app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
  console.log(`CMS API running at http://localhost:${PORT}`);
});
