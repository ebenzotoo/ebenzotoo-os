# UI Overhaul — Design Spec
**Date:** 2026-05-31
**Scope:** Full visual overhaul of OS dark mode — all public-facing pages, sidebar, SystemDock, MobileDock
**Approach:** Approach 3 — Full rebuild. Charcoal background, orange accent, glassmorphism cards, collapsible sidebar, cinematic home hero.
**Out of scope:** Clean mode (unchanged), Admin panel (unchanged)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|---|---|---|
| `os-bg` | `#0A0A0F` | Page background — dark charcoal |
| `os-surface` | `#141418` | Glass card base |
| `os-surface-2` | `#1E1E28` | Hover / nested surfaces |
| `os-border` | `rgba(255,255,255,0.08)` | Default card borders |
| `os-border-hover` | `rgba(249,115,22,0.4)` | Hover borders — orange glow |
| `os-text-main` | `#E8EDF5` | Primary text |
| `os-text-muted` | `#6B7A99` | Secondary text, labels |
| `os-primary` | `#F97316` | Orange — active states, CTAs, highlights |
| `os-primary-light` | `#FB923C` | Soft orange — tech tags, subtle accents |
| `os-secondary` | `#3A86FF` | Blue — secondary actions, mindset tags |
| `os-gold` | `#D4AF37` | Gold — tertiary accent only (other note tags) |

**Removed:** `os-primary` teal (`#0BCEAF`) — replaced entirely by orange.
**Changed:** `os-bg` from navy `#080E1A` → charcoal `#0A0A0F`.
**Changed:** `os-surface` from `#0F1626` → `#141418`.

### Typography
Outfit retained for all UI text. Fira Code retained for terminal content blocks only.

| Size | Usage |
|---|---|
| `11px` Outfit 500, `0.12em` spacing | All-caps section labels |
| `13px` Outfit 400 | Body small, meta, dates |
| `15px` Outfit 400 | Body default |
| `16px` Outfit 600 | Note titles, subheadings |
| `18px` Outfit 600 | Card titles, section heads |
| `24px` Outfit 700 | Page headings |
| `32px` Outfit 800 | Display numbers (stats), hero name |

### Glassmorphism Tokens

| Property | Value |
|---|---|
| Card background | `rgba(255,255,255,0.04)` |
| Card border (default) | `1px solid rgba(255,255,255,0.08)` |
| Card border (hover) | `1px solid rgba(249,115,22,0.4)` |
| Backdrop blur | `blur(12px)` |
| Card hover shadow | `0 8px 32px rgba(249,115,22,0.12)` |
| Card hover lift | `translateY(-2px)` |

### Spacing
8px base grid: `8 / 16 / 24 / 32 / 40 / 48 / 64`

### Shape
| Context | Radius |
|---|---|
| Tags, badges | `6px` |
| Cards | `14px` |
| Large panels | `16px` |
| Sidebar items | `8px` |

---

## 2. Sidebar

- **Default width:** 56px — icons only, centered
- **Expanded width:** 220px — on hover, CSS transition 300ms ease
- **Background:** `rgba(255,255,255,0.03)` with `1px` right border `rgba(255,255,255,0.06)`
- **Expanded background:** `rgba(255,255,255,0.04)` with `1px` border `rgba(249,115,22,0.15)`
- **Logo:** Orange icon mark in top slot (`28×28px`, orange border)
- **Branding (expanded):** "EBENEZER" `9px` Outfit 700 `0.1em` spacing + "ZOTOO" `7px` muted below
- **Nav items (collapsed):** `38×32px` icon slots, `16px` icons
- **Nav items (expanded):** `14px` icon + label side by side, `8px 10px` padding
- **Active state:** Orange tinted background `rgba(249,115,22,0.12)` + `1px` orange border + `3px` orange left bar
- **Inactive:** `rgba(255,255,255,0.2)` icon + muted label → white on hover
- **Bottom strip:** Availability dot (orange `#F97316`, pulsing) + "Open to collaborating" text (expanded only)
- **Mobile:** Replaced by MobileDock — sidebar not shown

---

## 3. SystemDock

- **Background:** `rgba(255,255,255,0.03)` + `backdrop-filter:blur(8px)` + `1px` top border `rgba(255,255,255,0.06)`
- **Row 1 (status bar):**
  - Left: `● Open to collaborating` — orange dot, orange text, `11px` Outfit
  - Center: Social icons (LinkedIn, Twitter, Facebook) — muted → orange on hover
  - Right: `Start a Project` (glass ghost button, orange border) + `Book a Consult ↗` (orange filled)
- **Row 2 (icon dock):**
  - 6 nav icons centered, `18px`
  - Active: orange icon + small orange dot underneath
  - Inactive: muted → white on hover
  - No background pills

---

## 4. Reusable Components

