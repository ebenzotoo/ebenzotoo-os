# OS Dark Mode Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all public-facing OS dark mode pages using the new teal/blue/gold palette, Outfit font, and elevated card/component design — without changing layout structure or clean mode.

**Architecture:** Token-first approach — update `globals.css` design tokens and `layout.tsx` font imports first so all downstream component changes inherit the new values. Components are updated one at a time, each commit leaving the site in a working state. No new files needed — all changes are in-place edits.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4 (`@theme` tokens), Outfit + Fira Code (next/font/google), Supabase, TypeScript

---

## File Map

| File | Change |
|---|---|
| `app/globals.css` | Replace all `@theme` color tokens, update scrollbar |
| `app/layout.tsx` | Replace Syne + Space_Grotesk with Outfit, keep Fira_Code |
| `components/Sidebar.tsx` | Teal active states, clean bottom strip |
| `components/SystemDock.tsx` | Two-row layout, teal CTA, new hover colors |
| `components/ProjectCard.tsx` | Full card redesign — image block, tech tags, hover |
| `app/page.tsx` | Stats row, bio terminal, expertise tags, timeline — OS section only |
| `app/about/page.tsx` | Same components as Home — OS section only |
| `app/projects/page.tsx` | Header tokens, card grid |
| `app/projects/[slug]/page.tsx` | Hero image, gallery, buttons |
| `app/notes/page.tsx` | New NoteCard layout, section label |
| `app/notes/[slug]/page.tsx` | Reading width, Outfit body, heading sizes |
| `app/contact/ContactClient.tsx` | contact.json colors, form inputs, submit button |
| `app/systems/page.tsx` | Token + font class updates only |
| `app/lab/page.tsx` | Token + font class updates only |

> **Visual testing note:** This plan has no unit tests — all verification is visual. After each task, run `npm run dev`, open `http://localhost:3000` and check the affected page in OS mode (dark theme). Use the ThemeToggle to switch if needed.

---

## Task 1: Design Tokens + Outfit Font

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

### Step 1.1 — Update `@theme` tokens in `app/globals.css`

Replace the entire `@theme` block:

```css
@theme {
  --font-sans: var(--font-outfit), 'Outfit', sans-serif;
  --font-mono: var(--font-fira), 'Fira Code', monospace;

  --color-os-bg:             #080E1A;
  --color-os-surface:        #0F1626;
  --color-os-surface-2:      #151E30;
  --color-os-border:         #1A2540;
  --color-os-border-hover:   #253354;
  --color-os-text-main:      #E8EDF5;
  --color-os-text-muted:     #6B7A99;
  --color-os-primary:        #0BCEAF;
  --color-os-secondary:      #3A86FF;
  --color-os-gold:           #D4AF37;

  /* Legacy aliases — keep so existing references don't break */
  --color-os-accent-blue:       #3A86FF;
  --color-os-accent-green:      #0BCEAF;
  --color-os-accent-gold:       #D4AF37;
  --color-os-accent-gold-muted: rgba(212,175,55,0.10);
  --color-os-panel:             #0F1626;

  /* Legacy vscode tokens */
  --color-vscode-bg:           #080E1A;
  --color-vscode-sidebar:      #0F1626;
  --color-vscode-activity:     #151E30;
  --color-vscode-panel:        #0F1626;
  --color-vscode-border:       #1A2540;
  --color-vscode-text-main:    #E8EDF5;
  --color-vscode-text-muted:   #6B7A99;
  --color-vscode-accent-blue:  #3A86FF;
  --color-vscode-accent-green: #0BCEAF;
}
```

Also update the scrollbar thumb to use teal:
```css
::-webkit-scrollbar-thumb {
  background-color: rgba(11,206,175,0.15);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(11,206,175,0.30);
}
```

- [ ] Make the above changes to `app/globals.css`

### Step 1.2 — Swap fonts in `app/layout.tsx`

Replace the entire file:

```tsx
import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import CommandPalette from "../components/CommandPalette";
import DesktopHint from "../components/DesktopHint";
import ThemeProvider from "../components/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import OSShell from "../components/OSShell";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["300","400","500","600","700","800"] });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });

export const metadata: Metadata = {
  title: "Ebenezer Zotoo | Designer & Developer",
  description: "Digital Product Designer & Systems Builder",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('portfolio-theme');
              if (t === 'clean' || t === 'os') document.documentElement.setAttribute('data-theme', t);
            } catch(e) {}
          })();
        ` }} />
      </head>
      <body className={`${outfit.variable} ${firaCode.variable} bg-os-bg text-os-text-main font-sans antialiased`}>
        <ThemeProvider>
          <CommandPalette />
          <DesktopHint />
          <OSShell>
            {children}
          </OSShell>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] Make the above changes to `app/layout.tsx`

