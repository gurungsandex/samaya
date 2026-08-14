# Handoff: NEPAL — Himalayan Timepieces (Premium Watch E‑Commerce Store)

## Overview
A complete, cinematic e‑commerce storefront for a fictional premium watch brand, **NEPAL — Himalayan Timepieces**. The brand concept: *"Every Watch Tells the Story of Nepal."* Each of 16 watch models is themed to a Himalayan peak, region, or cultural heritage (Everest, Annapurna, Gurkha Legacy, Kathmandu Heritage, etc.). The store is a browsable, purchasable demo: home storytelling → shop with filters → product detail → cart → discount codes → demo checkout → order confirmation → account/order history → order tracking → returns/warranty.

The reference implementation is a single self‑contained HTML "Design Component" (`NEPAL Watches.dc.html`) that runs entirely client‑side with seeded dummy data, `localStorage` persistence, and **programmatically generated SVG watch renders** (no external image dependencies).

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the intended look, content, and behavior. They are **not production code to copy directly**. Your task is to **recreate this design in the target codebase's environment** using its established patterns and libraries. If no codebase exists yet, the recommended stack (from the original brief) is **Next.js + TypeScript + Tailwind CSS + shadcn/ui**, with Supabase/Postgres + Stripe for a real backend later.

The HTML uses a small custom runtime (a `<x-dc>` template + a `Component extends DCLogic` class in `support.js`). **Ignore that runtime** — it is just how the prototype was authored. Read it for layout, styling, copy, data, and logic, then rebuild with real components.

## Fidelity
**High‑fidelity (hifi).** Final colors, typography, spacing, layout, copy, and interactions are all specified and should be recreated faithfully. Exact hex values and type specs are in **Design Tokens** below. The one deliberately "placeholder" aspect: large lifestyle/photography areas are drop‑in image slots meant to be filled with real Himalaya/product photography — in production, replace with real `<img>`/`next/image` sources.

## Recommended Architecture (for a real build)
- **Framework**: Next.js (App Router) + TypeScript.
- **Styling**: Tailwind CSS. Map the tokens below to `tailwind.config` theme extensions.
- **Fonts**: Cormorant Garamond (serif, headings) + Jost (sans, body/UI) via `next/font/google`.
- **Data**: One typed `Product` model; seed 16 products in a `products.ts` (or DB table). Reviews, orders, discount codes as separate seeds.
- **State**: Cart, wishlist, and generated orders in a client store (Zustand/Context) persisted to `localStorage` for demo; swap for DB + auth in production.
- **Routing**: Real routes rather than the prototype's single‑file view switch — see Screens.
- **Watch imagery**: The prototype generates each watch as an SVG at runtime (see **Watch Rendering Engine**). Port this as a `WatchArt` React component OR replace entirely with real product photography. It is the single most distinctive asset of the design.

## Screens / Views
The prototype is a client‑side view switcher (`state.view`). In a real app, make each a route:

| View | Suggested route | Purpose |
|---|---|---|
| Home | `/` | Cinematic brand storytelling + featured products + interactive peak map + engraving preview + newsletter |
| Shop | `/shop` | Product listing: search, filter rail, sort, product grid |
| Product detail | `/watches/[slug]` | Gallery (front/dial/caseback), strap selector, add‑to‑cart, tabs (story/specs/care/shipping/reviews), related |
| Wishlist | `/wishlist` | Saved products, move‑to‑cart |
| Cart | drawer (global) | Slide‑over drawer: line items, qty, discount codes, free‑ship progress, totals |
| Checkout | `/checkout` | Contact → shipping address → shipping method → payment → order summary, with validation |
| Order confirmation | `/order/confirmed` | Generated order number, summary, track/continue links |
| Account | `/account` | Sample customer (Arjun Sharma) + order history |
| Order tracking | `/track` | Enter order # → 8‑stage status timeline |
| Returns & Warranty | `/support/returns` | Request form (issue type, description, resolution) → confirmation |

