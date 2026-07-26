# NEPAL — Himalayan Timepieces (Demo Store)

A premium, Nepal-inspired watch e-commerce experience. This is a **front-end demo** built as a single streaming Design Component (`NEPAL Watches.dc.html`) — a complete, browsable, purchasable store using realistic sample data, with clean seams for a real backend later.

> **Demo mode:** no real payments are processed. Cart, wishlist, and generated orders persist in the browser's `localStorage`.

---

## What's included

**Views (client-side router, no page reloads)**
- Home (cinematic storytelling: hero, featured watches, interactive "Every Peak Has a Story" map, Gurkha Legacy, craftsmanship, engraving preview, brand story, newsletter)
- Shop — search, filters (collection, price, movement, dial colour, strap, limited, in-stock), sorting, empty state
- Product detail — image gallery + thumbnails, strap selector, quantity, add-to-cart / buy-now / wishlist, delivery-returns-warranty summary, tabs (Story / Specifications / Materials & Care / Shipping & Returns / Reviews), write-a-review, related watches, sticky mobile add-to-cart
- Cart drawer — quantity, remove, discount codes, free-shipping progress, live totals
- Checkout — contact, shipping address, shipping method, demo payment (card/PayPal/Apple Pay/Google Pay), order summary, field validation
- Order confirmation — generated order number, summary, track/account links
- Account — sample customer + order history with statuses
- Order tracking — 8-stage timeline
- Returns & Warranty — request form with confirmation state
- Quick View modal, toast notifications

**Seed data (in the logic class, `baseProducts()` etc.)** — 16 watches across 15 collections, each with a distinct generated SVG rendering (front / dial / case-back) prefilled into its image slots and replaceable with real photography.
- 16 Nepal-inspired watches, each with a unique generated vector rendering and unique case/dial/movement/story/specs/packaging
- ~18 sample reviews across models
- 3 sample orders at different fulfilment stages
- Sample customer: **Arjun Sharma · arjun@example.com**

**Discount codes**
- `HIMALAYA10` — 10% off the order
- `EVEREST15` — 15% off Everest Summit 8848 only
- `FREESHIP` — free shipping

**Sample tracking numbers**
- `HT-2026-1048` (Delivered) · `HT-2026-1032` (In transit) · `HT-2026-1051` (Preparation)

---

## Editing the store

All content lives in the logic class inside `NEPAL Watches.dc.html`:

| To change… | Edit… |
|---|---|
| Products, prices, inventory, specs, stories | `baseProducts()` |
| Reviews | `reviewsFor()` |
| Sample orders | `sampleOrders()` |
| Discount codes | `applyDiscountCode()` + `totals()` |
| Shipping rates & tax | `totals()` (methods map, `0.08` tax) |
| Peaks / interactive map | `peaksData()` |

**Product images:** every image is a drop-in `<image-slot>` placeholder (drag a photo onto it in the editor; it persists). Slot ids follow a structured pattern (`pg-{slug}-{0..4}` gallery, `shop-{slug}`, `feat-{slug}`, `cart-{slug}`, `wl-{slug}`, `qv-{slug}`). Replace with professional product photography later — keep dial colour, hands, strap, and case finish consistent across a model's shots.

---

## Converting to a production store

The demo is structured so each concern maps to a real integration point. **Never put secret keys in front-end code — use server-side env vars.**

- **Data / CMS** — move `baseProducts()`, reviews, orders into a database or headless CMS (Supabase/Postgres). Replace the in-class arrays with a fetch layer.
- **Auth** — replace the sample `Arjun Sharma` session with real auth (Supabase Auth / Clerk / Auth.js).
- **Payments** — swap the demo payment step for Stripe (test mode first). `placeOrder()` is the single hook that currently generates an order.
- **Tax / shipping** — replace the flat 8% + method map in `totals()` with a tax API (e.g. Stripe Tax) and carrier rate API.
- **Email** — wire order confirmation and returns to a transactional email provider.
- **Images** — host on Cloudinary/S3 and swap `<image-slot>` for real `<img>` sources.

### Suggested production stack
Next.js · TypeScript · Tailwind · Supabase/Postgres · Stripe · Cloudinary · a headless CMS.

---

## Launch checklist (before accepting real orders)
- [ ] Real product photography for all 16 models (replaces the generated vector renders)
- [ ] Database + CMS wired; remove seeded arrays
- [ ] Auth + real customer accounts
- [ ] Stripe live keys (server-side), tax + shipping APIs
- [ ] Transactional email (orders, shipping, returns)
- [ ] Legal pages reviewed by counsel (draft policy copy is marked as such in-app)
- [ ] Accessibility audit + analytics + error monitoring

## Not yet built (next iterations)
Admin dashboard, product comparison, dedicated legal/journal pages, and gift-card purchase flow are scoped but not implemented in this demo pass.
