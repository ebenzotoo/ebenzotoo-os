# Blueprint / Systems-Architect Redesign — Design Spec
**Date:** 2026-10-25
**Scope:** Total visual and structural redesign of the public-facing site — Cover (Home), About, Systems, Lab (+ Notes), Work (Projects), Contact, plus the shared navigation/chrome.
**Approach:** Retire the OS-desktop metaphor and the OS/Clean dual-theme entirely. Replace with a single, fully-committed concept: the site as a set of technical/architectural drawings — "sheets" — produced by a systems architect.
**Out of scope:** `/admin` dashboard (kept functional, unstyled, not part of the public sheet set). Supabase schema/backend logic (data layer reused as-is).

**Inspiration referenced during brainstorming:** madurey.com, ena-labs.netlify.app, oyendefavour.com, oyin.design (metadata only — could not render full layout). None copied directly; the common thread pulled from all of them is *one fully-committed personal concept carried through nav, copy, and interaction*, rather than generic sections.

---

## 1. Concept

Ebenezer is a Systems Architect. The site is framed as **a drawing set**: a numbered sequence of technical sheets documenting the systems he's designed and built. This is not a decorative skin — the concept governs navigation labels, page headers, section labels, project presentation, and motion, not just hero copy.

Vocabulary used consistently across the site:
- **Sheet** = a page (e.g. "SHEET 03/06 — SYSTEMS")
- **FIG.** = a section within a page (e.g. "FIG.02 — SELECTED WORK")
- **Drawing** = a project (e.g. "DRG-01")
- **Title block** = the small metadata row stamped on every sheet: `DRAWN: E.ZOTOO · REV: 04 · SCALE 1:1 · SHEET 03/06`

## 2. Design Tokens

### Colors

| Token | Value | Usage |
|---|---|---|
| `bp-bg` | `#13151A` | Page background — near-black charcoal |
| `bp-surface` | `#191B21` | Card/panel background |
| `bp-border` | `rgba(255,255,255,0.08)` | Default borders |
| `bp-grid-line` | `rgba(255,255,255,0.04–0.08)` | Background grid texture (varies by density needed) |
| `bp-primary` | `#F97316` | Amber/orange — primary accent, linework, title-block text, CTAs (carried over from current brand) |
| `bp-secondary` | `#6FA8D6` | Soft blue — leader-lines, callouts, secondary annotations (visually distinct from the orange "stamp" color) |
| `bp-text-main` | `#F5F7FA` | Primary text |
| `bp-text-muted` | `#6B7A99` | Secondary text, annotations, coordinate readouts |

Dark-only. No light mode, no theme toggle.

### Typography

| Role | Font | Notes |
|---|---|---|
| Labels, annotations, nav, title-block, coordinate readouts | **IBM Plex Mono** (400/500) | Carries the "technical drawing" voice |
| Headlines, display copy | **Space Grotesk** (500/700) | Carries the human/editorial voice |

Loaded via `next/font` (replacing the current Outfit/Fira Code setup in `app/layout.tsx` and the `--font-sans`/`--font-mono` theme tokens in `app/globals.css`).

### Grid & Texture

- Base background grid: repeating linear-gradient lines, ~14–16px cells, `rgba(255,255,255,0.04)` — present on every sheet as ambient texture.
- Corner crosshair marks (`⌐` style, 1px, orange or muted depending on context) on key framed elements (hero, cards, photo viewport).

### Spacing & Shape
Keep the existing 8px base grid (8/16/24/32/40/48/64) and current border-radius scale — no reason to change what already works structurally.

## 3. Site Structure — Sheet Index

Single nav replaces all current navigation (`Sidebar`, `MobileDock`, `SystemDock`, `CommandPalette`, `DesktopHint`). New `SheetNav` component renders the sheet index; a `SheetHeader` component stamps the title-block row at the top of every page.