### Home — section by section (top → bottom)
1. **Announcement bar** (fixed): dark `#12100D`, centered caption "Complimentary engraving & worldwide shipping · Demo store — no real payments", 10.5px, letter‑spacing 0.22em, uppercase.
2. **Header** (fixed, below announcement): transparent over hero, transitions to `rgba(15,14,11,.94)` + bottom border on scroll (`scrollY > 80`) or on any non‑home view. Left nav (Watches, Mountains, Soul of Nepal, Gurkha Legacy, Our Story), centered wordmark **NEPAL** (Cormorant, 27px, letter‑spacing 0.42em) with kicker "Himalayan Timepieces", right utilities (search icon, Account, Wishlist w/ count, Cart w/ count badge).
3. **Hero**: full‑viewport. Background image slot + dark gradient overlay + faint SVG contour lines. Eyebrow "Born in the Himalayas · Built for Every Journey" (`#B98D57`, 0.42em). H1 "Time Forged / in the Himalayas" (Cormorant 500, clamp(48px,7vw,104px), line‑height 0.98). Sub‑paragraph. Two buttons: primary filled `#A07C46` "Explore the Collection", ghost "Discover Our Story". Right: "8,848.86 m · Sagarmatha · Everest" stat.
4. **Trust marquee strip**: `#12100D`, 4 spaced items (movements, sapphire crystal, individually numbered, free engraving/shipping), 11px uppercase 0.24em.
5. **Featured Collections**: `#1B1712`. Header row "The Collection" + H2 "Every Watch Tells / the Story of Nepal" + "Shop all ten models →". Grid of 4 featured product cards (see Components → Product Card).
6. **Every Peak Has a Story** (interactive): `#12100D`. Left: stylized SVG map of Nepal with 7 clickable peak dots (active dot enlarges + glows gold). Right: detail panel updates on select — region, elevation, name, nickname, significance paragraph, inspired watch (with generated render), Shop button.
7. **The Gurkha Legacy**: `#14170F`. Background image slot + left‑to‑right dark gradient. Eyebrow "Heritage", H2, narrative paragraph, two stats (1815, Nepali motto कायर हुनु with translation), CTA "Meet the Gurkha Legacy" (`#3A4636`).
8. **Craftsmanship**: **light section** `#F4F1EA` / text `#1B1712`. Left image slot (4:5). Right: eyebrow, H2 "Measured in Detail, / Built for a Lifetime", 2×4 spec grid (Movement, Case, Crystal, Water Resist., Case Back, Numbering, Strap, Warranty).
9. **Soul of Nepal** (emotional editorial): `#1B1712`. Centered intro (eyebrow "The Soul of Nepal", H2 "A Watch Is Small. The Story It Carries Is Not.", lead paragraph). Then a responsive grid of **6 theme cards** — each: image slot (4:3) + kicker + H3 + paragraph:
   - Diversity & Ethnicity — "One Country, A Hundred Living Cultures"
   - Nature & Inspiration — "Eight of the World's Ten Highest Peaks"
   - Courage & Loyalty — "Better to Die Than Live a Coward"
   - History & Craft — "Hands That Have Carved for a Thousand Years"
   - Generosity & Humanity — "The Guest Is God — Atithi Devo Bhava"
   - Love & Emotion — "Some Things Are Meant to Be Handed Down"
   Closes with a centered italic pull‑quote (Cormorant italic, `#C9A26a`): *"You are not only buying a watch. You are carrying a piece of Nepal — its mountains, its people, and the quiet, stubborn love they have for this land."*
10. **Engrave the Case Back** (interactive): `#0f0e0b`. Left: live round case‑back preview (radial‑gradient disc, floating animation) rendering the entered Name, Date, and Message. Right: text inputs (Name/Initials — force uppercase; Important Date — uppercase; Personal Message) that update the preview live, plus CTA to shop engravable watches.
11. **Brand Story**: `#12100D` with faint contour overlay. Centered large serif quote about Everest → Kathmandu, attribution "The NEPAL Atelier · Kathmandu".
12. **Newsletter "Join the Expedition"**: **gold section** `#A07C46` / dark text. Email input + Subscribe; validates email, toasts confirmation.
13. **Footer**: `#0d0c0a`. 4 columns (brand blurb, Shop, Company, Support) + bottom bar (© 2026 · Demo store · Kathmandu).

## Components

### Product Card
- Container: `#17130E`, 1px border `#2b2720`; on hover border → `#A07C46`. Column flex.
- Image area: `aspect-ratio: 1` (shop) or `3/4` (featured). Renders the generated watch SVG (`fit: cover`). Clickable → product page.
- Badge (top‑left, if present): 8.5–9px uppercase 0.16–0.2em, padded. Badge colors by type: Bestseller → bg `#3A4636`/text `#e8ecd9`; Limited/Numbered Edition → bg `#8C2F27`/text `#F4F1EA`; New Arrival → bg `#A07C46`/text `#17130E`; default → bg `#241f18`/text `#C9A26a`.
- Wishlist heart (top‑right): 32px circle, `rgba(23,19,14,.7)`; filled `♥` `#c96a5f` + border `#8C2F27` when saved, else `♡`.
- Quick View button: appears at image bottom, `rgba(160,124,70,.94)`, opens modal.
- Body: collection kicker (`#A07C46`, 9px, 0.22em), name (Cormorant 22–27px), star row (`#C9A26a`) + review count, short inspiration line, price (Cormorant 21–22px) + optional struck‑through compare‑at, "Add"/"Add to Cart" outline button, optional low‑stock note (`#c9895f`) "Only N left".

