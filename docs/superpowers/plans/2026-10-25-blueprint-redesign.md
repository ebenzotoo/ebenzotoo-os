# Blueprint Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the OS-desktop / Clean dual-theme portfolio with a single committed "technical drawing set" design — dark CAD palette, IBM Plex Mono + Space Grotesk, a sheet-index navigation, and rich scroll/hover motion — per `docs/superpowers/specs/2026-10-25-blueprint-redesign-design.md`.

**Architecture:** Six public pages become six "sheets" (Cover, About, Systems, Lab, Work, Contact) served by one shared chrome (`SheetShell` + `SheetNav` + `SheetMobileNav` + `SheetHeader`) and three motion primitives (`CoordinateReadout`, `DimensionLine`, `Callout`). The OS-chrome layer (`Sidebar`, `MobileDock`, `SystemDock`, `CommandPalette`, `DesktopHint`, `ThemeProvider`, `ThemeToggle`, `CleanNav`) and the dead `ProjectCard`/`HeroPrompt` files are deleted. `/admin` is untouched — it already uses its own hardcoded colors, not the `os-*`/`bp-*` tokens, so nothing here can break it.

**Tech Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 (`@theme` tokens) · framer-motion (already installed) · Supabase (existing tables, unchanged) · next/font (Google Fonts)

**No test framework exists in this repo** (no jest/vitest/playwright in `package.json`). Each task's verification step is `npm run build` (Next.js type-checks the whole project on build, so it catches broken imports/types even for not-yet-wired files) plus, for visual tasks, a manual check in the running dev server — consistent with the project's own standing instruction to verify UI changes in a browser before calling them done.

**Decisions made while mapping file structure (not re-litigated with the user — these are implementation details that don't change the approved visual spec):**
- Reusing the existing `os-*`-shaped CSS variable *mechanism* but renaming the variables themselves to `bp-*` (Blueprint) for honesty — confirmed via grep that `/admin` references zero `os-*` classes, so this rename cannot break it.
- `.glass-card` (blurred glassmorphism) is replaced by a new `.sheet-card` (flat panel, no backdrop-blur) — blueprints are flat/matte, not glassy; this was implied by the "Dark Drafting/CAD" direction but not spelled out as a token rename in the spec.
- The whole `html[data-theme="clean"] ...` block in `globals.css` (~160 lines) is dead once Clean mode is removed — deleted in Task 1.
- `components/ProjectCard.tsx` and `components/HeroPrompt.tsx` are **already dead code** (zero imports anywhere in `app/`) — confirmed via grep during planning, deleted in cleanup regardless of the redesign.
- The old fixed-viewport `h-screen overflow-hidden` app-shell (each page's `<main>` scrolling independently) is replaced by normal document-level scroll — it existed to support the OS-desktop "windowed app" feel, which is gone. Every rewritten page drops `overflow-y-auto` from its `<main>`.
- Content dedupe: the current site repeats the bio paragraph, core-expertise tags, and experience timeline on both Home and About. In the new sitemap, **Cover** keeps intro + stats + marquee + trusted-by + experience timeline; **About** owns the full narrative + core-expertise tags + the photo. Nothing is deleted, just not shown twice.
- Experience/clients/skills data arrays are duplicated today between the OS and Clean variants of the same page. Since Clean mode is removed, each page keeps exactly one copy.

---

### Task 1: Design tokens & global styles

**Files:**
- Modify: `app/globals.css` (full rewrite)

- [ ] **Step 1: Rewrite `app/globals.css`**

Replace the entire file with:

```css
@import "tailwindcss";

@theme {
  --font-mono:    var(--font-plex-mono), 'IBM Plex Mono', monospace;
  --font-heading: var(--font-grotesk), 'Space Grotesk', sans-serif;

  --color-bp-bg:             #13151A;
  --color-bp-surface:        #191B21;
  --color-bp-surface-2:      #20222A;
  --color-bp-border:         rgba(255,255,255,0.08);
  --color-bp-border-hover:   rgba(249,115,22,0.4);
  --color-bp-text-main:      #F5F7FA;
  --color-bp-text-muted:     #6B7A99;
  --color-bp-primary:        #F97316;
  --color-bp-primary-light:  #FB923C;
  --color-bp-secondary:      #6FA8D6;
  --color-bp-gold:           #D4AF37;
}

body {
  background-color: var(--color-bp-bg);
  color: var(--color-bp-text-main);
  font-family: var(--font-mono);
  -webkit-font-smoothing: antialiased;
}

* {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background-color: rgba(249,115,22,0.15);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(249,115,22,0.30);
}

/* Flat panel standard (replaces old glassmorphism .glass-card) */
.sheet-card {
  background: var(--color-bp-surface);
  border: 1px solid var(--color-bp-border);
  border-radius: 14px;
  transition: border-color 0.2s, transform 0.2s;
}
.sheet-card:hover {
  border-color: var(--color-bp-primary-light);
  transform: translateY(-2px);
}

/* Ambient schematic grid texture */
.bp-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
  background-size: 16px 16px;
}

/* Corner registration marks */
.corner-tl, .corner-tr, .corner-bl, .corner-br {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: var(--color-bp-primary);
  opacity: 0.6;
}
.corner-tl { top: 10px;    left: 10px;   border-left: 1.5px solid;  border-top: 1.5px solid; }
.corner-tr { top: 10px;    right: 10px;  border-right: 1.5px solid; border-top: 1.5px solid; }
.corner-bl { bottom: 10px; left: 10px;   border-left: 1.5px solid;  border-bottom: 1.5px solid; }
.corner-br { bottom: 10px; right: 10px;  border-right: 1.5px solid; border-bottom: 1.5px solid; }

/* Section/FIG labels */
.fig-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-bp-primary);
  margin-bottom: 10px;
}

/* CSS marquee animation */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  animation: marquee 30s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: Build fails at this point with module-not-found errors for `os-*` / `vscode-*` classes used in still-unmodified page files (e.g. `app/page.tsx`) — **this is expected**. Tailwind v4 generates utility classes from `@theme` tokens, so removing `--color-os-*` means every `bg-os-*`/`text-os-*` class in the untouched pages now resolves to nothing (not a hard type error, but Next's build may still surface it as a warning, not a failure, since Tailwind just silently drops unknown utilities). Confirm the build **completes** (even if pages render unstyled) — a hard compile error at this step means a typo in the CSS. Visual correctness is restored page-by-page in later tasks.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: replace OS/clean theme tokens with blueprint design tokens"
```

---

### Task 2: Shared sheet data & motion primitives

**Files:**
- Create: `lib/sheets.ts`
- Create: `components/CoordinateReadout.tsx`
- Create: `components/DimensionLine.tsx`
- Create: `components/Callout.tsx`

- [ ] **Step 1: Create `lib/sheets.ts`**

```ts
export interface Sheet {
  n: string;
  name: string;
  path: string;
}

export const sheets: Sheet[] = [
  { n: "01", name: "COVER",   path: "/"         },
  { n: "02", name: "ABOUT",   path: "/about"    },
  { n: "03", name: "SYSTEMS", path: "/systems"  },
  { n: "04", name: "LAB",     path: "/lab"      },
  { n: "05", name: "WORK",    path: "/projects" },
  { n: "06", name: "CONTACT", path: "/contact"  },
];

export function isSheetActive(pathname: string, sheetPath: string): boolean {
  if (sheetPath === "/") return pathname === "/";
  if (sheetPath === "/lab") return pathname.startsWith("/lab") || pathname.startsWith("/notes");
  return pathname.startsWith(sheetPath);
}
```

- [ ] **Step 2: Create `components/CoordinateReadout.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";

export default function CoordinateReadout() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    function handleMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-4 right-4 z-[9998] hidden md:block pointer-events-none px-2 py-1 rounded bg-bp-bg/80 border border-bp-border font-mono text-[10px] text-bp-text-muted"
    >
      X:{pos.x} Y:{pos.y} ⌖
    </div>
  );
}
```

- [ ] **Step 3: Create `components/DimensionLine.tsx`**

Per the spec, motion must degrade to a no-op under `prefers-reduced-motion` — `useReducedMotion()` is framer-motion's built-in hook for this:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function DimensionLine({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-hidden="true">
      <span className="text-bp-primary text-[10px] font-mono">◂</span>
      <motion.div
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
        className="flex-1 h-px bg-bp-primary/50"
      />
      <span className="text-bp-primary text-[10px] font-mono">▸</span>
    </div>
  );
}
```

- [ ] **Step 4: Create `components/Callout.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface CalloutProps {
  label: string;
  detail: string;
  children: React.ReactNode;
}