### Step 1.3 — Visual check

Run `npm run dev`. Open `http://localhost:3000`. Verify:
- Body font changed to Outfit (rounder, geometric letterforms)
- Background is deeper navy (`#080E1A`)
- No console errors about missing CSS variables

- [ ] Visual check passes

### Step 1.4 — Commit

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: update design tokens and swap to Outfit font"
```

- [ ] Committed

---

## Task 2: Sidebar

**Files:**
- Modify: `components/Sidebar.tsx`

### Step 2.1 — Rewrite Sidebar

Replace the entire file:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, FolderClosed, Share2, FileText, FlaskConical, Mail, MapPin, Link as LinkIcon } from "lucide-react";

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
    <div className="w-[260px] h-full border-r border-os-border hidden md:flex flex-col bg-os-bg">
      {/* Branding */}
      <div className="h-16 flex items-center px-6 border-b border-os-border">
        <h1 className="text-[11px] font-semibold tracking-[0.2em] text-os-text-main">EBENEZER ZOTOO</h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-5 flex flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                ${isActive
                  ? "bg-[#0F1A2E] text-os-text-main"
                  : "text-os-text-muted hover:text-os-text-main hover:bg-os-surface"
                }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-os-primary rounded-r-full" />
              )}
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-os-primary" : "text-os-text-muted"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom info */}
      <div className="p-5 border-t border-os-border flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-xs text-os-text-muted">
          <LinkIcon className="w-3.5 h-3.5 shrink-0" />
          <span>ebenzotoo.com</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-os-text-muted">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>Accra, Ghana</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-os-primary animate-pulse shrink-0" />
          <span className="text-[11px] text-os-primary font-medium leading-snug">Open to collaborating</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] Replace `components/Sidebar.tsx` with the above

### Step 2.2 — Visual check

Open `http://localhost:3000`. Verify:
- Sidebar uses new background (`#080E1A`)
- Active item has a teal left bar and `#0F1A2E` background
- Bottom strip shows location and availability as two clean lines (no badge overflow)

- [ ] Visual check passes

### Step 2.3 — Commit

```bash
git add components/Sidebar.tsx
git commit -m "feat: redesign sidebar with teal active states and clean bottom strip"
```

- [ ] Committed

---

## Task 3: SystemDock

**Files:**
- Modify: `components/SystemDock.tsx`

### Step 3.1 — Rewrite SystemDock

Replace the entire file:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monitor, Folder, Layers, MessageSquare, User, Mail, LinkedinIcon, TwitterIcon, FacebookIcon } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/233200012873";

const socialLinks = [
  { icon: LinkedinIcon, href: "https://linkedin.com/in/ebenzotoo",    label: "LinkedIn"  },
  { icon: TwitterIcon,  href: "https://twitter.com/st_romario1",      label: "Twitter/X" },
  { icon: FacebookIcon, href: "https://facebook.com/ebenezerromario", label: "Facebook"  },
];

const dockItems = [
  { icon: User,          path: "/",         title: "About"    },
  { icon: Folder,        path: "/projects", title: "Projects" },
  { icon: Layers,        path: "/systems",  title: "Systems"  },
  { icon: MessageSquare, path: "/notes",    title: "Notes"    },
  { icon: Monitor,       path: "/lab",      title: "Lab"      },
  { icon: Mail,          path: "/contact",  title: "Contact"  },
];

