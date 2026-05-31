# UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full visual overhaul of the OS dark mode — charcoal background, orange accent, glassmorphism cards, collapsible sidebar, cinematic home hero.

**Architecture:** Token-first approach — update `@theme` in `globals.css` first so `os-primary` cascades orange automatically, then rebuild components that need structural changes (Sidebar, ProjectCard, Home hero), then sweep remaining pages for hardcoded legacy values.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4 (`@theme` tokens), Lucide icons

**Spec:** `docs/superpowers/specs/2026-05-31-ui-overhaul-design.md`

---

## File Map

| File | Action | Why |
|---|---|---|
| `app/globals.css` | Modify | New @theme tokens + glass utilities + scrollbar |
| `components/Sidebar.tsx` | Rebuild | Collapsible (56px → 220px on hover) |
| `components/ProjectCard.tsx` | Rebuild | Glassmorphism + orange + hardcoded shadow fix |
| `components/SystemDock.tsx` | Sweep | `os-primary` auto-updates; verify glass bg |
| `components/MobileDock.tsx` | Sweep | `bg-os-panel` → `bg-os-bg` |
| `components/CommandPalette.tsx` | Sweep | Verify os-primary usage; fix any hardcoded teal |
| `app/page.tsx` | Rebuild | Cinematic hero banner + CSS marquee strip |
| `app/about/page.tsx` | Sweep | Remove hardcoded gold/teal, verify tokens |
| `app/projects/page.tsx` | Sweep | ProjectCard auto-updates; fix header tokens |
| `app/projects/[slug]/page.tsx` | Sweep | Orange CTA buttons, hero gradient |
| `app/notes/page.tsx` | Rebuild | Glass NoteCard inline rebuild |
| `app/notes/[slug]/page.tsx` | Sweep | 680px reading width, token sweep |
| `app/contact/ContactClient.tsx` | Sweep | contact.json colors, form tokens |
| `app/systems/page.tsx` | Sweep | Glass panels, token sweep |
| `app/lab/page.tsx` | Sweep | Glass panels, token sweep |

---

## Task 1: Design Tokens + Glassmorphism Utilities

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update the `@theme` block**

Replace the entire `@theme` block in `app/globals.css` with:

```css
@theme {
  --font-sans: var(--font-outfit), 'Outfit', sans-serif;
  --font-heading: var(--font-outfit), 'Outfit', sans-serif;
  --font-mono: var(--font-fira), 'Fira Code', monospace;

  --color-os-bg:             #0A0A0F;
  --color-os-surface:        #141418;
  --color-os-surface-2:      #1E1E28;
  --color-os-border:         rgba(255,255,255,0.08);
  --color-os-border-hover:   rgba(249,115,22,0.4);
  --color-os-text-main:      #E8EDF5;
  --color-os-text-muted:     #6B7A99;
  --color-os-primary:        #F97316;
  --color-os-primary-light:  #FB923C;
  --color-os-secondary:      #3A86FF;
  --color-os-gold:           #D4AF37;

  /* Legacy aliases — keep so clean mode and admin don't break */
  --color-os-accent-blue:       #3A86FF;
  --color-os-accent-green:      #F97316;
  --color-os-accent-gold:       #D4AF37;
  --color-os-accent-gold-muted: rgba(212,175,55,0.10);
  --color-os-panel:             #141418;

  /* Legacy vscode tokens */
  --color-vscode-bg:           #0A0A0F;
  --color-vscode-sidebar:      #141418;
  --color-vscode-activity:     #1E1E28;
  --color-vscode-panel:        #141418;
  --color-vscode-border:       rgba(255,255,255,0.08);
  --color-vscode-text-main:    #E8EDF5;
  --color-vscode-text-muted:   #6B7A99;
  --color-vscode-accent-blue:  #3A86FF;
  --color-vscode-accent-green: #F97316;
}
```

- [ ] **Step 2: Update scrollbar + add glass utilities**

Replace the scrollbar block and add glassmorphism utilities after the `body` block:

```css
::-webkit-scrollbar-thumb {
  background-color: rgba(249,115,22,0.15);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(249,115,22,0.30);
}

/* Glassmorphism card standard */
.glass-card {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.08);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}
.glass-card:hover {
  border-color: rgba(249,115,22,0.4);
  box-shadow: 0 8px 32px rgba(249,115,22,0.12);
  transform: translateY(-2px);
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

- [ ] **Step 3: Verify build compiles**

```bash
cd d:\Codes\ebenzotoo-os && npm run build
```

Expected: build completes with no errors. Token cascade means `os-primary` is now orange everywhere.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: update design tokens — charcoal bg, orange accent, glass utilities"
```