### Cart Drawer
- Right slide‑over `min(440px,100%)`, bg `#17130E`, left border. Backdrop `rgba(10,9,7,.7)`, fade‑in; drawer slides in (`translateX(100%)→0`, 0.4s cubic‑bezier(.16,1,.3,1)).
- Header with title + count + close ×. Empty state (icon, message, "Explore Watches").
- Line items: 74×92 thumb, name, strap label, qty stepper (− value +), remove ×, line total.
- Footer: free‑shipping progress bar (fills to $200), discount input + Apply (success `#7fae72` / error `#c96a5f` message), Subtotal, Discount, Total (Cormorant 26px), "Proceed to Checkout" (filled gold), "Continue Shopping".

### Quick View Modal
Two‑column (image | info), `popIn` animation. Collection, name, stars, price, short description, Add to Cart, "View Full Details →".

### Product Detail
- **Gallery** (sticky): large square main image + 5 thumbnails (Front, Three‑Quarter, Dial Detail, Case Back, On Wrist). Active thumb border `#A07C46`. Main + thumbs re‑render when strap changes.
- **Info**: collection kicker, H1 (Cormorant clamp(38px,4.4vw,56px)), stars + rating + review count + badge, price + compare‑at, stock line (color by level), short description.
- **Strap selector**: 3 options — Leather, Canvas, **Steel Chain**. Selecting re‑renders the watch with that band. Default = the model's native strap.
- **Quantity stepper** + **Add to Cart** (filled gold) + **Buy Now** (filled cream, adds & goes to checkout) + **Save/wishlist**.
- **Trust row**: Delivery 3–5 days · Returns 30‑day free · Warranty (per model). Payment icons line.
- **Tabs**: Story (narrative + inspiration/region/engraving/packaging table), Specifications (12‑field grid), Materials & Care, Shipping & Returns (with "draft policy — requires professional review" note), Reviews (average summary + write‑a‑review form + review list with verified badges).
- **Related** grid (up to 4, same collection or movement). **Sticky mobile add‑to‑cart bar** at viewport bottom.

### Forms (checkout, returns, review, newsletter)
Inputs: bg `#17130e`, 1px `#2b2720` border, focus border `#A07C46`, invalid border `#8C2F27`. Selects use a custom chevron. Validate required fields + email regex `^[^@\s]+@[^@\s]+\.[^@\s]+$` before submit; highlight invalid fields and show a summary error line.

### Toast
Fixed bottom‑center, bg `#F4F1EA`, dark text, ✓ prefix, auto‑dismiss ~2.6s.

## Watch Rendering Engine (distinctive — port or replace)

One renderer, driven by a per-model spec. Every watch is a different watch — case
size, metal, finish, bezel treatment, dial material, index type, hand style and
complication all move independently. Nothing is one watch recoloured.

**`watchSpec(slug)`** returns the model's spec:

| Field | Meaning |
|---|---|
| `caseMm`, `l2lMm` | Case diameter 38–42 mm; lug-to-lug always under 49 mm |
| `metal`, `finish` | `steel · titanium · bronze · gold · graphite · ceramic` × `brushed · polished · ceramic` |
| `indexMetal` | Optional — markers in a different metal to the case (a blackened case still gets rhodium markers) |
| `bezelStyle`, `bezelPct` | `slope · coin · flute · dive`; bezel is 8–11% of case diameter |
| `dial` | `{type: sunburst · lacquer · grained · matte, base, axis, lift}` |
| `index`, `hands` | Index type and lume; hand style `dauphine · sword · syringe · baton` |
| `complication` | `null` or `gmt` |
| `signature` | `{peak, element}` — the peak whose summit profile the model carries, and the **one** element carrying it: `12`, `counterweight`, or `caseback` |
| `altitude` | Printed on the dial and engraved on the case back |

**Geometry (`watchGeom`)** derives every radius as a ratio of case diameter, so the
proportions hold at any size: dial opening 78–82%, hour hand to the inner index
edge, minute hand to the minute track, seconds hand overshooting onto the chapter
ring, crown ~12% of case diameter.