export default function SystemDock() {
  const pathname = usePathname();

  return (
    <div className="w-full max-w-[1440px] mx-auto hidden md:flex flex-col items-center border-t border-os-border bg-os-bg/90 backdrop-blur-md z-20 px-8 py-4 shrink-0">

      {/* Row 1: Status bar */}
      <div className="w-full flex items-center justify-between text-[11px] mb-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-os-primary animate-pulse" />
          <span className="text-os-primary font-medium">Open to collaborating</span>
        </div>

        <div className="flex items-center gap-5">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
              className="text-os-text-muted hover:text-os-primary transition-colors duration-150">
              <Icon className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/contact"
            className="px-4 py-2 border border-os-border hover:border-os-border-hover text-os-text-muted hover:text-os-text-main rounded-lg text-[11px] font-medium transition-colors duration-150">
            Start a Project
          </Link>
          <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 bg-os-primary hover:bg-os-primary/90 text-[#080E1A] rounded-lg text-[11px] font-semibold transition-colors duration-150">
            Book a Consult ↗
          </Link>
        </div>
      </div>

      {/* Row 2: Icon dock */}
      <div className="flex items-center gap-8">
        {dockItems.map(({ icon: Icon, path, title }) => {
          const isActive = pathname === path;
          return (
            <Link key={path} href={path} title={title} className="flex flex-col items-center gap-1.5">
              <Icon className={`w-[18px] h-[18px] transition-colors duration-150 ${isActive ? "text-os-primary" : "text-os-text-muted hover:text-os-text-main"}`} />
              {isActive && <span className="w-1 h-1 rounded-full bg-os-primary" />}
            </Link>
          );
        })}
      </div>

    </div>
  );
}
```

- [ ] Replace `components/SystemDock.tsx` with the above

### Step 3.2 — Visual check

Open `http://localhost:3000`. Verify:
- Dock has two clear rows
- Row 1: teal availability text left, social icons center, CTA buttons right
- "Book a Consult" button is teal filled with dark text
- Active dock icon shows teal dot underneath

- [ ] Visual check passes

### Step 3.3 — Commit

```bash
git add components/SystemDock.tsx
git commit -m "feat: redesign SystemDock with two-row layout and teal CTA"
```

- [ ] Committed

---

## Task 4: ProjectCard Component

**Files:**
- Modify: `components/ProjectCard.tsx`

### Step 4.1 — Rewrite ProjectCard

Replace the entire file:

```tsx
"use client";

import { Code2, Globe, Smartphone, Database, LayoutTemplate, Palette, Terminal, AppWindow } from "lucide-react";
import { JSX } from "react/jsx-dev-runtime";

interface ProjectCardProps {
  title: string;
  description: string;
  updatedAt: string;
  techStack?: string[];
  imageUrl?: string;
}

const techIconMap: Record<string, JSX.Element> = {
  "Flutter":            <Smartphone className="w-3 h-3" />,
  "Mobile App Dev":     <AppWindow className="w-3 h-3" />,
  "Web Development":    <Globe className="w-3 h-3" />,
  "UI/UX Design":       <Palette className="w-3 h-3" />,
  "Python":             <Terminal className="w-3 h-3" />,
  "Database Management":<Database className="w-3 h-3" />,
  "WordPress":          <LayoutTemplate className="w-3 h-3" />,
};

export default function ProjectCard({ title, description, updatedAt, techStack = [], imageUrl }: ProjectCardProps) {
  return (
    <div className="group flex flex-col rounded-xl bg-os-surface border border-os-border hover:border-os-primary/35 hover:shadow-[0_8px_32px_rgba(11,206,175,0.07)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer">

      {/* Cover image */}
      {imageUrl && (
        <div className="relative h-40 w-full overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-os-surface via-transparent to-transparent" />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <h3 className="text-[15px] font-semibold text-os-text-main group-hover:text-os-primary transition-colors duration-150 leading-snug">
          {title}
        </h3>
        <p className="text-[13px] text-os-text-muted leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tech tags */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {techStack.map((tech) => (
              <span key={tech} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-os-primary/8 text-os-primary text-[10px] font-medium">
                {techIconMap[tech] ?? <Code2 className="w-3 h-3" />}
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-os-border flex items-center justify-between">
          <span className="text-[11px] text-os-text-muted font-medium">{updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] Replace `components/ProjectCard.tsx` with the above

### Step 4.2 — Visual check

Open `http://localhost:3000/projects`. Verify:
- Cards have teal hover border glow and lift on hover
- Tech stack shows as teal tags (not raw icons)
- No gradient sweep on hover
- Card without image still looks clean

- [ ] Visual check passes

### Step 4.3 — Commit

```bash
git add components/ProjectCard.tsx
git commit -m "feat: redesign ProjectCard with image block, teal tags, and clean hover"
```

- [ ] Committed

---

## Task 5: Home Page (OS section)

**Files:**
- Modify: `app/page.tsx`

### Step 5.1 — Update top status bar

Find the sticky status bar `<div>` (line ~35) and replace `font-mono` and `bg-[#0A0F1C]/90` with updated tokens:

```tsx
<div className="border-b border-os-border flex justify-end items-center px-8 py-5 text-os-text-muted text-xs gap-5 hidden md:flex sticky top-0 bg-os-bg/90 backdrop-blur-md z-20">
  <NotificationBell />
  <CloudStatus />
  <span className="font-mono">SYSTEM_INFO <LiveClock /></span>
</div>
```

- [ ] Update status bar

### Step 5.2 — Update ghost watermark

Find the ghost watermark `<div>` and update:
```tsx
<div className="absolute top-6 right-0 text-[100px] font-sans font-extrabold text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">
  ABOUT
</div>
```

- [ ] Update ghost watermark

### Step 5.3 — Update avatar + identity block

Find the identity block and replace:
```tsx
<div>
  <p className="text-[11px] tracking-[0.15em] text-os-text-muted font-medium mb-1">// about_user</p>
  <p className="text-[18px] font-semibold text-os-text-main mt-1">Ebenezer Zotoo</p>
  <p className="text-os-primary text-[13px] font-medium mt-0.5">Digital Product Designer & Systems Builder</p>
  <p className="text-os-text-muted text-[12px] mt-2 leading-snug max-w-xs">
    📍 Accra, Ghana &nbsp;·&nbsp; 🌍 Open to remote opportunities
  </p>
</div>
```

- [ ] Update identity block

### Step 5.4 — Update stats block

Replace the entire stats grid:
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 mb-8">
  {[
    { value: "8+",      label: "Years Experience"     },
    { value: "30+",     label: "Projects Shipped"     },
    { value: "1,000+",  label: "Platform Users Built" },
    { value: "3",       label: "Countries"            },
  ].map((stat, i, arr) => (
    <div key={stat.label} className={`flex flex-col items-center py-5 ${i < arr.length - 1 ? "border-r border-os-border" : ""}`}>
      <p className="text-[32px] font-bold text-os-text-main leading-none">{stat.value}</p>
      <p className="text-[11px] font-medium text-os-text-muted tracking-wide mt-2 uppercase">{stat.label}</p>
    </div>
  ))}
</div>
```

- [ ] Update stats block

### Step 5.5 — Update terminal bio block

Replace the bio container:
```tsx
<div className="bg-os-surface border border-os-border rounded-xl p-6 mb-10">
  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-os-border">
    <Terminal className="w-4 h-4 text-os-primary" />
    <span className="text-[12px] font-mono text-os-text-muted">~/ebenzotoo/bio.txt</span>
  </div>
  <p className="text-os-text-main leading-relaxed text-[15px]">
    Most digital products don&apos;t fail because of bad ideas — they fail because they are difficult to use, poorly structured, or not built to scale.
    <br /><br />
    I help organizations turn complex ideas into intuitive, functional, and scalable digital systems that actually deliver results. With over 8 years of experience, I&apos;ve worked across government, healthcare, education, and tech — designing and building platforms that improve accessibility, efficiency, and real-world impact.
  </p>
</div>
```

- [ ] Update terminal bio block

### Step 5.6 — Update Core Expertise section

Replace the expertise section:
```tsx
<div className="mb-12">
  <h2 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-5 uppercase">
    <span className="text-os-primary">//</span> Core Expertise
  </h2>
  <div className="flex flex-wrap gap-2.5">
    {["UI/UX & Product Design", "Web & Platform Development", "Digital Systems Architecture", "User Experience Optimization", "Product Strategy & Execution"].map((skill) => (
      <span key={skill} className="px-4 py-2 bg-os-surface border border-os-border hover:border-os-primary/40 hover:text-os-text-main rounded-lg text-[13px] text-os-text-muted font-medium transition-colors duration-150">
        {skill}
      </span>
    ))}
  </div>
</div>
```

- [ ] Update expertise tags

### Step 5.7 — Update Trusted By section

Replace client logos section:
```tsx
<div className="mb-12">
  <h2 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-5 uppercase">
    <span className="text-os-primary">//</span> Trusted By
  </h2>
  <div className="grid grid-cols-3 gap-3">
    {clients.map((client) => (
      <div key={client.name} className="bg-os-surface border border-os-border hover:border-os-border-hover rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 group">
        <img
          src={client.logo}
          alt={client.name}
          title={client.name}
          className="max-h-8 max-w-full object-contain opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300"
        />
        <span className="text-[10px] text-os-text-muted text-center leading-tight opacity-70 group-hover:opacity-100 transition-opacity duration-200">
          {client.name}
        </span>
      </div>
    ))}
  </div>
</div>
```

- [ ] Update trusted by section

### Step 5.8 — Update Experience timeline

Replace the jobs section:
```tsx
<div className="mb-12">
  <h2 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-6 uppercase">
    <span className="text-os-primary">//</span> Experience
  </h2>
  <div className="flex flex-col gap-6 border-l-2 border-os-border pl-6">
    {jobs.map((job) => (
      <div key={job.role} className="relative">
        <span className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full border-2 border-os-primary bg-os-bg" />
        <p className="text-[14px] font-semibold text-os-text-main">{job.role}</p>
        <p className="text-[12px] text-os-secondary font-medium mt-0.5">{job.company}</p>
        <p className="text-[11px] text-os-text-muted mt-0.5">{job.year}</p>
        <p className="text-[13px] text-os-text-muted mt-2 leading-relaxed">{job.desc}</p>
      </div>
    ))}
  </div>
</div>
```

- [ ] Update experience timeline

### Step 5.9 — Visual check

Open `http://localhost:3000`. Verify:
- Stats display as raw numbers with dividers (no card boxes)
- Bio terminal block has teal header icon
- Section labels have teal `//` prefix
- Experience dots are teal ring
- Expertise tags lift border color on hover

- [ ] Visual check passes

### Step 5.10 — Commit

```bash
git add app/page.tsx
git commit -m "feat: update home page OS section with new design system"
```

- [ ] Committed

---

## Task 6: About Page (OS section)

**Files:**
- Modify: `app/about/page.tsx`

### Step 6.1 — Apply same pattern as Home

The About page OS section uses the same components. Apply identical token replacements:
- Status bar: `bg-os-bg/90`, `border-os-border`, `text-xs`
- Ghost watermark: `text-white/[0.02]`, `font-sans font-extrabold`
- Section labels: `<span className="text-os-primary">//</span>` prefix, `text-[11px]` Outfit
- Expertise tags: same class string as Task 5.6
- Experience timeline: same class string as Task 5.8
- All `bg-white/[0.03]` → `bg-os-surface`
- All `border-white/5` → `border-os-border`
- All `border-white/10` → `border-os-border`
- All `text-white` → `text-os-text-main`
- All `hover:border-[#D4AF37]` → `hover:border-os-primary/35`

- [ ] Apply token replacements to `app/about/page.tsx`

### Step 6.2 — Visual check

Open `http://localhost:3000/about`. Verify consistent appearance with Home page.

- [ ] Visual check passes

### Step 6.3 — Commit

```bash
git add app/about/page.tsx
git commit -m "feat: update about page OS section with new design system"
```

- [ ] Committed

---

## Task 7: Projects Page + Detail

**Files:**
- Modify: `app/projects/page.tsx`
- Modify: `app/projects/[slug]/page.tsx`

### Step 7.1 — Update projects list page

Apply token replacements to `app/projects/page.tsx` OS section:
- Status bar: same as Task 5.1
- Ghost watermark: same as Task 5.2
- Header label: `<span className="text-os-primary">//</span> Projects` pattern
- Count badge: `bg-os-surface border border-os-border text-os-text-muted`
- Active badge: `bg-os-primary/8 border border-os-primary/20 text-os-primary`
- Pass `imageUrl={project.image_url ?? projectImageMap[project.slug]}` to ProjectCard

- [ ] Update `app/projects/page.tsx`

### Step 7.2 — Update project detail page

In `app/projects/[slug]/page.tsx`, replace the main content area:

```tsx
{/* Hero image */}
{previewImage && (
  <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-8 border border-os-border">
    <img src={previewImage} alt={project.title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-os-bg/80 via-transparent to-transparent" />
  </div>
)}

{/* Back link */}
<Link href="/projects" className="flex items-center gap-1.5 text-[12px] text-os-text-muted hover:text-os-primary transition-colors mb-6">
  <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
</Link>

{/* Title + meta */}
<h1 className="text-[24px] font-bold text-os-text-main mb-3">{project.title}</h1>
<p className="text-[15px] text-os-text-muted leading-relaxed mb-6">{project.description}</p>

{/* Tech tags */}
{project.tech_stack?.length > 0 && (
  <div className="flex flex-wrap gap-2 mb-8">
    {project.tech_stack.map((tech: string) => (
      <span key={tech} className="px-3 py-1.5 rounded-lg bg-os-primary/8 text-os-primary text-[11px] font-medium border border-os-primary/15">
        {tech}
      </span>
    ))}
  </div>
)}

{/* CTA buttons */}
<div className="flex items-center gap-3 mb-10">
  {project.live_url && (
    <a href={project.live_url} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2.5 bg-os-primary text-[#080E1A] text-[13px] font-semibold rounded-lg hover:bg-os-primary/90 transition-colors">
      View Live ↗
    </a>
  )}
  {project.github_url && (
    <a href={project.github_url} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2.5 border border-os-border text-os-text-muted text-[13px] font-medium rounded-lg hover:border-os-border-hover hover:text-os-text-main transition-colors">
      GitHub
    </a>
  )}
</div>
```

Also update gallery images grid:
```tsx
{project.images?.length > 0 && (
  <div className="mb-10">
    <h3 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-4 uppercase">
      <span className="text-os-primary">//</span> Gallery
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {project.images.map((img: string, i: number) => (
        <div key={i} className="rounded-xl overflow-hidden border border-os-border aspect-video">
          <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  </div>
)}
```

- [ ] Update `app/projects/[slug]/page.tsx`

### Step 7.3 — Visual check

Open `http://localhost:3000/projects` and click into a project. Verify:
- Hero image with gradient overlay
- Teal tech tags
- Live button is teal filled, GitHub is ghost
- Gallery grid with rounded borders

- [ ] Visual check passes

### Step 7.4 — Commit

```bash
git add app/projects/page.tsx "app/projects/[slug]/page.tsx"
git commit -m "feat: update projects pages with new card design and detail layout"
```

- [ ] Committed

---

## Task 8: Notes Page + Detail

**Files:**
- Modify: `app/notes/page.tsx`
- Modify: `app/notes/[slug]/page.tsx`

### Step 8.1 — Update notes list page

In `app/notes/page.tsx`, replace the NoteCard JSX inside the map:

```tsx
<Link href={`/notes/${article.slug}`} key={article.id} className="block group">
  <div className="flex flex-col sm:flex-row rounded-xl bg-os-surface border border-os-border hover:border-os-primary/35 hover:shadow-[0_8px_32px_rgba(11,206,175,0.07)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">

    {/* Cover image strip */}
    {cover && (
      <div className="sm:w-[120px] sm:shrink-0 h-40 sm:h-auto overflow-hidden">
        <img src={cover} alt={article.title} className="w-full h-full object-cover" />
      </div>
    )}

    {/* Text */}
    <div className="flex flex-col gap-2.5 p-5 flex-1">
      <div className="flex flex-wrap items-center gap-2.5">
        {article.tag && (
          <span className={`text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-lg ${
            article.tag.toLowerCase().includes("tech") ? "bg-os-primary/8 text-os-primary border border-os-primary/15" :
            article.tag.toLowerCase().includes("mind") ? "bg-os-secondary/8 text-os-secondary border border-os-secondary/15" :
            "bg-os-gold/8 text-os-gold border border-os-gold/15"
          }`}>
            {article.tag}
          </span>
        )}
        <div className="flex items-center gap-3 text-[12px] text-os-text-muted">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          {article.read_time && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.read_time}
            </div>
          )}
        </div>
      </div>
      <h3 className="text-[16px] font-semibold text-os-text-main group-hover:text-os-primary transition-colors leading-snug">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="text-[13px] text-os-text-muted leading-relaxed line-clamp-2">{article.excerpt}</p>
      )}
    </div>
  </div>
</Link>
```

Also update the section label:
```tsx
<h2 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-8 uppercase">
  <span className="text-os-primary">//</span> Notes
</h2>
```

- [ ] Update `app/notes/page.tsx`

### Step 8.2 — Update note detail page

In `app/notes/[slug]/page.tsx`, update the prose content wrapper:

```tsx
<article className="max-w-[680px] mx-auto">
```

Update the body font and heading sizes inside `renderContent` — find `className` strings for headings and body text:
- `h1`: `text-[24px] font-bold text-os-text-main mb-4 mt-8`
- `h2`: `text-[20px] font-semibold text-os-text-main mb-3 mt-7`
- `h3`: `text-[17px] font-semibold text-os-text-main mb-2 mt-6`
- `p` (body): `text-[16px] text-os-text-muted leading-[1.75] mb-4`
- `code` inline: `px-1.5 py-0.5 bg-os-surface rounded text-os-primary font-mono text-[0.85em]`
- Images: add `rounded-xl border border-os-border` to img tags

Also update the back link and meta:
```tsx
<Link href="/notes" className="flex items-center gap-1.5 text-[12px] text-os-text-muted hover:text-os-primary transition-colors mb-6">
  <ArrowLeft className="w-3.5 h-3.5" /> Back to Notes
</Link>
```

- [ ] Update `app/notes/[slug]/page.tsx`

### Step 8.3 — Visual check

Open `http://localhost:3000/notes` and click into a note. Verify:
- NoteCard shows cover image strip + colored tag badge
- Note detail has `680px` reading width
- Body text is `16px` with `1.75` line-height
- Headings are Outfit 700

- [ ] Visual check passes

### Step 8.4 — Commit

```bash
git add app/notes/page.tsx "app/notes/[slug]/page.tsx"
git commit -m "feat: redesign notes list and detail pages"
```

- [ ] Committed

---

## Task 9: Contact Page

**Files:**
- Modify: `app/contact/ContactClient.tsx`

### Step 9.1 — Update contact.json terminal block

Find the terminal JSON block and update token colors:
```tsx
{/* OS contact.json block */}
<div className="bg-os-surface border border-os-border rounded-xl p-6 font-mono text-sm w-full">
  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-os-border">
    <Terminal className="w-4 h-4 text-os-primary" />
    <span className="text-[12px] text-os-text-muted">~/ebenzotoo/contact.json</span>
  </div>
  <div className="text-os-text-main space-y-3">
    <p><span className="text-os-primary">const</span> <span className="text-os-text-main">developer</span> = {'{'}</p>
    <div className="pl-6 space-y-3">
      <p className="flex items-center gap-3">
        <span className="text-os-text-muted">status:</span>
        <span className={`flex items-center gap-2 ${config.available ? "text-os-primary" : "text-yellow-400"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.available ? "bg-os-primary animate-pulse" : "bg-yellow-400"}`} />
          &quot;{config.availability_status}&quot;,
        </span>
      </p>
      <p className="flex items-center gap-3">
        <span className="text-os-text-muted flex items-center gap-2"><Mail className="w-3.5 h-3.5"/> email:</span>
        <span className="text-os-gold">&quot;{config.email}&quot;,</span>
      </p>
      <p className="flex items-center gap-3">
        <span className="text-os-text-muted flex items-center gap-2"><Phone className="w-3.5 h-3.5"/> phone:</span>
        <span className="text-os-gold">&quot;{config.phone}&quot;,</span>
      </p>
      <p className="flex items-start gap-3">
        <span className="text-os-text-muted flex items-center gap-2 mt-0.5"><MapPin className="w-3.5 h-3.5"/> location:</span>
        <span className="text-os-gold">&quot;{config.location}&quot;</span>
      </p>
    </div>
    <p>{'};'}</p>
  </div>
</div>
```

- [ ] Update contact.json block

### Step 9.2 — Update form inputs and button

Replace OS form input classes:
- Input: `bg-os-surface border border-os-border rounded-lg px-4 py-3 text-[14px] text-os-text-main placeholder:text-os-text-muted/40 focus:outline-none focus:border-os-primary/50 focus:ring-1 focus:ring-os-primary/20 transition-colors`
- Submit: `w-full bg-os-primary hover:bg-os-primary/90 text-[#080E1A] font-semibold text-[14px] py-3 rounded-lg disabled:opacity-50 transition-colors flex items-center justify-center gap-2`

- [ ] Update form inputs and submit button

### Step 9.3 — Visual check

Open `http://localhost:3000/contact`. Verify:
- `const` keyword is teal, string values are gold, property names are muted
- Form inputs have teal focus ring
- Submit button is teal filled with dark text

- [ ] Visual check passes

### Step 9.4 — Commit

```bash
git add app/contact/ContactClient.tsx
git commit -m "feat: update contact page terminal block and form with new tokens"
```

- [ ] Committed

---

## Task 10: Systems + Lab Pages

**Files:**
- Modify: `app/systems/page.tsx`
- Modify: `app/lab/page.tsx`

### Step 10.1 — Token sweep on systems page

In `app/systems/page.tsx`, replace all occurrences of:
- `bg-white/[0.03]` → `bg-os-surface`
- `bg-white/[0.02]` → `bg-os-surface`
- `border-white/5` → `border-os-border`
- `border-white/10` → `border-os-border`
- `text-white` (standalone) → `text-os-text-main`
- `font-mono` on labels → keep, but update colors
- `text-os-accent-green` → `text-os-primary`
- `text-os-accent-blue` → `text-os-secondary`
- `hover:border-[#D4AF37]` → `hover:border-os-primary/35`
- `bg-[#0A0F1C]/90` → `bg-os-bg/90`

- [ ] Apply token sweep to `app/systems/page.tsx`

### Step 10.2 — Token sweep on lab page

Apply the same replacement list from Step 10.1 to `app/lab/page.tsx`.

- [ ] Apply token sweep to `app/lab/page.tsx`

### Step 10.3 — Visual check

Open `/systems` and `/lab`. Verify no visual regressions — layout unchanged, colors updated to teal/blue.

- [ ] Visual check passes

### Step 10.4 — Commit

```bash
git add app/systems/page.tsx app/lab/page.tsx
git commit -m "feat: apply token updates to systems and lab pages"
```

- [ ] Committed

---

## Task 11: Final Polish + MobileDock

**Files:**
- Modify: `components/MobileDock.tsx`

### Step 11.1 — Update MobileDock tokens

In `components/MobileDock.tsx`, replace:
- `bg-[#0A0F1C]` → `bg-os-bg`
- `border-white/10` → `border-os-border`
- `text-os-accent-green` → `text-os-primary`
- Active state colors → `text-os-primary`
- Inactive → `text-os-text-muted`

- [ ] Update `components/MobileDock.tsx`

### Step 11.2 — Final full-site visual check

Navigate through all pages at `http://localhost:3000`:
- `/` — Home
- `/projects` — Projects list + click into a project
- `/notes` — Notes list + click into a note
- `/about` — About
- `/contact` — Contact, check terminal block and form
- `/systems` — Systems
- `/lab` — Lab

Verify:
- Outfit font renders on all pages
- No orange `#F9A41E` visible anywhere (old misnamed green)
- Teal `#0BCEAF` is the consistent active/accent color
- No hardcoded `bg-[#0A0F1C]`, `border-white/5` etc. remaining in OS sections
- SystemDock two-row layout renders correctly

- [ ] Full-site visual check passes

### Step 11.3 — Final commit

```bash
git add components/MobileDock.tsx
git commit -m "feat: update MobileDock tokens — OS dark redesign complete"
```

- [ ] Committed

---

## Spec Coverage Check

| Spec Section | Tasks Covering It |
|---|---|
| Color tokens (`#080E1A`, `#0BCEAF`, `#3A86FF` etc.) | Task 1 |
| Outfit font (replace Syne + Space Grotesk) | Task 1 |
| 8px spacing grid | Applied in Tasks 2–10 via padding/gap values |
| Sidebar teal active states + clean bottom strip | Task 2 |
| SystemDock two-row layout, teal CTA | Task 3 |
| ProjectCard image block, teal tags, hover glow | Task 4 |
| Home: stats row (no card containers) | Task 5.4 |
| Home: bio terminal block teal header | Task 5.5 |
| Home: `//` teal section labels | Task 5.6–5.8 |
| Home: experience teal ring dots | Task 5.8 |
| Home: client logos at 70% opacity | Task 5.7 |
| Projects: hero image + gallery + teal buttons | Task 7 |
| Notes: NoteCard redesign + colored tag badges | Task 8.1 |
| Notes detail: 680px reading width, 1.75 line-height | Task 8.2 |
| Contact: teal/blue/gold contact.json colors | Task 9.1 |
| Contact: teal focus ring on inputs | Task 9.2 |
| Systems + Lab: token-only updates | Task 10 |
| Ghost watermarks: opacity 0.02, Outfit 800 | Tasks 5.2, 6.1 |
| No decorative gradient sweeps | ProjectCard Task 4 removes old gradient |