---

## Task 2: Collapsible Sidebar

**Files:**
- Modify: `components/Sidebar.tsx`

- [ ] **Step 1: Rebuild Sidebar.tsx**

Replace the entire file with:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, FolderClosed, Share2, FileText, FlaskConical, Mail } from "lucide-react";

const navItems = [
  { name: "About",    path: "/",         icon: User         },
  { name: "Projects", path: "/projects", icon: FolderClosed },
  { name: "Systems",  path: "/systems",  icon: Share2       },
  { name: "Notes",    path: "/notes",    icon: FileText     },
  { name: "Lab",      path: "/lab",      icon: FlaskConical },
  { name: "Contact",  path: "/contact",  icon: Mail         },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="group/sidebar relative h-full hidden md:flex flex-col w-14 hover:w-[220px] transition-all duration-300 ease-in-out overflow-hidden shrink-0 bg-os-bg border-r border-white/[0.06] z-30">

      {/* Logo slot */}
      <div className="h-16 flex items-center justify-center px-3 shrink-0 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-os-primary/15 border border-os-primary/30 flex items-center justify-center shrink-0">
          <span className="text-os-primary font-black text-xs">EZ</span>
        </div>
        <div className="ml-3 overflow-hidden opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          <p className="text-[9px] font-bold tracking-[0.1em] text-os-text-main">EBENEZER</p>
          <p className="text-[8px] text-os-text-muted">ZOTOO</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-0.5 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`relative flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors duration-150
                ${isActive
                  ? "bg-os-primary/12 border border-os-primary/25 text-os-text-main"
                  : "text-os-text-muted hover:text-os-text-main hover:bg-white/[0.04] border border-transparent"
                }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-os-primary rounded-r-full" />
              )}
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-os-primary" : "text-os-text-muted"}`} />
              <span className="text-[13px] font-medium overflow-hidden opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom strip */}
      <div className="p-3 border-t border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-os-primary animate-pulse shrink-0" />
          <span className="text-[11px] text-os-primary font-medium overflow-hidden opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap leading-snug">
            Open to collaborating
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Sidebar.tsx
git commit -m "feat: rebuild Sidebar — collapsible 56px→220px on hover, orange active states"
```

---

## Task 3: Glass ProjectCard

**Files:**
- Modify: `components/ProjectCard.tsx`

- [ ] **Step 1: Rebuild ProjectCard.tsx**

Replace the entire file with:

```tsx
"use client";

import { Code2, Globe, Smartphone, Database, LayoutTemplate, Palette, Terminal, AppWindow, ExternalLink, Github } from "lucide-react";
import { JSX } from "react/jsx-dev-runtime";

interface ProjectCardProps {
  title: string;
  description: string;
  updatedAt: string;
  techStack?: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  status?: "live" | "wip";
}

const techIconMap: Record<string, JSX.Element> = {
  "Flutter":             <Smartphone className="w-3 h-3" />,
  "Mobile App Dev":      <AppWindow className="w-3 h-3" />,
  "Web Development":     <Globe className="w-3 h-3" />,
  "UI/UX Design":        <Palette className="w-3 h-3" />,
  "Python":              <Terminal className="w-3 h-3" />,
  "Database Management": <Database className="w-3 h-3" />,
  "WordPress":           <LayoutTemplate className="w-3 h-3" />,
};