**Materials** are three layers each — base colour, directional finish, specular
highlight. Brushed steel is a fine repeating linear pattern under a top-left light
wash; polished steel is a hard-stop gradient (never a smooth ramp); a sunburst dial
is 360 narrow alternating wedges grouped into three paths, brighter along one axis;
lacquer is a deep radial going near-black at the rim; sapphire is one diagonal
glare band plus a faint blue-violet AR cast; ceramic is flatter than steel with its
only highlight on the chamfer.

**Details that separate real from fake:** applied indices are built as a side wall
plus a face split down its own ridge (bright half, dark half), never a flat
rectangle with a drop shadow; hands are faceted the same way; lume is a recessed
warm-cream inlay inset from the index edge; the minute track carries 1/5/15-minute
weights; the chapter ring is angled; the crown is fluted and signed; the date frame
is chamfered in the case metal; the seconds hand has a counterweight.

**Shots:** `front`, `dial` (zoomed, no strap), `caseback` (engraved altitude,
region, and the summit relief on models signed there), `lume` (lights out, only the
charged compound emitting).

**Two renderers share all of the above:**
- `watchArt(product, shot, strapKey, opts)` → `data:image/svg+xml,…` still, cached
  by `slug|shot|strap|detail`. Used by every `<image-slot>` on the site.
- `watchLive(product, opts)` → a React element with **inline** SVG. Used only on the
  product hero. Hands run on CSS animations seeded with a negative delay equal to
  the current time, so they show the real time and keep moving with no JS ticking
  and no re-render per second. Pointer tilt is capped at 6° with the sapphire glare
  tracking it, the case back flips, and `prefers-reduced-motion` drops the whole
  lot back to a correct still.

**Detail budget** — `detail: 1` (grid cards) / `2` (gallery thumbs) / `3` (hero).
Lower levels drop the sunburst ray count, the 1-minute track marks, the bezel
milling, the specular slivers and the crystal, none of which resolve at card size.
Data URIs use a minimal five-character escaper rather than `encodeURIComponent`,
which would inflate markup that is mostly angle brackets by about a third.

**To replace with photography:** swap the `src` on the `<image-slot>` elements
(ids below) and replace `P.watchEl` on the product hero with a slot of its own.

## Interactions & Behavior
- **Nav scroll state**: header becomes opaque + bordered when `scrollY > 80` or view ≠ home.
- **Scroll reveal**: elements with a "rise" class fade/translate up when within 90% of viewport height (interval‑checked). Recreate with IntersectionObserver.
- **Peak map**: clicking a dot sets active peak; detail panel + inspired‑watch render update.
- **Engraving preview**: Name/Date inputs force uppercase; all three fields update the live case‑back preview.
- **Strap switch on PDP**: re‑renders main image + all gallery thumbs with the chosen band.
- **Cart math**: subtotal = Σ(price×qty). Discounts: `HIMALAYA10` = 10% off order; `EVEREST15` = 15% off Everest Summit line only (requires that item); `FREESHIP` = shipping $0. Shipping by method: Standard $8 (free ≥ $200), Express $24, Intl tracked $35, Intl express $59. Tax = 8% of (subtotal − discount). Total = taxable + shipping + tax. Enforce qty ≤ inventory everywhere.
- **Checkout → order**: validates contact/address; generates order number `HT‑2026‑NNNN`; clears cart; shows confirmation; new order appears in Account and is trackable.
- **Tracking**: 8 stages — Order received, Payment confirmed, Watch preparation, Quality inspection, Shipped, In transit, Out for delivery, Delivered. Timeline fills completed steps gold, marks current.
- **Animations**: drawer 0.4s cubic‑bezier(.16,1,.3,1); modal `popIn`; case‑back `floaty` 6s; reveals ~1s ease‑out. Respect `prefers-reduced-motion` in production.

## State Management
- `cart: {slug, strap, qty}[]` — persisted `nepal_cart`.
- `wishlist: slug[]` — persisted `nepal_wishlist`.
- `orders: Order[]` (user‑generated) — persisted `nepal_orders`; concatenated with sample orders for display.
- Ephemeral UI: `view/route`, `selectedPeak`, `cartOpen`, `quickSlug`, `toast`, product `qty/strap/tab/gallIdx`, `reviewFormOpen`, checkout form `co` + `coErr`, discount `discInput/discCode`, tracking + returns form state.
- Sample customer: **Arjun Sharma · arjun@example.com · New York**. Sample orders: `HT-2026-1048` (Delivered), `HT-2026-1032` (In transit), `HT-2026-1051` (Preparation).

