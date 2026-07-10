import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import bookingRoutes from './routes/bookings.js';
import contactRoutes from './routes/contact.js';
import paymentRoutes, { handleStripeWebhook } from './routes/payments.js';
import { prisma } from './db.js';
import { isStripeConfigured } from './services/stripe.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Stripe webhook needs the raw body for signature verification
app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

app.use(express.json({ limit: '2mb' }));

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      service: 'limo-cms-api',
      database: 'connected',
      stripe: isStripeConfigured() ? 'configured' : 'missing_key',
    });
  } catch (err) {
    res.status(503).json({ status: 'degraded', service: 'limo-cms-api', database: 'disconnected', error: err.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payments', paymentRoutes);

const server = app.listen(PORT, () => {
  console.log(`CMS API running at http://localhost:${PORT}`);
  console.log(`Stripe: ${isStripeConfigured() ? 'ready' : 'not configured (set STRIPE_SECRET_KEY)'}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the other process and restart.`);
  } else {
    throw err;
  }
});