### ProjectCard
- Background: `rgba(255,255,255,0.04)`, `backdrop-filter:blur(12px)`, `1px` border `rgba(255,255,255,0.08)`, `14px` radius
- Image block: `140px` tall, `object-cover`, gradient fade into card body
- Status badge (top-right of image): `LIVE` or `WIP` — orange bg/border
- Body padding: `16px`
- Title: `15px` Outfit 600, `#E8EDF5`
- Description: `13px` Outfit 400, `#6B7A99`, 2-line clamp
- Tech tags: `10px` Outfit 600, `#FB923C` text, `rgba(249,115,22,0.1)` bg, `1px` orange border, `5px` radius
- Bottom row: date (muted, left) + live/github icon buttons (right)
- Hover: border → `rgba(249,115,22,0.4)`, shadow `0 8px 32px rgba(249,115,22,0.12)`, lift `translateY(-2px)`

### NoteCard
- Same glass surface and border tokens as ProjectCard
- Layout: horizontal — `90px` wide cover strip on left, content on right
- Cover strip: gradient tinted with tag color (orange/blue/gold per topic)
- Tag badge: `8px` Outfit 700, uppercase, `0.08em` spacing
  - Tech topics → orange (`#F97316`)
  - Mindset topics → blue (`#3A86FF`)
  - Other → gold (`#D4AF37`)
- Date + read time: `11px` Outfit 400, muted
- Title: `15px` Outfit 600, `#E8EDF5`
- Excerpt: `13px` Outfit 400, `#6B7A99`
- Hover: same lift + orange border glow as ProjectCard

### CommandPalette
- Background: `rgba(14,14,20,0.95)` + `backdrop-filter:blur(20px)`
- Border: `1px solid rgba(249,115,22,0.2)`
- Active result: orange left bar + orange tinted row
- Search input: orange caret, orange focus ring

---

## 5. Page-by-Page

### Home (/)

**Hero Banner (new):**
- Full-width panel, `border-radius:14px`, dark gradient bg with orange glow
- Left side: role label (orange, all-caps, letter-spaced) + 3-line headline ("Building / Digital / Products.") with last word in orange + two CTAs (orange filled + orange ghost)
- Right side: professional photo with gradient overlay blending into bg
- Bottom: glassmorphism stats bar with 4 stats (8+ Years, 30+ Projects, 15+ Clients, 5★ Rated)

**Featured strip (new — Approach 3):**
- CSS auto-scroll marquee (`animation: marquee linear infinite`) — project names separated by orange `·` dividers
- Positioned below hero, above main content sections
- Pauses on hover

**Rest of page:**
- Terminal bio block: keep `bio.txt` panel — orange header bar, Fira Code for filename only
- Core Expertise tags: new glass tag style
- Experience timeline: left border `rgba(255,255,255,0.08)`, orange ring dot, role `14px` Outfit 600, company `12px` blue
- Trusted By: logo grid at `70%` opacity default, full on hover

### Projects (/projects)
- Header: section label left, count badge + active filter badge right
- Grid: 2-col desktop, new glass ProjectCard
- Detail page: full-width hero image with gradient overlay, tech tags, gallery grid, orange filled live button + ghost GitHub button

### Notes (/notes)
- Single column list, new glass NoteCard
- Section label: `// Notes` — `//` in orange, `Notes` in `14px` Outfit 600
- Detail page: `680px` max reading width, `16px` Outfit 400 body, `1.75` line-height, Outfit 700 headings, full-width inline images `14px` radius

### About (/about)
- Same hero components as Home minus the hero banner (starts with avatar + name + role)
- Longer-form intro paragraph
- Bio block, expertise tags, experience timeline (same as home)

### Contact (/contact)
- `contact.json` terminal block: orange for `const`/keywords, blue for property names, gold for string values
- Form inputs: `rgba(255,255,255,0.04)` bg, `1px` border `rgba(255,255,255,0.08)`, `14px` Outfit, orange focus ring
- Submit button: orange filled, Outfit 600, no gradient
- Social links: muted → orange on hover

### Systems (/systems) & Lab (/lab)
- Token sweep + glassmorphism on cards/panels only
- Layouts preserved — no structural changes

---

## 6. MobileDock
- Background: `rgba(10,10,15,0.95)` + `backdrop-filter:blur(16px)` + `1px` top border `rgba(255,255,255,0.06)`
- Active icon: orange, small orange dot underneath
- Inactive: muted → white on hover
- No structural changes

---

## 7. What Does NOT Change
- OS layout structure: sidebar + main + SystemDock + MobileDock
- Ghost watermark placement and opacity
- Terminal content blocks (bio.txt, contact.json) — kept as signature elements
- `//` comment-style section labels — kept but now orange-accented
- Clean mode — out of scope
- Admin panel — out of scope
- Page routing and data fetching

---

## 8. Design Principles
- **No decorative gradients** — glows and shadows only, never color sweeps
- **Outfit for all UI text** — Fira Code only for terminal content
- **8px grid** — all spacing in multiples of 8
- **Token-driven** — never hardcode colors
- **Glassmorphism standard:** `rgba(255,255,255,0.04)` bg + `blur(12px)` + `rgba(255,255,255,0.08)` border
- **Hover = lift + orange border glow** — consistent across all cards
- **Orange for primary/active, blue for secondary, gold for tertiary only**
- **Collapsible sidebar** — 56px collapsed, 220px on hover, 300ms ease
