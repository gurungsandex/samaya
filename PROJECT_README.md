# NEPAL — Himalayan Timepieces (Demo Store)

A premium, Nepal-inspired watch e-commerce experience. This is a **front-end demo** built as a single streaming Design Component (`NEPAL Watches.dc.html`) — a complete, browsable, purchasable store using realistic sample data, with clean seams for a real backend later.

> **Demo mode:** no real payments are processed. Cart, wishlist, and generated orders persist in the browser's `localStorage`.

---

## Running locally

The store is a single self-contained Design Component whose runtime fetches its
sibling assets over HTTP, so it must be **served**, not opened via `file://`.

```bash
npm start          # serves on http://localhost:4173
# or: PORT=3000 npm start
```

`npm start` runs `serve.js`, a zero-dependency static server (no install step).
Then open the printed URL.

**Offline / restricted networks:** `npm start` first runs `scripts/vendor-react.js`
(the `prestart` hook), which downloads the React + ReactDOM 18.3.1 UMD builds from
the npm registry into a git-ignored `vendor/` and writes `vendor/local-react.js`.
That file points the runtime (`support.js`) at the local copies via
`window.__resources`, so the store runs without reaching the public CDN. The
downloaded bytes are verified against the Subresource-Integrity hashes pinned in
`support.js`, so a corrupted or substituted download is rejected. When `vendor/` has
not been built — e.g. serving the raw files from a static host — the loader `<script>`
404s harmlessly and the runtime falls back to the CDN. Google Fonts load from the
network when available and degrade to system serif/sans fallbacks when they don't.

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
| Watch renderings (per model) | `watchSpec()` — case, metal, finish, bezel, dial, indices, hands, complication, signature |
| A peak's summit silhouette | `summitProfile()` |

**Mountain reference data.** `peaksData()` carries the eight Nepali
eight-thousanders with height, name meaning, first ascent (every summiter named),
expedition, and whether the peak lies wholly in Nepal or on a border. Everest's
height is the 2020 joint Nepal–China resurvey. Sherpa first ascensionists are
credited exactly as their teammates are. If you add or change a figure here, cite
it — the audience for this store checks.

Two items are deliberately marked `TODO-VERIFY` in the source rather than guessed
at: the Devanagari spelling of the Gurkha motto, and the variant spelling of
Kangchenjunga used by the product that links to it.

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
