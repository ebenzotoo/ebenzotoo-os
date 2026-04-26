# OS Dark Mode Redesign — Design Spec
**Date:** 2026-04-26
**Scope:** All public-facing OS dark mode pages
**Approach:** Elevated OS — keep structure and signature mono elements, elevate typography and card design

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|---|---|---|
| `os-bg` | `#080E1A` | Page background |
| `os-surface` | `#0F1626` | Cards, panels |
| `os-surface-2` | `#151E30` | Hover states, nested surfaces |
| `os-border` | `#1A2540` | Default borders |
| `os-border-hover` | `#253354` | Hover borders |
| `os-text-main` | `#E8EDF5` | Primary text |
| `os-text-muted` | `#6B7A99` | Secondary text, labels |
| `os-primary` | `#0BCEAF` | Teal — active states, links, highlights |
| `os-secondary` | `#3A86FF` | Blue — secondary actions, tags |
| `os-gold` | `#D4AF37` | Gold — tertiary accent, hover glows only |

**Removed:** `os-accent-green` (#F9A41E orange, misnamed). Replaced by `os-primary` teal.
**Retained:** `os-gold` as a subtle tertiary — used for hover glows and select decorative accents only.

### Typography

- **Outfit** replaces all fonts: Space Grotesk, Syne, Fira Code for UI elements
- **Fira Code** is retained strictly inside terminal content blocks (bio.txt panel, contact.json) — content, not UI
- Type scale:

| Size | Usage |
|---|---|
| `11px` Outfit 500, `0.12em` spacing | All-caps section labels |
| `13px` Outfit 400 | Body small, meta, dates |
| `15px` Outfit 400 | Body default |
| `16px` Outfit 600 | Note titles, subheadings |
| `18px` Outfit 600 | Card titles, section heads |
| `24px` Outfit 700 | Page headings |
| `32px` Outfit 700 | Display numbers (stats) |

### Spacing

8px base grid: `8 / 16 / 24 / 32 / 40 / 48 / 64`

### Shape

| Context | Radius |
|---|---|
| Tags, badges | `8px` |
| Cards | `12px` |
| Large panels | `16px` |

### Shadows & Glows

- Card hover shadow: `0 8px 32px rgba(11,206,175,0.07)`
- Active ring: `1px solid rgba(11,206,175,0.35)`
- No decorative gradients sweeping across cards or backgrounds

---

## 2. Sidebar & Navigation

**Sidebar (260px)**
- Background: `#080E1A` — separated from content by `1px` right border `#1A2540`
- Branding: "EBENEZER ZOTOO" — Outfit 600, `11px`, `0.2em` letter-spacing, `#E8EDF5`
- Nav items: `14px` Outfit 500, `#6B7A99` inactive → `#E8EDF5` active
- Active state: `3px` teal left bar (rounded) + `#0F1A2E` background pill
- Icons: `16px`, teal on active, muted on inactive, muted → white on hover
- Hover: text + icon color transition only — no background flash

**Bottom info strip (sidebar)**
- Location line: `📍 Accra, Ghana` — `12px` Outfit 400, muted
- Availability: `● Open to collaborating` — teal dot, teal `#0BCEAF` text, `11px` Outfit 500
- No pill/badge — plain lines, no overflow

---

## 3. SystemDock

Two rows:

**Row 1 — Status bar**
- Left: `● Open to collaborating` — teal dot, teal text, `11px` Outfit
- Center: social icons (LinkedIn, Twitter, Facebook) — `16px`, muted → teal on hover
- Right: `Start a Project` (ghost button, `#1A2540` border) + `Book a Consult ↗` (teal filled, `#0BCEAF` bg, dark text)

**Row 2 — Icon dock**
- 6 nav icons centered, `18px`
- Active: teal icon + small teal dot underneath
- Inactive: muted → white on hover
- No background pills on dock icons

---

## 4. Reusable Components

### ProjectCard

- Surface: `#0F1626`, `1px` border `#1A2540`, `12px` radius
- Image block: `160px` tall, `object-cover`, bottom gradient fade into card body
- Body padding: `24px`
- Title: `15px` Outfit 600, `#E8EDF5`
- Description: `13px` Outfit 400, `#6B7A99`, 2-line clamp
- Tech tags: `10px` Outfit 500, `#0BCEAF` text, `rgba(11,206,175,0.08)` bg, `8px` radius
- Bottom row: date (muted, left) + live/github icon buttons (muted → teal on hover, right)
- Hover: border → `rgba(11,206,175,0.35)`, shadow `0 8px 32px rgba(11,206,175,0.07)`, lift `2px`
- No gradient sweep effects

### NoteCard

- Same surface and border tokens as ProjectCard
- Cover image: `120px` wide vertical strip on desktop, rounded left corners
- Tag badge: `10px` Outfit 600, uppercase, `0.1em` spacing
  - Tech topics → teal
  - Mindset topics → blue (`#3A86FF`)
  - Other → gold
- Date + read time: `12px` Outfit 400, muted
- Title: `16px` Outfit 600, `#E8EDF5`
- Excerpt: `13px` Outfit 400, `#6B7A99`
- Hover: same lift + teal border glow as ProjectCard

### Stat Block (Home)

- No card containers — raw number + label
- Number: `32px` Outfit 700, `#E8EDF5`
- Label: `11px` Outfit 500, `#6B7A99`
- 4 columns with `1px` vertical dividers `#1A2540` between

### Skill/Expertise Tags

- Background: `#0F1626`, `1px` border `#1A2540`, `13px` Outfit 500, `#6B7A99`
- Hover: border → `rgba(11,206,175,0.40)`, text → `#E8EDF5`

---

## 5. Page-by-Page

### Home (/)

- Top status bar: sticky, `12px` Outfit — NotificationBell, CloudStatus, clock
- Ghost watermark: keep, opacity `0.02`, Outfit 800
- Avatar + identity: name `18px` Outfit 600, role `13px` teal, location `12px` muted
- Stats: new divider-separated stat row (no card containers)
- Terminal bio block: keep `bio.txt` panel — teal header bar, `24px` padding, Outfit for prose, Fira Code for filename label only
- Core Expertise tags: updated to new tag style
- Trusted By: logo grid at `70%` opacity default (up from `50%`), full on hover
- Experience timeline: left border `#1A2540`, teal ring dot, role `14px` Outfit 600, company `12px` blue, description `13px` muted

### Projects (/projects)

- Header row: label left, count badge + active badge right — token updates
- Grid: 2-col desktop, new ProjectCard
- Project detail (`/projects/[slug]`): full-width hero image with gradient overlay, tech tags, gallery grid, live/github buttons (teal filled + ghost)

### Notes (/notes)

- Single column list, new NoteCard
- Section label: `// Notes` — `//` in teal, `Notes` in `14px` Outfit 600
- Note detail page: `680px` max reading width, `16px` Outfit 400 body, `1.75` line-height, Outfit 700 headings, full-width inline images with `12px` radius

### About (/about)

- Same components as Home — bio, expertise tags, experience timeline
- Longer-form intro paragraph, no unique components needed

### Contact (/contact)

- `contact.json` terminal block: teal for `const` keyword, blue for property names, gold for string values
- Form inputs: `#0F1626` bg, `1px` border `#1A2540`, `14px` Outfit, teal focus ring
- Submit button: teal filled, Outfit 500, no gradient
- Social links: muted → teal on hover

### Systems (/systems) & Lab (/lab)

- Token + font updates only — layouts are unique and functional, no structural changes

---

## 6. What Does NOT Change

- OS layout structure: sidebar + main + SystemDock
- Ghost watermark placement
- Terminal content blocks (bio.txt, contact.json) — kept as signature elements
- `//` comment-style section labels — kept but teal-accented
- MobileDock structure
- Clean mode — out of scope for this redesign
- Admin panel — out of scope

---

## 7. UI Skill

This redesign informs a reusable UI design skill with the following principles:

- **No decorative gradients** — glows and shadows only, never color sweeps
- **Outfit for all UI text** — mono only for genuine code/terminal content
- **8px grid** — all spacing in multiples of 8
- **Token-driven** — never hardcode colors; always use design tokens
- **Hover = lift + border glow** — consistent interaction pattern across all cards
- **Teal for active/primary, blue for secondary, gold for tertiary accents only**
- **Dark surfaces layer by lightness** — bg → surface → surface-2 (each step ~10% lighter)
- **Muted text is `#6B7A99`** — never pure `rgba(255,255,255,0.4)` which loses contrast on lighter screens
