# High5 Limo

Monorepo with separate frontend and backend for the public website and admin CMS.

Full technical specification: **[docs/High5Limo_Implementation_Plan.md](docs/High5Limo_Implementation_Plan.md)**

## Structure

```
Limo-App/
├── react/              # Public website + admin UI (Vite + React)
├── node/               # CMS API (Express + Prisma + PostgreSQL)
├── docs/               # Implementation plan & BRD traceability
├── docker-compose.yml  # Local PostgreSQL
├── render.yaml         # Render deployment blueprint
├── vercel.json         # Vercel frontend config
└── package.json        # Root scripts to run both apps
```

## Prerequisites

- Node.js 18+
- Docker Desktop (for PostgreSQL)

## First-time setup

```bash
npm run install:all
docker compose up -d
cp node/.env.example node/.env
cd node && npm run db:setup && cd ..
```

Optional frontend env: `cp react/.env.example react/.env.local`

## Run locally

```bash
npm run dev   # React :5173 + API :3001
```

- **Site:** http://localhost:5173  
- **Admin:** http://localhost:5173/admin (`admin` / `admin123`)  
- **Booking status:** http://localhost:5173/booking/status

## Features

- **Public site:** Home, About, Services, Fleet, Book Now, Pricing, Testimonials, FAQ, Contact, Blog, Privacy, Terms
- **Booking:** Full BRD form (email, contact preference, vehicle selection, pay online / pay driver)
- **Notifications:** Twilio SMS to owner + Resend email to customer (configure in `.env`)
- **Payments:** Stripe Checkout after admin quote
- **Admin:** Dashboard metrics, bookings, CMS, vehicles, blog, legal pages, CSV reports
- **SEO:** Per-page meta tags, sitemap, robots.txt, GA4
- **i18n:** English + French (header language switcher)
- **Security:** Rate limiting, Cloudflare Turnstile, Zod validation

## API (summary)

| Endpoint | Auth | Description |
|----------|------|-------------|
| `/api/bookings` | POST public | Submit booking |
| `/api/booking-status` | POST public | Lookup by ID + email |
| `/api/vehicles` | GET public | Fleet list |
| `/api/blog` | GET public | Blog posts |
| `/api/admin/stats` | JWT | Dashboard metrics |
| `/api/admin/reports/bookings` | JWT | CSV export |
| `/api/payments/create-checkout` | JWT | Stripe payment link |

See the [implementation plan](docs/High5Limo_Implementation_Plan.md) for the full API spec.

## Environment variables

### Backend (`node/.env`)

```
DATABASE_URL=postgresql://limo:limo_dev_password@localhost:5432/limo_app?schema=public
JWT_SECRET=change-me-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CURRENCY=cad

# Twilio SMS (owner alerts)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
ADMIN_PHONE=

# Twilio WhatsApp (owner alerts; independent of SMS). No real secrets.
TWILIO_WHATSAPP_NUMBER=
ADMIN_WHATSAPP=
TWILIO_WHATSAPP_CONTENT_SID=

# Resend email (customer notifications)
RESEND_API_KEY=
EMAIL_FROM="High5 Limo <bookings@high5limo.ca>"

# Cloudflare Turnstile (optional in dev)
TURNSTILE_SECRET_KEY=
```

### Frontend (`react/.env.local`)

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXX
VITE_GOOGLE_MAPS_KEY=
VITE_TURNSTILE_SITE_KEY=
```

## Stripe payments

1. Customer submits booking (optionally chooses Pay Online).
2. Admin sets quote in **Admin → Bookings**.
3. Check **Email quote to customer** (+ optional Stripe link) → **Save Quote**.
4. Or click **Create Payment Link** manually.
5. Customer pays → `/payment/success` → booking confirmed.

Test card: `4242 4242 4242 4242`

Webhook (required for auto-confirm on payment; set `STRIPE_WEBHOOK_SECRET`):

```bash
stripe listen --forward-to localhost:3001/api/payments/webhook
```

Without the webhook secret, `/api/payments/webhook` rejects requests. Local success-page verification via `GET /api/payments/session/:id` still works.

## WhatsApp booking alerts

Submitting the public Book form still sends the Twilio SMS (when SMS settings are set) and the Resend acknowledgement to the customer. It also attempts a server-side WhatsApp message to the admin. This is separate from the site's floating WhatsApp button, which only opens a `wa.me` chat for the visitor.

The booking is saved even when WhatsApp is not configured or Twilio returns an error. Unconfigured environments log the message and return `notifications.whatsapp` with `provider: "console"`.

### Sandbox

1. In Twilio Console open **Messaging → Try it out → Send a WhatsApp message**.
2. From the admin's phone, send the sandbox join phrase (it looks like `join <two-words>`) to the sandbox number, usually **+1 415 523 8886**.
3. Set the existing `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`.
4. Set `TWILIO_WHATSAPP_NUMBER` to that sandbox sender, for example `+14155238886`.
5. Set `ADMIN_WHATSAPP` to the admin phone in E.164, including the country code. If it is omitted, `ADMIN_PHONE` is used when it looks like a phone number. A 10-digit North American number is prefixed with `+1`.
6. Leave `TWILIO_WHATSAPP_CONTENT_SID` empty. The API then sends a free-form body, which the sandbox accepts for numbers that have joined.

### Production template

WhatsApp Business delivers business-initiated messages outside the 24-hour session only through an approved template. Create a Twilio Content template with these variables, in order: customer name, email, phone, preferred contact, service, vehicle, date, time, passengers, bags, pickup, drop-off, flight number. Missing vehicle or flight is sent as `N/A`. End the template body with static text so it does not end on a variable. Set `TWILIO_WHATSAPP_CONTENT_SID` to that template's `HX...` SID and `TWILIO_WHATSAPP_NUMBER` to the WhatsApp-enabled sender.

Do not commit real Twilio secrets, join codes, or phone numbers. See `node/.env.example`.

## Production deployment

1. **Render:** Deploy using `render.yaml` (API + PostgreSQL)
2. **Vercel:** Deploy `react/` folder; update `vercel.json` API proxy URL
3. Set production env vars (Stripe live keys, Twilio, Resend, JWT secret)
4. Point `high5limo.ca` DNS to Vercel
5. Register Stripe webhook: `https://YOUR_API/api/payments/webhook`

Details: [docs/High5Limo_Implementation_Plan.md §8](docs/High5Limo_Implementation_Plan.md)

## CI

GitHub Actions runs on push/PR: frontend build, API notification tests, and API health check (`.github/workflows/ci.yml`).