export default function Callout({ label, detail, children }: CalloutProps) {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow((s) => !s)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
            className="absolute left-full top-0 ml-3 whitespace-nowrap text-[9px] font-mono text-bp-secondary leading-tight hidden md:block"
          >
            <span className="absolute -left-3 top-1.5 w-3 h-px bg-bp-secondary/60" />
            {label}
            <br />
            {detail}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: Build still completes (these three files are valid, self-contained, and not yet imported anywhere — unused-but-exported files don't fail a Next.js build).

- [ ] **Step 6: Commit**

```bash
git add lib/sheets.ts components/CoordinateReadout.tsx components/DimensionLine.tsx components/Callout.tsx
git commit -m "feat: add sheet index data and motion primitives"
```

---

### Task 3: SheetHeader component

**Files:**
- Create: `components/SheetHeader.tsx`

- [ ] **Step 1: Create `components/SheetHeader.tsx`**

```tsx
interface SheetHeaderProps {
  fig: string;    // e.g. "FIG.03 — SYSTEMS"
  sheet: string;  // e.g. "03/06"
}

export default function SheetHeader({ fig, sheet }: SheetHeaderProps) {
  return (
    // top-0 on mobile (SheetNav is hidden there), top-16 on desktop so it docks
    // below SheetNav's 64px bar instead of overlapping it once both are stuck.
    <div className="sticky top-0 md:top-16 z-20 bg-bp-bg/90 backdrop-blur-md border-b border-bp-border px-6 md:px-10 py-3 flex flex-wrap items-center justify-between gap-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-bp-primary">{fig}</span>
      <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.1em] text-bp-text-muted">
        <span>DRAWN: E.ZOTOO</span>
        <span>REV: 04</span>
        <span>SCALE 1:1</span>
        <span className="text-bp-primary">SHEET {sheet}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: Build completes.

- [ ] **Step 3: Commit**

```bash
git add components/SheetHeader.tsx
git commit -m "feat: add SheetHeader title-block component"
```

---

### Task 4: Navigation chrome & root layout

**Files:**
- Create: `components/SheetNav.tsx`
- Create: `components/SheetMobileNav.tsx`
- Create: `components/SheetShell.tsx`
- Modify: `app/layout.tsx`
- Delete: `components/OSShell.tsx`, `components/CommandPalette.tsx`, `components/DesktopHint.tsx`, `components/ThemeToggle.tsx`, `components/CleanNav.tsx`

**Not deleted yet:** `components/Sidebar.tsx`, `components/MobileDock.tsx`, `components/SystemDock.tsx`, `components/ThemeProvider.tsx`. Correction confirmed during Task 4's review: the dead `Sidebar`/`MobileDock`/`SystemDock` imports actually live in `app/notes/[slug]/page.tsx` (not `ContactClient.tsx`) — Task 8 rewrites that file without those imports, so they fall out of use there. `ThemeProvider.tsx`'s real last consumer is `app/contact/ContactClient.tsx`'s live `useTheme()` call. Either way, all four files are deleted in Task 10, after both Task 8 (removes the Sidebar/MobileDock/SystemDock dependency) and Task 10's own ContactClient rewrite (removes the ThemeProvider dependency) have run. Deleting them before both of those land would break the build.

- [ ] **Step 1: Create `components/SheetNav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sheets, isSheetActive } from "@/lib/sheets";

export default function SheetNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center justify-between px-8 h-16 border-b border-bp-border bg-bp-bg/95 backdrop-blur-md sticky top-0 z-30">
      <Link href="/" className="font-heading font-bold text-bp-text-main text-sm tracking-tight shrink-0">
        EBENEZER ZOTOO
      </Link>
      <div className="flex items-center gap-6 font-mono text-[11px] tracking-[0.05em]">
        {sheets.map((s) => {
          const active = isSheetActive(pathname, s.path);
          return (
            <Link
              key={s.path}
              href={s.path}
              className={`flex items-center gap-1.5 transition-colors duration-150 ${
                active ? "text-bp-primary" : "text-bp-text-muted hover:text-bp-text-main"
              }`}
            >
              <span className="opacity-60">{s.n}</span>
              {s.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create `components/SheetMobileNav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Share2, FlaskConical, FolderClosed, Mail } from "lucide-react";
import { sheets, isSheetActive } from "@/lib/sheets";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/":         Home,
  "/about":    User,
  "/systems":  Share2,
  "/lab":      FlaskConical,
  "/projects": FolderClosed,
  "/contact":  Mail,
};

export default function SheetMobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-bp-bg/95 backdrop-blur-lg border-t border-bp-border z-50 flex justify-between items-center px-2">
      {sheets.map((s) => {
        const Icon = icons[s.path];
        const active = isSheetActive(pathname, s.path);
        return (
          <Link
            key={s.path}
            href={s.path}
            className="relative flex flex-col items-center justify-center gap-0.5 w-12 h-12"
          >
            {active && <span className="absolute top-0.5 w-1 h-1 bg-bp-primary rounded-full" />}
            <Icon className={`w-5 h-5 ${active ? "text-bp-primary" : "text-bp-text-muted"}`} />
            <span className={`text-[9px] font-mono tracking-wide ${active ? "text-bp-primary" : "text-bp-text-muted"}`}>
              {s.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/SheetShell.tsx`**

```tsx
"use client";

import { usePathname } from "next/navigation";
import SheetNav from "./SheetNav";
import SheetMobileNav from "./SheetMobileNav";
import CoordinateReadout from "./CoordinateReadout";

export default function SheetShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-bp-bg bp-grid">
      <SheetNav />
      <div className="flex-1 flex flex-col w-full max-w-[1200px] mx-auto">
        {children}
      </div>
      <SheetMobileNav />
      <CoordinateReadout />
    </div>
  );
}
```

- [ ] **Step 4: Rewrite `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SheetShell from "../components/SheetShell";

const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex-mono", weight: ["400", "500"] });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Ebenezer Zotoo | Systems Architect",
  description: "Building digital systems that work — a drawing set by Ebenezer Zotoo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${plexMono.variable} ${grotesk.variable} bg-bp-bg text-bp-text-main font-mono antialiased`}>
        <SheetShell>{children}</SheetShell>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Delete retired chrome files**

```bash
git rm components/OSShell.tsx components/CommandPalette.tsx components/DesktopHint.tsx components/ThemeToggle.tsx components/CleanNav.tsx
```

- [ ] **Step 6: Verify the build**

Run: `npm run build`
Expected: Build completes. (Pages still render with broken `os-*`/`clean-only` classes visually — that's fixed page-by-page in Tasks 5–9. This step only confirms nothing is structurally broken — no missing-module errors.)

- [ ] **Step 7: Manual check**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: Top nav bar shows "EBENEZER ZOTOO" + the six sheet links (01 COVER … 06 CONTACT) in mono font, dark charcoal background with faint grid texture visible. Page content below will look broken/unstyled until later tasks — that's expected at this point.

- [ ] **Step 8: Commit**

```bash
git add components/SheetNav.tsx components/SheetMobileNav.tsx components/SheetShell.tsx app/layout.tsx
git commit -m "feat: replace OS-desktop chrome with sheet-index navigation shell"
```

---

### Task 5: Cover (Home) sheet

**Files:**
- Modify: `app/page.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `app/page.tsx`**

```tsx
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";
import DimensionLine from "@/components/DimensionLine";
import Callout from "@/components/Callout";

const clients = [
  { name: "Ghana Law Society",          logo: "/clients/gls.png"     },
  { name: "National Service Authority", logo: "/clients/nsa.png"     },
  { name: "Aurateq",                    logo: "/clients/aurateq.png" },
  { name: "Ani Medical Consult",        logo: "/clients/ani.png"     },
  { name: "God Alone Int Ministry",     logo: "/clients/gaim.png"    },
  { name: "NASPA Ghana",                logo: "/clients/naspa.png"   },
];

const jobs = [
  { role: "Senior Web & Graphics Designer",   company: "Industrial Coatings Africa",    year: "2025 – Present", desc: "Designed and implemented digital solutions to enhance brand visibility and user engagement."                     },
  { role: "Technical Lead",                   company: "National Service Authority",    year: "2021 – 2025",    desc: "Led the design and development of digital platforms that improved service delivery and operational efficiency." },
  { role: "Head, Brands & Design",            company: "Swedec Ghana",                  year: "2015 – 2021",    desc: "Led branding, digital strategy, and design execution across multiple initiatives."                               },
  { role: "Director, Information Technology", company: "B.A United FC",                 year: "2015 – 2018",    desc: "Managed IT systems and digital infrastructure supporting organizational operations."                             },
];

const techMarquee = [
  "Next.js", "TypeScript", "Supabase", "Tailwind CSS", "React", "Node.js",
  "Flutter", "PostgreSQL", "UI/UX Design", "Systems Architecture", "Web Development", "Mobile Apps",
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.01 — SYSTEMS ARCHITECT" sheet="01/06" />

        <div className="p-6 md:p-10 flex flex-col gap-12">

          {/* Hero */}
          <section className="relative pt-4 pb-10 md:pt-8 md:pb-14">
            <DimensionLine className="mb-8" />

            <Callout label="SPACE GROTESK" detail="700 / 44PX">
              <h1 className="text-[36px] md:text-[52px] font-heading font-bold text-bp-text-main leading-[1.08] max-w-xl">
                Building digital systems that work.
              </h1>
            </Callout>

            <p className="text-bp-text-muted text-[15px] max-w-md mt-6 leading-relaxed">
              Full-Stack Developer, Systems Architect, and UI/UX Designer — 8+ years turning complex ideas into platforms that ship.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <Link href="/contact" className="px-5 py-2.5 bg-bp-primary hover:bg-bp-primary/90 text-black text-[13px] font-bold font-mono rounded-lg transition-colors">
                START A PROJECT
              </Link>
              <Link href="/projects" className="px-5 py-2.5 bg-bp-primary/10 border border-bp-primary/30 hover:border-bp-primary/60 text-bp-primary text-[13px] font-semibold font-mono rounded-lg transition-colors flex items-center gap-1.5">
                VIEW WORK <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Abstract node/connection diagram — stands in for a photo */}
            <svg className="absolute right-0 top-2 hidden md:block opacity-90" width="180" height="140" aria-hidden="true">
              <circle cx="30" cy="25" r="5" fill="#F97316" />
              <circle cx="140" cy="18" r="5" fill="#6FA8D6" />
              <circle cx="90" cy="95" r="5" fill="#F97316" />
              <circle cx="160" cy="105" r="5" fill="#6FA8D6" />
              <line x1="30" y1="25" x2="90" y2="95" stroke="rgba(249,115,22,0.35)" strokeWidth="1" />
              <line x1="140" y1="18" x2="90" y2="95" stroke="rgba(111,168,214,0.35)" strokeWidth="1" />
              <line x1="90" y1="95" x2="160" y2="105" stroke="rgba(249,115,22,0.35)" strokeWidth="1" />
            </svg>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 border border-bp-border rounded-xl overflow-hidden">
            {[
              { value: "8+",     label: "Years Exp."  },
              { value: "30+",    label: "Projects"    },
              { value: "15+",    label: "Clients"     },
              { value: "1,000+", label: "Users Built" },
            ].map((stat, i, arr) => (
              <div key={stat.label} className={`flex flex-col items-center py-5 ${i < arr.length - 1 ? "border-r border-bp-border" : ""}`}>
                <p className="text-[20px] font-heading font-bold text-bp-primary leading-none">{stat.value}</p>
                <p className="text-[10px] font-mono text-bp-text-muted tracking-wider mt-1 uppercase">{stat.label}</p>
              </div>
            ))}
          </section>

          {/* Tech marquee */}
          <section className="overflow-hidden border-y border-bp-border py-3">
            <div className="marquee-track gap-0">
              {[...techMarquee, ...techMarquee].map((item, i) => (
                <span key={i} className="flex items-center gap-4 shrink-0 px-4 text-[11px] text-bp-text-muted font-mono tracking-[0.08em] uppercase">
                  <span className="text-bp-primary/50">·</span>
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* Trusted By */}
          <section>
            <h2 className="fig-label">FIG.01A — TRUSTED BY</h2>
            <div className="grid grid-cols-3 gap-3">
              {clients.map((client) => (
                <div key={client.name} className="sheet-card p-4 flex flex-col items-center justify-center gap-2">
                  <img
                    src={client.logo}
                    alt={client.name}
                    title={client.name}
                    className="max-h-8 max-w-full object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="text-[10px] text-bp-text-muted text-center leading-tight opacity-70">{client.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="fig-label">FIG.01B — EXPERIENCE</h2>
            <div className="flex flex-col gap-6 border-l-2 border-bp-border pl-6">
              {jobs.map((job) => (
                <div key={job.role} className="relative">
                  <span className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full border-2 border-bp-primary bg-bp-bg" />
                  <p className="text-[14px] font-semibold text-bp-text-main">{job.role}</p>
                  <p className="text-[12px] text-bp-secondary font-mono mt-0.5">{job.company}</p>
                  <p className="text-[11px] text-bp-text-muted mt-0.5 font-mono">{job.year}</p>
                  <p className="text-[13px] text-bp-text-muted mt-2 leading-relaxed">{job.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </PageTransition>
    </main>
  );
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: Build completes with no type errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open `http://localhost:3000/`.
Expected: Title-block header at top ("FIG.01 — SYSTEMS ARCHITECT" / "SHEET 01/06"). Hero headline with a dimension line above it; hovering the headline (desktop) shows a "SPACE GROTESK / 700 / 44PX" callout to its right. Abstract orange/blue node diagram to the right of the hero text (desktop only, no photo). Scrolling reveals stats, a scrolling tech marquee, trusted-by logos, and the experience timeline. No OS/Clean references anywhere.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: rebuild Cover sheet with blueprint hero and schematic sections"
```

---

### Task 6: About sheet

**Files:**
- Modify: `app/about/page.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `app/about/page.tsx`**

```tsx
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";

const jobs = [
  { role: "Senior Web & Graphics Designer",   company: "Industrial Coatings Africa",    year: "2025 – Present" },
  { role: "Technical Lead",                   company: "National Service Authority",    year: "2021 – 2025"    },
  { role: "Head, Brands & Design",            company: "Swedec Ghana",                  year: "2015 – 2021"    },
  { role: "Director, Information Technology", company: "B.A United FC",                 year: "2015 – 2018"    },
];

const expertise = [
  "UI/UX & Product Design",
  "Web & Platform Development",
  "Digital Systems Architecture",
  "User Experience Optimization",
  "Product Strategy & Execution",
];

export default function About() {
  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.02 — ABOUT" sheet="02/06" />

        <div className="p-6 md:p-10 max-w-3xl flex flex-col gap-10">

          {/* Elevation-view photo */}
          <div className="relative w-[140px] h-[180px] border border-bp-border">
            <span className="corner-tl" />
            <span className="corner-br" />
            <img src="/avatar.png" alt="Ebenezer Zotoo" className="w-full h-full object-cover object-top" />
            <span className="absolute bottom-2 left-0 right-0 text-center text-[8px] font-mono text-bp-primary tracking-[0.1em]">
              ELEVATION — FRONT
            </span>
          </div>

          {/* Narrative */}
          <div className="flex flex-col gap-4">
            <h2 className="fig-label">FIG.02A — NARRATIVE</h2>
            <p className="text-bp-text-muted leading-relaxed text-[15px]">
              I am a Digital Product Designer and Systems Builder focused on creating solutions that work — not just look good.
            </p>
            <p className="text-bp-text-muted leading-relaxed text-[15px]">
              Over the past 8+ years, I&apos;ve worked on projects across government, healthcare, education, and technology, helping organizations build digital platforms that improve operations, increase accessibility, and deliver measurable impact.
            </p>
            <p className="text-bp-text-muted leading-relaxed text-[15px]">
              My approach combines design, development, and strategic thinking. I don&apos;t just create interfaces — I design systems that solve real problems. I believe every product should serve a clear purpose, be easy to use, and scale effectively as it grows.
            </p>
            <p className="text-bp-text-muted leading-relaxed text-[15px]">
              If you&apos;re building something meaningful and need a partner who understands both the technical and user experience side — I&apos;m open to working with you.
            </p>
          </div>

          {/* Core expertise */}
          <div>
            <h2 className="fig-label">FIG.02B — CORE EXPERTISE</h2>
            <div className="flex flex-wrap gap-3">
              {expertise.map((skill) => (
                <span key={skill} className="px-4 py-2 sheet-card text-sm text-bp-text-muted hover:text-bp-text-main font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Compact role history (dates only — full timeline lives on Cover) */}
          <div>
            <h2 className="fig-label">FIG.02C — ROLE HISTORY</h2>
            <div className="flex flex-col gap-3">
              {jobs.map((job) => (
                <div key={job.role} className="flex items-baseline justify-between gap-4 border-b border-bp-border pb-3">
                  <div>
                    <p className="text-[13px] font-semibold text-bp-text-main">{job.role}</p>
                    <p className="text-[12px] text-bp-secondary font-mono">{job.company}</p>
                  </div>
                  <span className="text-[11px] font-mono text-bp-text-muted shrink-0">{job.year}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </PageTransition>
    </main>
  );
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: Build completes.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open `http://localhost:3000/about`.
Expected: Small bordered photo with corner marks and an "ELEVATION — FRONT" caption, followed by the full bio narrative, core-expertise tags, and a compact role history list (no duplicate stats/marquee — that's Cover's job).

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: rebuild About sheet with elevation-view photo treatment"
```

---

### Task 7: Systems sheet

**Files:**
- Modify: `app/systems/page.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `app/systems/page.tsx`**

```tsx
import { Server, Database, Smartphone, Layout, Workflow, GitBranch, TrendingUp, SearchCode, MousePointer2, Globe, AppWindow } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";

const nodes = [
  {
    title: "Cross-Platform Ecosystems",
    icon: <Smartphone className="w-5 h-5 text-bp-secondary" />,
    description: "Building responsive mobile and web applications utilizing Flutter for dynamic frontends paired seamlessly with Supabase for robust backend management.",
    status: "ACTIVE",
  },
  {
    title: "Data & Logic Infrastructure",
    icon: <Database className="w-5 h-5 text-bp-primary" />,
    description: "Python-driven data processing and backend architecture. Leveraging IBM-certified Data Science methodologies to structure scalable PostgreSQL databases and API endpoints.",
    status: "OPTIMIZED",
  },
  {
    title: "Web Architecture",
    icon: <Layout className="w-5 h-5 text-bp-text-muted" />,
    description: "End-to-end web development utilizing modern frameworks and advanced WordPress implementations to deliver high-performance, user-centric corporate platforms.",
    status: "ONLINE",
  },
  {
    title: "Project Management Ops",
    icon: <Workflow className="w-5 h-5 text-bp-gold" />,
    description: "Orchestrating complex digital deployments using the Critical Path Method (CPM) and precedence network diagrams to calculate floats, optimize timelines, and ensure efficient project duration.",
    status: "ACTIVE",
  },
];

const services = [
  { icon: TrendingUp,    title: "Business Strategy",       desc: "Optimising processes to maximise profitability, eliminate costs, and align technology with business goals." },
  { icon: Globe,         title: "Web Design & Full Stack", desc: "End-to-end web experiences — responsive, performant, and pixel-perfect from Figma to production." },
  { icon: AppWindow,     title: "App Development",         desc: "Complete development cycle from architecture to launch, with a focus on clean code and scalable systems." },
  { icon: Smartphone,    title: "Mobile App Development",  desc: "Cross-platform iOS and Android apps using Flutter, built to pixel-perfect specs with smooth UX." },
  { icon: SearchCode,    title: "SEO Optimisation",        desc: "Technical and content-level SEO strategies that improve ranking, discoverability, and organic traffic." },
  { icon: MousePointer2, title: "UX Consulting",           desc: "User research, prototyping, and design systems that put the end-user at the centre of every decision." },
];

const process = [
  { step: "01", title: "Discovery",   desc: "Understanding the problem space, goals, constraints, and user needs before a single line of code is written." },
  { step: "02", title: "Design",      desc: "Architecting the system and UX — wireframes, data models, API contracts, and component hierarchy." },
  { step: "03", title: "Development", desc: "Building iteratively with clean, documented code. Regular check-ins, no surprises." },
  { step: "04", title: "Delivery",    desc: "Deployment, handoff, and post-launch monitoring. The project doesn't end at launch." },
];

export default function Systems() {
  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.03 — SYSTEM ARCHITECTURE" sheet="03/06" />

        <div className="p-6 md:p-10 flex flex-col gap-14">
          <h1 className="sr-only">Systems Architecture — Ebenezer Zotoo</h1>

          {/* Nodes */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="fig-label mb-0">FIG.03A — ARCHITECTURE NODES</h2>
              <div className="flex items-center gap-2 text-xs font-mono text-bp-primary">
                <span className="w-2 h-2 rounded-full bg-bp-primary animate-pulse" />
                ALL SYSTEMS NOMINAL
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nodes.map((node) => (
                <div key={node.title} className="sheet-card p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 bg-white/[0.04] border border-bp-border rounded-lg">{node.icon}</div>
                    <span className="text-[10px] font-mono tracking-widest text-bp-text-muted px-2 py-1 rounded bg-black/20 border border-bp-border">
                      STATUS: <span className={node.status === "ACTIVE" ? "text-bp-secondary" : "text-bp-primary"}>{node.status}</span>
                    </span>
                  </div>
                  <h3 className="text-bp-text-main font-medium text-lg mb-3">{node.title}</h3>
                  <p className="text-sm text-bp-text-muted leading-relaxed flex-1">{node.description}</p>
                  <div className="mt-6 pt-4 border-t border-bp-border flex items-center gap-2 text-xs font-mono text-bp-text-muted w-fit">
                    <Server className="w-3.5 h-3.5" />
                    INSPECT_NODE
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="fig-label">FIG.03B — SERVICES OFFERED</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <div key={service.title} className="sheet-card p-5">
                  <div className="p-2 bg-white/[0.04] border border-bp-border rounded-lg w-fit mb-4">
                    <service.icon className="w-4 h-4 text-bp-gold" />
                  </div>
                  <h3 className="text-bp-text-main font-heading font-semibold text-sm mb-2">{service.title}</h3>
                  <p className="text-xs text-bp-text-muted leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section>
            <h2 className="fig-label flex items-center gap-2"><GitBranch className="w-3.5 h-3.5" /> FIG.03C — PROCESS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {process.map((phase) => (
                <div key={phase.step} className="sheet-card p-5 relative overflow-hidden">
                  <div className="absolute top-3 right-4 text-[40px] font-heading font-extrabold text-white/[0.04] leading-none select-none">
                    {phase.step}
                  </div>
                  <p className="text-[10px] font-mono text-bp-secondary tracking-widest mb-3">{phase.step}</p>
                  <h3 className="text-bp-text-main font-heading font-semibold text-base mb-2">{phase.title}</h3>
                  <p className="text-xs text-bp-text-muted leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </PageTransition>
    </main>
  );
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: Build completes.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open `http://localhost:3000/systems`.
Expected: Four architecture-node cards with status badges, six service cards, four process cards — all flat `sheet-card` panels (no glass blur), title-block header says "SHEET 03/06".

- [ ] **Step 4: Commit**

```bash
git add app/systems/page.tsx
git commit -m "restyle: Systems sheet onto blueprint design tokens"
```

---

### Task 8: Lab sheet (merges Notes)

**Files:**
- Create: `components/LabTabs.tsx`
- Modify: `app/lab/page.tsx` (full rewrite)
- Modify: `app/notes/page.tsx` (replace with redirect)
- Modify: `app/notes/[slug]/page.tsx` (restyle)

- [ ] **Step 1: Create `components/LabTabs.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FlaskConical, FileText, Play } from "lucide-react";

export interface Experiment {
  id: string;
  title: string;
  type: string;
  icon: React.ReactNode;
  snippet: string;
  render: string;
}

export interface LabNote {
  slug: string;
  title: string;
  excerpt: string | null;
  tag: string | null;
  created_at: string;
  read_time: string | null;
}

interface LabTabsProps {
  experiments: Experiment[];
  notes: LabNote[];
}

export default function LabTabs({ experiments, notes }: LabTabsProps) {
  const [tab, setTab] = useState<"experiments" | "notes">("experiments");

  return (
    <div>
      <div className="flex items-center gap-1 mb-8 border-b border-bp-border">
        <button
          onClick={() => setTab("experiments")}
          className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.1em] border-b-2 transition-colors flex items-center gap-1.5 ${
            tab === "experiments" ? "border-bp-primary text-bp-primary" : "border-transparent text-bp-text-muted hover:text-bp-text-main"
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" /> Experiments
        </button>
        <button
          onClick={() => setTab("notes")}
          className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.1em] border-b-2 transition-colors flex items-center gap-1.5 ${
            tab === "notes" ? "border-bp-primary text-bp-primary" : "border-transparent text-bp-text-muted hover:text-bp-text-main"
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Notes
        </button>
      </div>

      {tab === "experiments" ? (
        <div className="flex flex-col gap-10">
          {experiments.map((exp) => (
            <div key={exp.id} className="sheet-card overflow-hidden flex flex-col">
              <div className="bg-white/[0.03] px-5 py-3 border-b border-bp-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {exp.icon}
                  <span className="text-bp-text-main font-medium text-sm tracking-wide">{exp.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono tracking-widest text-bp-text-muted px-2 py-1 rounded bg-white/[0.04] border border-bp-border hidden sm:block">
                    {exp.type}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-bp-primary bg-bp-primary/10 px-3 py-1.5 rounded border border-bp-primary/20">
                    <Play className="w-3 h-3" fill="currentColor" /> RUN
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-bp-border">
                <div className="p-5 font-mono text-xs overflow-x-auto bg-black/20">
                  <pre className="text-bp-text-main leading-relaxed"><code>{exp.snippet}</code></pre>
                </div>
                <div className="p-5 flex flex-col justify-center items-center text-center bg-white/[0.02] min-h-[150px]">
                  <p className="text-sm text-bp-text-muted leading-relaxed max-w-sm">{exp.render}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {notes.length === 0 && (
            <p className="text-sm text-bp-text-muted font-mono">NO_NOTES_PUBLISHED_YET</p>
          )}
          {notes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="sheet-card flex flex-col gap-2 p-5 no-underline">
              <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-bp-secondary">{note.tag ?? "Note"}</span>
              <h3 className="text-[15px] font-semibold text-bp-text-main leading-snug">{note.title}</h3>
              {note.excerpt && <p className="text-[13px] text-bp-text-muted leading-relaxed line-clamp-2">{note.excerpt}</p>}
              <div className="flex items-center gap-4 mt-1 text-[11px] text-bp-text-muted font-mono">
                <span>{new Date(note.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                {note.read_time && <span>{note.read_time}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `app/lab/page.tsx`**

```tsx
import { Code2, Terminal, Palette } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";
import DimensionLine from "@/components/DimensionLine";
import LabTabs, { type Experiment, type LabNote } from "@/components/LabTabs";
import { getSupabase } from "@/lib/supabase";

const experiments: Experiment[] = [
  {
    id: "EXP-01",
    title: "mentmate App - Auth Flow",
    type: "FLUTTER / DART",
    icon: <Code2 className="w-4 h-4 text-bp-secondary" />,
    snippet: `Future<void> signIn() async {\n  final response = await supabase.auth.signInWithPassword(\n    email: emailController.text,\n    password: passwordController.text,\n  );\n  if (response.user != null) {\n    routeToHome();\n  }\n}`,
    render: "Secure authentication successfully integrated with PostgreSQL backend. UI optimized for mobile responsiveness.",
  },
  {
    id: "EXP-02",
    title: "Lexical Analyzer Engine",
    type: "PYTHON / COMPILER DESIGN",
    icon: <Terminal className="w-4 h-4 text-bp-primary" />,
    snippet: `def tokenize(source_code):\n    tokens = []\n    for match in re.finditer(TOKEN_REGEX, source_code):\n        kind = match.lastgroup\n        value = match.group()\n        tokens.append(Token(kind, value))\n    return tokens`,
    render: "Core logic for parsing and tokenizing custom syntax structures. Optimized for high-speed code evaluation.",
  },
  {
    id: "EXP-03",
    title: "Glassmorphism UI Kit",
    type: "TAILWIND / CSS",
    icon: <Palette className="w-4 h-4 text-bp-gold" />,
    snippet: `.glass-panel {\n  @apply bg-white/5 backdrop-blur-2xl;\n  @apply border border-white/10 rounded-xl;\n  @apply shadow-2xl transition-all;\n}`,
    render: "A reusable, premium design system component used across corporate portfolios and medical e-commerce platforms.",
  },
];

export default async function Lab() {
  const { data, error } = await getSupabase()
    .from("notes")
    .select("slug, title, excerpt, tag, created_at, read_time")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching notes:", error);

  const notes: LabNote[] = data ?? [];

  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.04 — LAB" sheet="04/06" />
        <div className="p-6 md:p-10 max-w-6xl w-full">
          <h1 className="sr-only">Lab — Experiments & Notes by Ebenezer Zotoo</h1>
          <DimensionLine className="mb-8" />
          <LabTabs experiments={experiments} notes={notes} />
        </div>
      </PageTransition>
    </main>
  );
}
```

- [ ] **Step 3: Replace `app/notes/page.tsx` with a redirect**

```tsx
import { redirect } from "next/navigation";

export default function NotesIndex() {
  redirect("/lab");
}
```

- [ ] **Step 4: Restyle `app/notes/[slug]/page.tsx`**

Replace the top-bar block and all `os-*` classes with `bp-*` equivalents, drop the `Sidebar`/`MobileDock`/`SystemDock`/`NotificationBell`/`CloudStatus`/`LiveClock` imports (SheetShell now provides nav), and use `SheetHeader`:

```tsx
import SheetHeader from "@/components/SheetHeader";
import PageTransition from "@/components/PageTransition";
import { getSupabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

/* ─── Inline markdown renderer (unchanged logic, bp-* colors) ─────────────── */

function parseInline(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0, m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[2]) parts.push(<strong key={key++} className="text-bp-text-main font-semibold">{m[2]}</strong>);
    else if (m[3]) parts.push(<em key={key++} className="italic">{m[3]}</em>);
    else if (m[4]) parts.push(<code key={key++} className="px-1.5 py-0.5 bg-bp-surface rounded text-bp-primary font-mono text-[0.85em]">{m[4]}</code>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === "string" ? text : parts;
}

function renderContent(raw: string) {
  const lines = raw.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (/^# /.test(line)) {
      nodes.push(<h1 key={key++} className="text-[24px] font-bold text-bp-text-main mb-4 mt-8 leading-snug font-heading">{parseInline(line.replace(/^# /, ""))}</h1>);
      i++; continue;
    }
    if (/^## /.test(line)) {
      nodes.push(<h2 key={key++} className="text-[20px] font-semibold text-bp-text-main mb-3 mt-7 leading-snug font-heading">{parseInline(line.replace(/^## /, ""))}</h2>);
      i++; continue;
    }
    if (/^### /.test(line)) {
      nodes.push(<h3 key={key++} className="text-[17px] font-semibold text-bp-text-main mb-2 mt-6 font-heading">{parseInline(line.replace(/^### /, ""))}</h3>);
      i++; continue;
    }
    if (/^> /.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^> /.test(lines[i])) { quoteLines.push(lines[i].replace(/^> /, "")); i++; }
      nodes.push(
        <blockquote key={key++} className="relative my-8 pl-6 border-l-2 border-bp-primary">
          <span className="absolute -top-2 left-4 text-4xl text-bp-primary/30 font-serif leading-none select-none">&ldquo;</span>
          <p className="text-bp-text-main italic text-base leading-relaxed pt-2">{parseInline(quoteLines.join(" "))}</p>
        </blockquote>
      );
      continue;
    }
    if (/^---+$/.test(line.trim())) {
      nodes.push(<hr key={key++} className="my-8 border-bp-border" />);
      i++; continue;
    }
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) { items.push(lines[i].replace(/^[-*] /, "")); i++; }
      nodes.push(
        <ul key={key++} className="my-5 space-y-2 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-bp-text-main text-base leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-bp-gold/60 shrink-0" />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, "")); i++; }
      nodes.push(
        <ol key={key++} className="my-5 space-y-2 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-bp-text-main text-base leading-relaxed">
              <span className="shrink-0 text-xs font-mono text-bp-primary mt-1 w-5">{idx + 1}.</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length && lines[i].trim() &&
      !/^#{1,3} /.test(lines[i]) && !/^> /.test(lines[i]) &&
      !/^[-*] /.test(lines[i]) && !/^\d+\. /.test(lines[i]) && !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      nodes.push(<p key={key++} className="text-[16px] text-bp-text-muted leading-[1.75] mb-4">{parseInline(paraLines.join(" "))}</p>);
    }
  }

  return nodes;
}

const noteImageMap: Record<string, string> = {
  "losing-ability-to-explain-tech":   "/notes/explain-tech.jpg",
  "liberating-power-of-self-honesty": "/notes/power.jpg",
};

export default async function NoteDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: note, error } = await getSupabase()
    .from("notes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !note) notFound();

  const coverImage = note.cover_image ?? note.image_url ?? noteImageMap[slug] ?? null;

  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.04 — LAB" sheet="04/06" />

        <div className="p-6 md:px-12 md:py-10 w-full max-w-3xl mx-auto">
          <Link href="/lab" className="flex items-center gap-1.5 text-[12px] text-bp-text-muted hover:text-bp-primary transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Lab
          </Link>

          {coverImage && (
            <div className="rounded-2xl overflow-hidden mb-8 border border-bp-border">
              <img src={coverImage} alt={note.title} className="w-full object-cover max-h-72 object-center" />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono text-bp-primary">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(note.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            {note.read_time && (
              <span className="flex items-center gap-1.5 text-bp-text-muted">
                <Clock className="w-3.5 h-3.5" />
                {note.read_time}
              </span>
            )}
            {note.tag && (
              <span className="px-2 py-0.5 rounded bg-bp-primary/10 border border-bp-primary/20 text-bp-primary">{note.tag}</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-bp-text-main mb-4 leading-tight font-heading">{note.title}</h1>

          {note.excerpt && (
            <p className="text-bp-text-muted text-base leading-relaxed mb-8 border-b border-bp-border pb-8">{note.excerpt}</p>
          )}
          {!note.excerpt && <div className="border-b border-bp-border mb-8" />}

          <article className="max-w-[680px] mx-auto text-[16px] leading-[1.75] text-bp-text-muted">
            {renderContent(note.content ?? "")}
          </article>
        </div>
      </PageTransition>
    </main>
  );
}
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: Build completes.

- [ ] **Step 6: Manual check**

Run: `npm run dev`.
Open `http://localhost:3000/lab` — expect an "Experiments" / "Notes" tab toggle; clicking "Notes" shows the published notes list.
Open `http://localhost:3000/notes` — expect an immediate redirect to `/lab`.
Open `http://localhost:3000/notes/<a-real-slug>` — expect the restyled article page with a "Back to Lab" link.

- [ ] **Step 7: Commit**

```bash
git add components/LabTabs.tsx app/lab/page.tsx app/notes/page.tsx "app/notes/[slug]/page.tsx"
git commit -m "feat: merge Notes into Lab sheet as a tabbed view"
```

---

### Task 9: Work (Projects) sheet

**Files:**
- Create: `components/DrawingCard.tsx`
- Modify: `app/projects/page.tsx` (full rewrite)
- Modify: `app/projects/[slug]/page.tsx` (restyle)

- [ ] **Step 1: Create `components/DrawingCard.tsx`**

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface DrawingCardProps {
  index: number;
  slug: string;
  title: string;
  description: string;
  techStack?: string[];
  imageUrl: string;
  status?: string;
}

export default function DrawingCard({ index, slug, title, description, techStack = [], imageUrl, status = "SHIPPED" }: DrawingCardProps) {
  const drg = `DRG-${String(index + 1).padStart(2, "0")}`;

  return (
    <Link href={`/projects/${slug}`} className="block group">
      <div className="sheet-card overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="text-[9px] font-mono tracking-[0.1em] text-bp-primary">{drg}</span>
          <span className="text-[9px] font-mono tracking-[0.1em] text-bp-text-muted">{status}</span>
        </div>
        <div className="px-5 pb-3">
          <h3 className="text-[15px] font-semibold text-bp-text-main mb-1.5 group-hover:text-bp-primary transition-colors">
            {title}
          </h3>
          <p className="text-[13px] text-bp-text-muted line-clamp-2 leading-relaxed">{description}</p>
        </div>
        <div className="mx-4 mb-4 rounded-lg overflow-hidden h-40 border border-bp-border relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <span className="text-[11px] font-mono tracking-widest text-white/0 group-hover:text-white/80 transition-all duration-300 flex items-center gap-1">
              OPEN_DRAWING <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-5 pb-4">
            {techStack.map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded bg-bp-primary/10 border border-bp-primary/20 text-bp-primary-light text-[10px] font-mono">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Rewrite `app/projects/page.tsx`**

```tsx
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";
import DimensionLine from "@/components/DimensionLine";
import DrawingCard from "@/components/DrawingCard";
import { getSupabase } from "@/lib/supabase";

const projectImageMap: Record<string, string> = {
  "naspa-skills-hub":              "/projects/skillshub.png",
  "ani-surgical":                  "/projects/ani-medical.png",
  "ani-surgical-medical-consult":  "/projects/ani-medical.png",
  "ani-medical-consult":           "/projects/ani-medical.png",
  "aurateq":                       "/projects/aurateq.png",
  "aurateq-consult":               "/projects/aurateq.png",
  "empower-communities-ghana":     "/projects/empower.png",
  "empower-communities":           "/projects/empower.png",
  "gaim-church-app":               "/projects/gaim.png",
  "gaim":                          "/projects/gaim.png",
  "kwahu-asabi-royal-foundation":  "/projects/kwahu-asabi.png",
  "karf":                          "/projects/kwahu-asabi.png",
  "kwahu-asabi-foundation":        "/projects/kwahu-asabi.png",
  "naspa-ghana":                   "/projects/naspa1.png",
  "naspa":                         "/projects/naspa1.png",
  "nss-internal-portal":           "/projects/nss-portal.png",
  "nss-contributor-portal":        "/projects/nss-portal.png",
  "nss-revenue-portal":            "/projects/nss-portal.png",
  "nss-ghana-portal":              "/projects/nss-portal.png",
  "nss-restaurant-app":            "/projects/nss-restaurant.png",
  "nss-restaurant":                "/projects/nss-restaurant.png",
};

export default async function Projects() {
  const { data: projects, error } = await getSupabase()
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching projects:", error);

  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.05 — SELECTED WORK" sheet="05/06" />
        <div className="p-6 md:p-10">
          <h1 className="sr-only">Selected Work — Ebenezer Zotoo</h1>
          <DimensionLine className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects?.map((project, index) => (
              <DrawingCard
                key={project.id}
                index={index}
                slug={project.slug}
                title={project.title}
                description={project.description}
                techStack={project.tech_stack ?? []}
                imageUrl={project.image_url ?? projectImageMap[project.slug] ?? "/project1.png"}
              />
            ))}
          </div>
        </div>
      </PageTransition>
    </main>
  );
}
```

- [ ] **Step 3: Restyle `app/projects/[slug]/page.tsx`**

Same structure and Supabase logic as before, swapped onto `bp-*` tokens, `sheet-card`, and `SheetHeader`:

```tsx
import { notFound } from "next/navigation";
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";
import { getSupabase } from "@/lib/supabase";
import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const projectImageMap: Record<string, string> = {
  "naspa-skills-hub":              "/projects/skillshub.png",
  "ani-surgical":                  "/projects/ani-medical.png",
  "ani-surgical-medical-consult":  "/projects/ani-medical.png",
  "ani-medical-consult":           "/projects/ani-medical.png",
  "aurateq":                       "/projects/aurateq.png",
  "aurateq-consult":               "/projects/aurateq.png",
  "empower-communities-ghana":     "/projects/empower.png",
  "empower-communities":           "/projects/empower.png",
  "gaim-church-app":               "/projects/gaim.png",
  "gaim":                          "/projects/gaim.png",
  "kwahu-asabi-royal-foundation":  "/projects/kwahu-asabi.png",
  "karf":                          "/projects/kwahu-asabi.png",
  "kwahu-asabi-foundation":        "/projects/kwahu-asabi.png",
  "naspa-ghana":                   "/projects/naspa1.png",
  "naspa":                         "/projects/naspa1.png",
  "nss-internal-portal":           "/projects/nss-portal.png",
  "nss-contributor-portal":        "/projects/nss-portal.png",
  "nss-revenue-portal":            "/projects/nss-portal.png",
  "nss-ghana-portal":              "/projects/nss-portal.png",
  "nss-restaurant-app":            "/projects/nss-restaurant.png",
  "nss-restaurant":                "/projects/nss-restaurant.png",
};

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: project, error } = await getSupabase()
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !project) notFound();

  const previewImage = project.image_url ?? projectImageMap[slug] ?? "/project1.png";

  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.05 — SELECTED WORK" sheet="05/06" />

        <div className="p-6 md:p-10 max-w-4xl w-full">
          <Link href="/projects" className="flex items-center gap-1.5 text-[12px] text-bp-text-muted hover:text-bp-primary transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Work
          </Link>

          {previewImage && (
            <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-8 border border-bp-border">
              <img src={previewImage} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bp-bg/80 via-transparent to-transparent" />
            </div>
          )}

          <h1 className="text-[24px] font-bold text-bp-text-main mb-3 font-heading">{project.title}</h1>
          <div className="flex items-center gap-2 text-xs font-mono text-bp-text-muted mb-6">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(project.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            <span className="ml-2 px-2 py-0.5 rounded bg-bp-surface border border-bp-border text-bp-text-main">STATUS: SHIPPED</span>
          </div>

          {project.content && (
            <p className="text-[15px] text-bp-text-muted leading-relaxed mb-6">{project.content}</p>
          )}

          {project.tech_stack?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech_stack.map((tech: string) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-bp-primary/8 text-bp-primary text-[11px] font-mono border border-bp-primary/15">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="rounded-xl overflow-hidden border border-bp-border mb-10">
            <div className="flex items-center gap-2 px-4 py-3 bg-bp-surface border-b border-bp-border">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-[11px] font-mono text-bp-text-muted tracking-wide flex-1 text-center truncate">
                {project.live_url ?? project.title}
              </span>
            </div>
            <div className="bg-bp-bg max-h-[460px] overflow-hidden">
              <img src={previewImage} alt={`${project.title} preview`} className="w-full object-cover object-top" />
            </div>
          </div>

          {project.images?.length > 0 && (
            <div className="mb-10">
              <h2 className="fig-label">GALLERY</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((img: string, i: number) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-bp-border aspect-video">
                    <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.description && (
            <div className="sheet-card p-6 md:p-8">
              <h2 className="fig-label">README.MD</h2>
              <div className="text-bp-text-main leading-relaxed whitespace-pre-wrap text-sm">{project.description}</div>
            </div>
          )}

          <div className="flex items-center gap-4 mt-8">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-bp-primary hover:bg-bp-primary/90 text-black text-[13px] font-bold font-mono rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4" /> Live Site
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-bp-border hover:border-bp-primary/40 text-bp-text-muted hover:text-bp-primary text-[13px] font-mono rounded-lg transition-colors">
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
          </div>
        </div>
      </PageTransition>
    </main>
  );
}
```

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: Build completes.

- [ ] **Step 5: Manual check**

Run: `npm run dev`, open `http://localhost:3000/projects`.
Expected: Project grid with `DRG-01`, `DRG-02`, … labels and a `SHIPPED` badge on each card; clicking a card opens the restyled detail page with the same back-link/gallery/README/CTA structure as before, just on the new palette.

- [ ] **Step 6: Commit**

```bash
git add components/DrawingCard.tsx app/projects/page.tsx "app/projects/[slug]/page.tsx"
git commit -m "feat: rebuild Work sheet with numbered drawing cards"
```

---

### Task 10: Contact sheet & dependency cleanup

**Files:**
- Modify: `app/contact/ContactClient.tsx` (full rewrite — single version)
- Delete: `components/Sidebar.tsx`, `components/MobileDock.tsx`, `components/SystemDock.tsx`, `components/ThemeProvider.tsx`

**Why these deletions happen here:** By this point, `Sidebar.tsx`/`MobileDock.tsx`/`SystemDock.tsx` have zero remaining consumers — their last one, `app/notes/[slug]/page.tsx`, was rewritten without them in Task 8. `ThemeProvider.tsx`'s last consumer is `ContactClient.tsx`'s live `useTheme()` call (picking its Clean vs OS render branch), removed by this task's rewrite. Once this task's rewrite lands, nothing in the codebase references any of those four files, so they can be safely deleted in the same commit.

- [ ] **Step 1: Rewrite `app/contact/ContactClient.tsx`**

```tsx
"use client";

import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";
import {
  Mail, Phone, MapPin, Send,
  CheckCircle2, AlertCircle, LucideLinkedin, LucideTwitter, LucideFacebook,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";

type Config = {
  availability_status: string;
  available: boolean;
  email: string;
  phone: string;
  location: string;
};

const socials = [
  { icon: LucideLinkedin, href: "https://linkedin.com/in/ebenzotoo",    label: "LinkedIn"  },
  { icon: LucideTwitter,  href: "https://twitter.com/st_romario1",      label: "Twitter/X" },
  { icon: LucideFacebook, href: "https://facebook.com/ebenezerromario", label: "Facebook"  },
];

export default function ContactClient({ config }: { config: Config }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      name,
      email,
      message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        await getSupabase().from("messages").insert({ name, email, message, read: false });
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.06 — CONTACT" sheet="06/06" />

        <div className="p-6 md:p-10 flex-1 w-full">
          <h1 className="sr-only">Contact — Ebenezer Zotoo</h1>
          <p className="text-bp-text-muted text-sm max-w-lg leading-relaxed mb-8">
            If you&apos;re working on a digital product, platform, or system and need a solution that is functional, scalable, and user-focused — I can help.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Info block */}
            <div className="flex flex-col gap-6">
              <div className="sheet-card p-6 font-mono text-sm">
                <div className="text-bp-text-main space-y-3">
                  <p><span className="text-bp-primary">const</span> developer = {"{"}</p>
                  <div className="pl-6 space-y-3">
                    <p className="flex items-center gap-3">
                      <span className="text-bp-text-muted">status:</span>
                      <span className={`flex items-center gap-2 ${config.available ? "text-bp-primary" : "text-yellow-400"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.available ? "bg-bp-primary animate-pulse" : "bg-yellow-400"}`} />
                        &quot;{config.availability_status}&quot;,
                      </span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="text-bp-text-muted flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> email:</span>
                      <span className="text-bp-gold">&quot;{config.email}&quot;,</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="text-bp-text-muted flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> phone:</span>
                      <span className="text-bp-gold">&quot;{config.phone}&quot;,</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-bp-text-muted flex items-center gap-2 mt-0.5"><MapPin className="w-3.5 h-3.5" /> location:</span>
                      <span className="text-bp-gold">&quot;{config.location}&quot;</span>
                    </p>
                  </div>
                  <p>{"};"}</p>
                </div>
              </div>

              <div className="sheet-card p-4 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-bp-text-muted">// social_links</span>
                <div className="flex items-center gap-4">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                      className="text-bp-text-muted hover:text-bp-primary transition-colors">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="sheet-card p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-bp-text-main mb-6 font-heading flex items-center gap-2">
                <Send className="w-5 h-5 text-bp-text-muted" /> Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-bp-text-muted tracking-wider">NAME</label>
                  <input
                    type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-bp-surface border border-bp-border rounded-lg px-4 py-3 text-[14px] text-bp-text-main placeholder:text-bp-text-muted/40 focus:outline-none focus:border-bp-primary focus:ring-1 focus:ring-bp-primary/20 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-bp-text-muted tracking-wider">EMAIL</label>
                  <input
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-bp-surface border border-bp-border rounded-lg px-4 py-3 text-[14px] text-bp-text-main placeholder:text-bp-text-muted/40 focus:outline-none focus:border-bp-primary focus:ring-1 focus:ring-bp-primary/20 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-bp-text-muted tracking-wider">MESSAGE</label>
                  <textarea
                    required rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we collaborate?"
                    className="w-full bg-bp-surface border border-bp-border rounded-lg px-4 py-3 text-[14px] text-bp-text-main placeholder:text-bp-text-muted/40 focus:outline-none focus:border-bp-primary focus:ring-1 focus:ring-bp-primary/20 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit" disabled={isSubmitting}
                  className="mt-2 w-full bg-bp-primary hover:bg-bp-primary/90 disabled:opacity-50 text-black font-semibold font-mono text-[14px] py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "SENDING..." : "SEND_MESSAGE"}
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>

                {status === "success" && (
                  <div className="mt-2 p-3 bg-bp-primary/10 border border-bp-primary/20 rounded-md flex items-center gap-2 text-bp-primary text-xs font-mono">
                    <CheckCircle2 className="w-4 h-4" /> MESSAGE SENT
                  </div>
                )}
                {status === "error" && (
                  <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2 text-red-400 text-xs font-mono">
                    <AlertCircle className="w-4 h-4" /> SOMETHING WENT WRONG. PLEASE RETRY.
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </PageTransition>
    </main>
  );
}
```

- [ ] **Step 2: Delete the now-unreferenced OS-chrome files**

```bash
git rm components/Sidebar.tsx components/MobileDock.tsx components/SystemDock.tsx components/ThemeProvider.tsx
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: Build completes with no "module not found" errors.

- [ ] **Step 4: Manual check**

Run: `npm run dev`, open `http://localhost:3000/contact`. Fill the form with test data and submit (or just confirm the layout/styling — don't spam the real Web3Forms endpoint repeatedly). Expect a single design (no Clean-mode branch), title block says "SHEET 06/06".

- [ ] **Step 5: Commit**

```bash
git add app/contact/ContactClient.tsx
git commit -m "feat: rebuild Contact sheet as single design, remove last theme-toggle dependents"
```

---

### Task 11: Final cleanup & full verification

**Files:**
- Delete: `components/NotificationBell.tsx`, `components/CloudStatus.tsx`, `components/LiveClock.tsx`, `components/HeroPrompt.tsx`, `components/ProjectCard.tsx`

- [ ] **Step 1: Confirm zero remaining references**

Run: `grep -rl "NotificationBell\|CloudStatus\|LiveClock\|HeroPrompt\|ProjectCard" app/ components/ --include="*.tsx" --include="*.ts"`
Expected: No output (or only the files themselves, if grep includes the definition file — confirm no `app/` page imports any of them).

- [ ] **Step 2: Delete the dead files**

```bash
git rm components/NotificationBell.tsx components/CloudStatus.tsx components/LiveClock.tsx components/HeroPrompt.tsx components/ProjectCard.tsx
```

- [ ] **Step 3: Full build verification**

Run: `npm run build`
Expected: Clean build, zero errors, zero warnings about missing modules or unknown Tailwind classes resolving to nothing.

- [ ] **Step 4: Full manual QA pass**

Run: `npm run dev`. Walk through every sheet on both desktop and a mobile viewport (browser dev tools responsive mode):
- `/` — hero, stats, marquee, trusted-by, experience timeline
- `/about` — elevation-view photo, narrative, expertise, role history
- `/systems` — nodes, services, process
- `/lab` — experiments tab, notes tab, at least one note detail page
- `/projects` — drawing grid, at least one project detail page
- `/contact` — form renders and the title block shows "SHEET 06/06"
- Confirm the top `SheetNav` (desktop) and bottom `SheetMobileNav` (mobile) correctly highlight the active sheet on every route, including `/notes/<slug>` highlighting "LAB" and `/projects/<slug>` highlighting "WORK".
- Confirm `/admin` still loads and looks untouched (log in if needed).
- Confirm no console errors referencing `ThemeProvider`, `os-*` classes, or missing modules.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove dead OS-desktop components after blueprint redesign"
```

---

## Post-Plan Note

`/admin` was explicitly out of scope per the design spec and was not touched by any task above — confirmed safe because it never referenced any `os-*`/`bp-*` token or OS-chrome component.
