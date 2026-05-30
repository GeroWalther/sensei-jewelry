# Sensei Shop

A modern, polished Next.js 14 e-commerce starter built with:

- **Next.js 14** (App Router, RSC, Server Actions)
- **MongoDB** via **Mongoose**
- **Stripe Checkout** (hosted) + signed webhook
- **Resend** + **react-email** for transactional emails
- **Tailwind CSS** + shadcn-style UI primitives (neutral palette, Geist font)
- **Zustand** for the cart (localStorage-persisted)
- **HTTP Basic Auth** middleware to gate `/admin`

## Routes

- `/` — Home (hero with hover-to-swap image, featured products, value props)
- `/products` — All products
- `/products/[slug]` — Product detail
- `/cart` — Cart & checkout entry
- `/success` — Post-checkout confirmation (clears cart, fetches Stripe session)
- `/about` — Static about page
- `/admin` — Dashboard (revenue, orders, products, customers)
- `/admin/products` — Product list with toggle availability / delete
- `/admin/products/new` — Create product (Server Action)
- `/admin/orders` — Recent orders
- `/admin/customers` — Customer list
- `/api/checkout` — POST creates a Stripe Checkout Session
- `/webhooks/stripe` — Stripe webhook (`checkout.session.completed` → persist Order + send Resend receipt)

## Getting started

```bash
# 1. Install
npm install

# 2. Env vars
cp .env.example .env
# fill in MONGODB_URI, STRIPE_*, RESEND_API_KEY, ADMIN_USERNAME, ADMIN_PASSWORD

# 3. Seed demo products
npm run seed

# 4. Dev
npm run dev
```

Open <http://localhost:3000>. The admin is at <http://localhost:3000/admin> (HTTP Basic auth via `ADMIN_USERNAME` / `ADMIN_PASSWORD`).

## Stripe webhook (local)

```bash
stripe listen --forward-to localhost:3000/webhooks/stripe
```

Copy the printed `whsec_…` into `STRIPE_WEBHOOK_SECRET`.

## Email preview

```bash
npm run email
```

Opens the react-email preview server on <http://localhost:3002>.

## Project layout

```
src/
  app/
    (customerFacing)/      # public shop, shares Nav + Footer layout
      _components/         # product card, add-to-cart button
      products/[slug]/
      cart/
      success/
      about/
      page.tsx             # home
      layout.tsx
    admin/                 # gated by middleware basic auth
      _actions/            # server actions (product CRUD)
      products/[, new]
      orders/
      customers/
      layout.tsx           # admin shell with sidebar nav
      page.tsx             # dashboard
    api/
      checkout/            # POST -> Stripe Checkout Session
    webhooks/
      stripe/              # signed webhook handler
    layout.tsx             # root, fonts + toaster
    globals.css            # neutral design tokens
  components/
    ui/                    # shadcn-style primitives (button, card, sheet, …)
    site/                  # nav, footer, cart drawer, hero image swap
  db/
    mongoose.ts            # cached connection
    models/                # Product, Order, Customer, DiscountCode
  email/
    order-receipt.tsx      # react-email template
  lib/
    cart-store.ts          # Zustand + persist
    stripe.ts
    resend.ts
    utils.ts               # cn(), formatPrice()
  middleware.ts            # HTTP Basic auth on /admin/*
scripts/
  seed.ts                  # `npm run seed`
```

## Notes

- Stripe Checkout (hosted) is used instead of Stripe Elements — Stripe owns the payment UI, the webhook is the source of truth for orders.
- The cart lives entirely client-side (Zustand + localStorage). On checkout we re-resolve product prices server-side, so the client can't tamper with amounts.
- The neutral palette is HSL-based for Tailwind v3 compatibility, but matches the visual feel of the shadcn/ui "new-york" `neutral` base color.