## Product Data Model
Each of 16 products carries: `slug, name, collection, inspiration, price, compareAt, badge, inventory, bestseller, featured, limited, caseSize, caseMaterial, dialColor, movement, movementMfr, crystal, wr, strapType, strapColor, power, warranty, region, engraving, packaging, rating, reviewCount, sort, shortDesc, story`. Collections: Everest, Annapurna Series, Dhaulagiri, Manaslu, Kanchenjunga, Lhotse, Makalu, Gurkha Legacy, Kathmandu Heritage, Ama Dablam, Langtang, Tilicho, Mustang, Expedition, Sherpa Heritage. Prices ~$279–$599. **All 16 records, full copy, and stories are in the logic class of `NEPAL Watches.dc.html` (`baseProducts()`) — copy them verbatim.**

## Design Tokens
**Colors**
- Backgrounds (dark): `#17191A`, `#1B1712`, `#17130E`, `#14110c`, `#12100D`, `#0f0e0b`, `#0d0c0a`
- Light section bg: `#F4F1EA` (text on it `#1B1712`, muted `#5a5346`, hairline `#d8cfbd`)
- Borders/hairlines (dark): `#2b2720`, `#241f18`, `#221e18`, `#201d17`, `#4a453b` (muted)
- Primary gold (brand/CTA): `#A07C46`; hover/light gold `#B98D57`; warm gold text `#C9A26a`, `#C9B48c`
- Gurkha green: `#3A4636` (hover `#48573f`), accent `#14170F`
- Nepali red (accent only): `#8C2F27`; error text `#c96a5f`
- Success/positive: `#7fae72`
- Text: primary `#F4F1EA` / `#E9E3D6`; body `#D3CCBD` / `#C4BBAB`; muted `#A89F8f` / `#a89f8f`; faint `#8b8378`, `#6b6558`, `#5a5346`
- Low‑stock warn: `#c9895f`

**Typography**
- Serif (display/headings): **Cormorant Garamond** (400/500/600, + italic). Wordmark letter‑spacing 0.42em; section H2 clamp(34px,5vw,60px), weight 500, line‑height ~1.
- Sans (body/UI): **Jost** (300/400/500/600). Body 13–16px, line‑height 1.6–1.85, weight 300 for paragraphs.
- Eyebrows/kickers: 10–12px, uppercase, letter‑spacing 0.22–0.42em, color `#A07C46`/`#B98D57`.
- Global letter‑spacing on body ~0.01em. Use `text-wrap: balance/pretty` on headings/paragraphs.

**Spacing / layout**
- Section padding: ~110–140px vertical, 48px horizontal (40px on inner pages).
- Content max‑widths: 1180–1280px. Card grids via CSS grid `repeat(auto-fit/fill, minmax(230–300px, 1fr))` with 2px gaps (hairline‑separated cards) or larger gaps for editorial.
- Fixed header offset: content on inner views starts ~116–140px from top.

**Radius / shadows / motion**
- Mostly square/architectural (0 radius) with occasional pills (badges, count chips). Round preview disc = 50%.
- Shadows are restrained; drawer/modal use dark backdrops rather than large shadows.
- Easing: `cubic-bezier(.16,1,.3,1)` for entrances; durations 0.3–1.1s.

## Assets
- **No external images required** — all watch imagery is generated SVG. Large lifestyle/hero/section/theme areas use drop‑in image slots intended for **real photography** in production (Himalayan landscapes, Gurkha heritage, craft, hospitality, product macros). Source licensed photography; wire to `next/image`.
- **Fonts**: Google Fonts — Cormorant Garamond + Jost.
- **Icons**: inline SVG (search, heart, cart) — replace with the codebase's icon set (e.g. lucide‑react).
- **Nepali script** used intentionally in Gurkha section (कायर हुनु) and generosity theme (Atithi Devo Bhava) — keep as real text with proper font fallback.

## Files
- `NEPAL Watches.dc.html` — the complete design reference (template markup + logic class with all data, copy, totals math, and the SVG watch engine). This is the source of truth for layout, tokens, copy, product data, and behavior.
- `image-slot.js` — the prototype's drag‑drop image placeholder web component (reference only; replace with real image components).
- `README.md` (project root) — demo run notes, discount codes, sample tracking numbers, and production‑conversion checklist.

## Production Notes / Launch Checklist
- Replace generated SVG renders with real product photography (or keep SVG as fallback).
- Move product/reviews/orders to a DB or CMS; add real auth (replace the Arjun Sharma sample session).
- Payments: Stripe (test → live), server‑side keys only — **never** in client code; env‑var placeholders.
- Tax/shipping: replace flat 8% + method map with tax + carrier‑rate APIs.
- Legal/policy copy is **draft** and flagged in‑app — have counsel review before launch.
- Accessibility: keyboard nav, labels, focus states, `prefers-reduced-motion`; audit contrast on the palest dials/text.