export default function ProjectCard({ title, description, updatedAt, techStack = [], imageUrl, liveUrl, githubUrl, status }: ProjectCardProps) {
  return (
    <div className="glass-card group flex flex-col rounded-[14px] overflow-hidden cursor-pointer">

      {/* Cover image */}
      <div className="relative h-36 w-full overflow-hidden bg-os-surface-2">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-os-primary/10 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent" />
        {status && (
          <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide
            ${status === "live"
              ? "bg-os-primary/15 border border-os-primary/30 text-os-primary"
              : "bg-white/10 border border-white/15 text-os-text-muted"
            }`}>
            {status}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="text-[15px] font-semibold text-os-text-main leading-snug">
          {title}
        </h3>
        <p className="text-[13px] text-os-text-muted leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tech tags */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span key={tech} className="flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-os-primary/10 border border-os-primary/25 text-os-primary-light text-[10px] font-semibold">
                {techIconMap[tech] ?? <Code2 className="w-3 h-3" />}
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-[11px] text-os-text-muted">{updatedAt}</span>
          <div className="flex items-center gap-2">
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/[0.04] border border-white/[0.08] hover:border-os-primary/40 hover:text-os-primary text-os-text-muted transition-colors duration-150"
                onClick={(e) => e.stopPropagation()}>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/[0.04] border border-white/[0.08] hover:border-os-primary/40 hover:text-os-primary text-os-text-muted transition-colors duration-150"
                onClick={(e) => e.stopPropagation()}>
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors. Note: `liveUrl`, `githubUrl`, `status` are optional — existing call sites still work.

- [ ] **Step 3: Commit**

```bash
git add components/ProjectCard.tsx
git commit -m "feat: rebuild ProjectCard — glassmorphism, orange tags, live/github buttons"
```

---

## Task 4: SystemDock + MobileDock

**Files:**
- Modify: `components/SystemDock.tsx`
- Modify: `components/MobileDock.tsx`

- [ ] **Step 1: Update SystemDock glass background**

In `components/SystemDock.tsx`, change the outer div className from:

```tsx
className="w-full max-w-[1440px] mx-auto hidden md:flex flex-col items-center border-t border-os-border bg-os-bg/90 backdrop-blur-md z-20 px-8 py-4 shrink-0"
```

to:

```tsx
className="w-full max-w-[1440px] mx-auto hidden md:flex flex-col items-center border-t border-white/[0.06] bg-[rgba(10,10,15,0.92)] backdrop-blur-md z-20 px-8 py-4 shrink-0"
```

- [ ] **Step 2: Update SystemDock Book a Consult button**

Change the "Book a Consult" button text color from `text-[#080E1A]` to `text-black` (charcoal bg is darker now, black still works):

```tsx
className="px-4 py-2 bg-os-primary hover:bg-os-primary/90 text-black rounded-lg text-[11px] font-semibold transition-colors duration-150"
```

- [ ] **Step 3: Update MobileDock glass background**

In `components/MobileDock.tsx`, change `bg-os-panel/90` to `bg-[rgba(10,10,15,0.95)]`:

```tsx
className="fixed bottom-0 left-0 w-full h-16 bg-[rgba(10,10,15,0.95)] backdrop-blur-lg border-t border-white/[0.06] md:hidden z-50 px-2 pb-safe flex justify-between items-center"
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/SystemDock.tsx components/MobileDock.tsx
git commit -m "feat: update SystemDock + MobileDock — glass backgrounds, charcoal tokens"
```

---

## Task 5: Home Page Overhaul

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add cinematic hero banner**

In `app/page.tsx`, inside the `os-only` div, replace the current "Avatar + identity header" and "Stats block" sections with the new hero banner. The hero goes right after the sticky status bar div and before the ghost watermark.

Add this import at the top of the file:
```tsx
import { ArrowUpRight, Briefcase } from "lucide-react";
```

Replace from `{/* Avatar + identity header */}` down to and including the closing `</div>` of the stats block (the `grid grid-cols-2 md:grid-cols-4` div) with:

```tsx
{/* ── HERO BANNER ─────────────────────────────────────── */}
<div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#1a0800] to-os-bg mb-8">
  {/* Ambient glow */}
  <div className="absolute top-[-60px] right-[80px] w-[280px] h-[280px] bg-os-primary/10 rounded-full blur-[60px] pointer-events-none" />

  <div className="relative z-10 flex items-stretch min-h-[280px]">
    {/* Text side */}
    <div className="flex-1 p-8 flex flex-col justify-between">
      <div>
        <p className="text-[10px] tracking-[0.2em] text-os-primary font-semibold uppercase mb-4">
          Full-Stack Developer · Systems Architect · UI/UX Designer
        </p>
        <h1 className="text-[36px] md:text-[44px] font-black text-os-text-main leading-[1.05] mb-6">
          Building<br />Digital<br />
          <span className="text-os-primary">Products.</span>
        </h1>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact"
            className="px-5 py-2.5 bg-os-primary hover:bg-os-primary/90 text-black text-[13px] font-bold rounded-lg transition-colors duration-150">
            Start a Project
          </Link>
          <Link href="/projects"
            className="px-5 py-2.5 bg-os-primary/10 border border-os-primary/30 hover:border-os-primary/60 text-os-primary text-[13px] font-semibold rounded-lg transition-colors duration-150 flex items-center gap-1.5">
            View Work <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>

    {/* Photo side */}
    <div className="hidden md:block relative w-[260px] shrink-0">
      <div className="absolute inset-0 bg-gradient-to-br from-os-primary/10 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1a0800] to-transparent z-10" />
      <img
        src="/avatar.png"
        alt="Ebenezer Zotoo"
        className="w-full h-full object-cover object-top"
      />
    </div>
  </div>

  {/* Stats bar */}
  <div className="relative z-10 grid grid-cols-4 border-t border-white/[0.06] bg-black/40 backdrop-blur-sm">
    {[
      { value: "8+",     label: "Years Exp."    },
      { value: "30+",    label: "Projects"      },
      { value: "15+",    label: "Clients"       },
      { value: "1,000+", label: "Users Built"   },
    ].map((stat, i, arr) => (
      <div key={stat.label} className={`flex flex-col items-center py-4 ${i < arr.length - 1 ? "border-r border-white/[0.06]" : ""}`}>
        <p className="text-[20px] font-black text-os-primary leading-none">{stat.value}</p>
        <p className="text-[10px] font-medium text-os-text-muted tracking-wider mt-1 uppercase">{stat.label}</p>
      </div>
    ))}
  </div>
</div>

{/* ── MARQUEE STRIP ──────────────────────────────────────── */}
<div className="overflow-hidden mb-8 border-y border-white/[0.04] py-3">
  <div className="marquee-track gap-0">
    {[
      "Next.js", "TypeScript", "Supabase", "Tailwind CSS", "React", "Node.js",
      "Flutter", "PostgreSQL", "UI/UX Design", "Systems Architecture", "Web Development", "Mobile Apps",
      "Next.js", "TypeScript", "Supabase", "Tailwind CSS", "React", "Node.js",
      "Flutter", "PostgreSQL", "UI/UX Design", "Systems Architecture", "Web Development", "Mobile Apps",
    ].map((item, i) => (
      <span key={i} className="flex items-center gap-4 shrink-0 px-4 text-[11px] text-os-text-muted font-medium tracking-[0.08em] uppercase">
        <span className="text-os-primary/50">·</span>
        {item}
      </span>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Update avatar hover glow to orange**

Find the avatar `group cursor-pointer` wrapper in the file (if it still exists after step 1) and remove it since the hero replaced the avatar header. Also find any remaining `[#D4AF37]` hardcoded references on the home page and replace:
- `border-[#D4AF37]/50` → `border-os-primary/50`
- `bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/8` → `bg-os-primary/0 group-hover:bg-os-primary/8`
- `hover:border-os-primary` where it's styled with teal shadow — already updates via token

- [ ] **Step 3: Verify dev build**

```bash
npm run build
```

Expected: builds cleanly. Check the home page visually — hero banner, marquee scrolling, stats bar.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: home page — cinematic hero banner, marquee strip, orange stats"
```

---

## Task 6: Projects Pages

**Files:**
- Modify: `app/projects/page.tsx`
- Modify: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Sweep projects list page tokens**

In `app/projects/page.tsx`, find and replace:
- Any `border-os-primary` → keeps as-is (auto-updates to orange)
- Any hardcoded teal `rgba(11,206,175,...)` → `rgba(249,115,22,...)`
- Active filter badge: change background to `bg-os-primary/15 border-os-primary/30 text-os-primary`
- Count badge: change to `bg-os-surface-2 border-white/[0.08] text-os-text-muted`

- [ ] **Step 2: Update projects detail page CTAs**

In `app/projects/[slug]/page.tsx`, find the Live and GitHub buttons and update to orange:

```tsx
{/* Live button */}
<a href={project.live_url} target="_blank" rel="noopener noreferrer"
  className="flex items-center gap-2 px-5 py-2.5 bg-os-primary hover:bg-os-primary/90 text-black text-[13px] font-bold rounded-lg transition-colors duration-150">
  <ExternalLink className="w-4 h-4" /> Live Site
</a>

{/* GitHub button */}
<a href={project.github_url} target="_blank" rel="noopener noreferrer"
  className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] hover:border-os-primary/40 text-os-text-muted hover:text-os-primary text-[13px] font-medium rounded-lg transition-colors duration-150">
  <Github className="w-4 h-4" /> GitHub
</a>
```

Also update the hero gradient overlay in detail page from teal to orange:
- Find `from-os-primary/20` or any teal gradient → `from-os-primary/15`
- The token auto-updates — just verify no hardcoded hex values remain

- [ ] **Step 3: Build check**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/projects/page.tsx app/projects/[slug]/page.tsx
git commit -m "feat: projects pages — orange CTAs, token sweep"
```

---

## Task 7: Notes Pages

**Files:**
- Modify: `app/notes/page.tsx`
- Modify: `app/notes/[slug]/page.tsx`

- [ ] **Step 1: Rebuild NoteCard inline in notes/page.tsx**

In `app/notes/page.tsx`, find the section where individual notes are rendered (the `.map()` over notes). Replace each note's JSX with the new glass NoteCard layout:

```tsx
{(notes ?? []).map((note: Record<string, unknown>) => {
  const slug = note.slug as string;
  const tag = (note.tag as string) ?? "Other";
  const tagColor = tag === "Tech"    ? "text-os-primary border-os-primary/25 bg-os-primary/10"
                 : tag === "Mindset" ? "text-os-secondary border-os-secondary/25 bg-os-secondary/10"
                 : "text-os-gold border-os-gold/25 bg-os-gold/10";

  return (
    <Link key={slug} href={`/notes/${slug}`}
      className="glass-card group flex rounded-[14px] overflow-hidden no-underline">
      {/* Cover strip */}
      <div className={`w-[90px] shrink-0 bg-gradient-to-br
        ${tag === "Tech"    ? "from-os-primary/15 to-transparent"
        : tag === "Mindset" ? "from-os-secondary/15 to-transparent"
        : "from-os-gold/15 to-transparent"}`}
      />
      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-[0.08em] border ${tagColor}`}>
            {tag}
          </span>
        </div>
        <h3 className="text-[15px] font-semibold text-os-text-main leading-snug line-clamp-2">
          {note.title as string}
        </h3>
        <p className="text-[13px] text-os-text-muted leading-relaxed line-clamp-2">
          {note.excerpt as string}
        </p>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-[11px] text-os-text-muted">
            {new Date(note.created_at as string).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          {note.read_time && (
            <span className="text-[11px] text-os-text-muted">{note.read_time as string}</span>
          )}
        </div>
      </div>
    </Link>
  );
})}
```

Also update the section label from teal `//` to orange:
```tsx
<h2 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-8 uppercase">
  <span className="text-os-primary">// </span>Notes
</h2>
```

- [ ] **Step 2: Update note detail page reading width**

In `app/notes/[slug]/page.tsx`, ensure the article body has a max reading width. Find the article content wrapper and add:

```tsx
className="max-w-[680px] mx-auto text-[16px] leading-[1.75] text-os-text-muted font-sans"
```

Also sweep for any hardcoded teal values in the inline markdown renderer — check the `parseInline` function's `code` inline style and update from teal `text-os-primary` (already token-based).

- [ ] **Step 3: Build check**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/notes/page.tsx app/notes/[slug]/page.tsx
git commit -m "feat: notes pages — glass NoteCard, colored tags, 680px reading width"
```

---

## Task 8: About + Contact Pages

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/contact/ContactClient.tsx`

- [ ] **Step 1: Sweep about page**

In `app/about/page.tsx`, find and replace all hardcoded gold/teal references:
- `border-[#D4AF37]/50` → `border-os-primary/50`
- `bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/8` → `bg-os-primary/0 group-hover:bg-os-primary/8`
- `group-hover:bg-[#D4AF37]/8` → `group-hover:bg-os-primary/8`
- Any `rgba(11,206,175,...)` → `rgba(249,115,22,...)`

- [ ] **Step 2: Sweep contact page**

In `app/contact/ContactClient.tsx`, update the `contact.json` terminal block:
- `const` keyword: `text-os-primary` (auto-updates to orange) ✓
- Property names: `text-os-secondary` (blue) ✓
- String values: `text-os-gold` ✓

Also update form inputs focus ring from teal to orange:
- `focus:border-os-primary` — auto-updates ✓
- `focus:ring-os-primary/20` — auto-updates ✓

Update submit button:
- `bg-os-primary hover:bg-os-primary/90 text-black` — verify it uses token not hardcoded hex

- [ ] **Step 3: Build check**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx app/contact/ContactClient.tsx
git commit -m "feat: about + contact pages — orange token sweep, remove hardcoded gold"
```

---

## Task 9: Systems + Lab + CommandPalette

**Files:**
- Modify: `app/systems/page.tsx`
- Modify: `app/lab/page.tsx`
- Modify: `components/CommandPalette.tsx`

- [ ] **Step 1: Add glassmorphism to Systems panels**

In `app/systems/page.tsx`, find all card/panel containers using `bg-os-surface border-os-border` and add the `glass-card` class or replace inline:

```tsx
// Before
className="... bg-os-surface border border-os-border ..."

// After — replace bg and border with glass-card class
className="glass-card ... rounded-[14px] ..."
```

Do this for each distinct card/panel component on the systems page. Keep layout classes (grid, flex, padding) unchanged.

- [ ] **Step 2: Add glassmorphism to Lab panels**

Same approach as step 1, applied to `app/lab/page.tsx`.

- [ ] **Step 3: Sweep CommandPalette**

In `components/CommandPalette.tsx`, find and update:
- Background: change to `bg-[rgba(14,14,20,0.95)] backdrop-blur-xl border border-os-primary/20`
- Active result row: `bg-os-primary/10 border-l-2 border-os-primary`
- Search input caret: already uses `caret-os-primary` or add it
- Any hardcoded teal `#0BCEAF` or `rgba(11,206,175,...)` → replace with `#F97316` / `rgba(249,115,22,...)`

- [ ] **Step 4: Build check**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add app/systems/page.tsx app/lab/page.tsx components/CommandPalette.tsx
git commit -m "feat: systems, lab glassmorphism + CommandPalette orange sweep"
```

---

## Task 10: Final Polish + Push

**Files:**
- Modify: Any remaining files with hardcoded teal

- [ ] **Step 1: Global hardcoded teal scan**

Run a grep to find any remaining hardcoded teal values in non-admin, non-clean files:

```bash
grep -r "0BCEAF\|11,206,175\|os-accent-green" --include="*.tsx" --include="*.ts" --include="*.css" app/ components/ | grep -v admin | grep -v clean
```

For each match: replace with the orange equivalent:
- `#0BCEAF` → `#F97316`
- `rgba(11,206,175,` → `rgba(249,115,22,`
- `os-accent-green` → `os-primary` (the legacy alias now points to orange anyway)

- [ ] **Step 2: Verify clean mode unaffected**

Open the site and toggle to clean mode. Confirm it still looks correct — clean mode uses different CSS classes (`clean-only`) and its own color variables, so it should be unaffected.

- [ ] **Step 3: Full production build**

```bash
npm run build
```

Expected: ✓ Compiled successfully, zero TypeScript errors.

- [ ] **Step 4: Add .superpowers to .gitignore**

```bash
echo ".superpowers/" >> .gitignore
```

- [ ] **Step 5: Final commit + push**

```bash
git add -A
git commit -m "feat: complete UI overhaul — charcoal + orange + glassmorphism (full rebuild)"
git push
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Design tokens (Task 1)
- [x] Glassmorphism utilities (Task 1)
- [x] Collapsible sidebar (Task 2)
- [x] SystemDock glass + orange (Task 4)
- [x] MobileDock glass (Task 4)
- [x] ProjectCard glassmorphism (Task 3)
- [x] NoteCard glassmorphism (Task 7)
- [x] Home cinematic hero (Task 5)
- [x] Featured marquee strip (Task 5)
- [x] Projects pages orange CTAs (Task 6)
- [x] Notes pages + reading width (Task 7)
- [x] About page token sweep (Task 8)
- [x] Contact page token sweep (Task 8)
- [x] Systems + Lab glassmorphism (Task 9)
- [x] CommandPalette orange (Task 9)
- [x] Scrollbar orange (Task 1)
- [x] Clean mode unchanged — handled by CSS class isolation, no tasks needed
- [x] Admin panel unchanged — no tasks touch admin/

**No placeholders:** All steps have explicit code or grep commands. ✓

**Type consistency:** `ProjectCardProps` interface adds `liveUrl`, `githubUrl`, `status` as optional — won't break existing call sites. NoteCard uses `Record<string, unknown>` matching the existing notes page pattern. ✓
