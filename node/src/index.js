import express from 'express';
import cors from 'cors';
import contentRoutes from './routes/content.js';
import bookingRoutes from './routes/bookings.js';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'limo-cms-api' });
});

app.use('/api/content', contentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`CMS API running at http://localhost:${PORT}`);
});
