import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import bookingRoutes from './routes/bookings.js';
import contactRoutes from './routes/contact.js';
import paymentRoutes, { handleStripeWebhook } from './routes/payments.js';
import bookingStatusRoutes from './routes/bookingStatus.js';
import adminRoutes, { vehiclesRouter, blogRouter } from './routes/admin.js';
import { prisma } from './db.js';
import { isStripeConfigured } from './services/stripe.js';
import { isEmailConfigured } from './services/email.js';
import { publicFormLimiter, authLimiter } from './middleware/rateLimit.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Required behind Render / reverse proxies so rate limiting sees real client IPs
app.set('trust proxy', 1);

const corsOrigin = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: corsOrigin.split(',').map((o) => o.trim()) }));

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
      email: isEmailConfigured() ? 'configured' : 'missing_key',
    });
  } catch (err) {
    res.status(503).json({ status: 'degraded', service: 'limo-cms-api', database: 'disconnected', error: err.message });
  }
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/content', contentRoutes);
// Rate-limit only public form POSTs — not authenticated admin booking reads/writes
app.post('/api/bookings', publicFormLimiter);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', publicFormLimiter, contactRoutes);
app.use('/api/booking-status', publicFormLimiter, bookingStatusRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/blog', blogRouter);

const server = app.listen(PORT, () => {
  console.log(`CMS API running at http://localhost:${PORT}`);
  console.log(`Stripe: ${isStripeConfigured() ? 'ready' : 'not configured (set STRIPE_SECRET_KEY)'}`);
  console.log(`Email: ${isEmailConfigured() ? 'ready' : 'not configured (set RESEND_API_KEY)'}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the other process and restart.`);
  } else {
    throw err;
  }
});