| Sheet | Route | Content | Notes |
|---|---|---|---|
| 01 | `/` (Cover) | Abstract node/connection-diagram hero (no photo), intro copy, stats bar, marquee/tech strip, "Trusted By" clients, experience timeline | Hero reframed with FIG. label + dimension-line decoration instead of the current photo-side hero |
| 02 | `/about` | Full bio, photo (treated as an "elevation view" — cropped/bordered viewport with corner crosshairs and a caption like "ELEVATION — FRONT"), expanded narrative | Photo lives here, not on Cover |
| 03 | `/systems` | Architecture nodes with status badges | Closest to already fitting the concept — mostly restyle, minimal content rework |
| 04 | `/lab` | Two tabs on one sheet: **Experiments** (current Lab content, `EXP-01` etc.) and **Notes** (current `/notes` writing content, Supabase-backed) | `/notes` route content merges here; keep `/notes` as a redirect or sub-view if needed for existing links |
| 05 | `/projects` (Work) | Projects reframed as numbered drawings (`DRG-01`, `DRG-02`, …), each with a spec block: role, stack (labeled "materials"), year, status (`SHIPPED` / `ACTIVE` / `ARCHIVED`), link | Reuses existing Supabase `projects` table and `ProjectCard` structure — restyled, not rebuilt |
| 06 | `/contact` | Contact form (Web3Forms, unchanged functionality) | |

Not in the sheet index: `/admin` — private, Supabase-auth gated, no nav entry, no schematic restyle (lowest priority, functional only).

## 4. Motion & Interaction System

Built on `framer-motion` (already a dependency — no new library needed).

- **Coordinate readout** — a small fixed-position `X:### Y:###` display that tracks the cursor, visible on desktop viewports (disabled/hidden on touch devices where there's no cursor).
- **Dimension-line draw-in** — horizontal/vertical ruled lines with arrow endpoints animate from 0 → full width/height on scroll-into-view, mimicking a pen plotting a line.
- **Leader-line callouts** — on hover (desktop) or tap (mobile) over key elements (e.g. the hero headline, a drawing's spec block), a small annotation card fades in, connected by a thin leader line.
- **Sheet transitions** — route changes between sheets use a subtle transition (brief slide/fade) suggesting flipping to the next drawing in the set, built on the existing `PageTransition` component.
- Respect `prefers-reduced-motion`: all of the above degrade to simple fades/no-op when reduced motion is requested.

## 5. Component Changes

**Removed entirely:**
`ThemeProvider`, `ThemeToggle`, `CleanNav`, `Sidebar`, `MobileDock`, `SystemDock`, `CommandPalette`, `DesktopHint`, and the `.os-only` / `.clean-only` class split in every page file and in `app/globals.css`.

**New shared components:**
- `SheetNav` — sheet-index navigation bar (desktop) + mobile equivalent
- `SheetHeader` — per-page FIG. label + title-block row (`DRAWN · REV · SCALE · SHEET`)
- `CoordinateReadout` — cursor-position tracker
- `DimensionLine` — animated ruled-line primitive (scroll-triggered)
- `Callout` — leader-line annotation primitive (hover/tap-triggered)
- Grid-background utility (CSS class or wrapper component) applied per-sheet

**Kept, restyled only (not rebuilt):**
`ProjectCard`, `PageTransition`, `LiveClock`, `NotificationBell`, `CloudStatus`, `HeroPrompt` (content/copy may change, mechanism stays), Supabase data layer (`projects`, `notes`, `messages` tables), Web3Forms contact integration, `/admin` dashboard (visual-only, if touched at all).

## 6. What Stays the Same

This is a visual/structural redesign, not a backend rewrite:
- Next.js 16 / React 19 / Tailwind v4 / Supabase stack, unchanged.
- Existing Supabase tables and queries (`projects`, `notes`, `messages`) reused as-is — only presentation changes.
- Cloudflare deployment (`opennextjs-cloudflare`) pipeline, unchanged.
- `/admin` dashboard functionality, unchanged.
