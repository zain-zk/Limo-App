# High5 Limo

Monorepo with separate frontend and backend for the public website and admin CMS.

## Structure

```
Limo-App/
├── react/              # Public website + admin UI (Vite + React)
├── node/               # CMS API (Express + Prisma + PostgreSQL)
├── docker-compose.yml  # Local PostgreSQL
└── package.json        # Root scripts to run both apps
```

## Prerequisites

- Node.js 18+
- Docker Desktop (for PostgreSQL)

## First-time setup

```bash
# 1. Install dependencies
npm run install:all

# 2. Start PostgreSQL
docker compose up -d

# 3. Configure backend env
cp node/.env.example node/.env

# 4. Install node deps, generate Prisma client, push schema & seed
cd node
npm install
npm run db:setup
cd ..
```

## Run locally

```bash
# React (port 5173) + Node API (port 3001)
npm run dev
```

Or run separately:

```bash
npm run dev:react   # http://localhost:5173
npm run dev:node    # http://localhost:3001
```

## Admin CMS

- URL: http://localhost:5173/admin
- Default login: `admin` / `admin123` (set `ADMIN_USERNAME` / `ADMIN_PASSWORD` in `node/.env`)

Manage site settings, home page content, navigation, bookings, and contact messages.

## API

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/health` | GET | No | Health + DB check |
| `/api/auth/login` | POST | No | Admin login |
| `/api/auth/me` | GET | Yes | Current admin |
| `/api/content` | GET | No | All site content |
| `/api/content/:section` | GET | No | One section |
| `/api/content/:section` | PUT | Yes | Update section |
| `/api/bookings` | GET | Yes | List bookings |
| `/api/bookings` | POST | No | Submit booking |
| `/api/bookings/:id` | PATCH | Yes | Update booking |
| `/api/contact` | GET | Yes | List messages |
| `/api/contact` | POST | No | Submit message |
| `/api/payments/create-checkout` | POST | Yes | Create Stripe Checkout link for a quoted booking |
| `/api/payments/session/:id` | GET | No | Verify Checkout session after redirect |
| `/api/payments/webhook` | POST | Stripe | Marks booking paid + confirmed |

Content, bookings, and messages are stored in **PostgreSQL**.

## Stripe payments (Phase 1)

Quote-first flow:

1. Customer submits a booking (optionally chooses Pay Online).
2. Admin sets a **quote amount** in Admin → Bookings → **Save Quote**.
3. Admin clicks **Create Payment Link** (Stripe Checkout Session).
4. Copy/send the link to the customer.
5. Customer pays → redirects to `/payment/success` → booking becomes `paymentStatus: paid`, `status: confirmed`.

### Local setup

1. Create a [Stripe test account](https://dashboard.stripe.com/test/apikeys) and copy the **Secret key** (`sk_test_...`).
2. Put it in `node/.env`:

```
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:5173
STRIPE_CURRENCY=cad
```

3. (Optional but recommended for webhooks) Install [Stripe CLI](https://stripe.com/docs/stripe-cli) and run:

```bash
stripe listen --forward-to localhost:3001/api/payments/webhook
```

Copy the webhook signing secret into `node/.env` as `STRIPE_WEBHOOK_SECRET`.

Without the CLI, payment still works: the success page verifies the session with Stripe and updates the booking.

### Test card

Use Stripe test card `4242 4242 4242 4242`, any future expiry, any CVC.

## Environment variables (`node/.env`)

```
DATABASE_URL=postgresql://limo:limo_dev_password@localhost:5432/limo_app?schema=public
JWT_SECRET=change-me-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_CURRENCY=cad
```
