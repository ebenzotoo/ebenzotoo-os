# ebenzotoo-os

Personal portfolio for **Ebenezer Zotoo** — Full-Stack Developer, Systems Architect & UI/UX Designer.

Built as an OS-inspired desktop interface with a switchable clean layout, powered by Next.js and Supabase.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + `@supabase/ssr` |
| Fonts | Syne, Space Grotesk, Fira Code |
| Forms | Web3Forms |
| Markdown | marked |
| Deployment | Vercel |

---

## Features

### Dual Theme System
The portfolio renders in two modes switchable via the theme toggle:

- **OS Mode** — desktop metaphor with a sidebar, system dock, mobile dock, and dark glassmorphic UI
- **Clean Mode** — minimal light layout with sticky top nav, clean typography, and white card surfaces

FOUC prevention is handled by an inline `<script>` in `<head>` that reads `localStorage` and sets `data-theme` on `<html>` before React hydrates. Server component pages use `.os-only` / `.clean-only` CSS classes; client pages use `useTheme()`.

### Portfolio Sections
| Route | Description |
|---|---|
| `/` | Home — hero, stats, about, skills, trusted-by, experience |
| `/projects` | Project gallery — cards with tech stack, live + GitHub links |
| `/projects/[slug]` | Full project detail page |
| `/notes` | Blog/notes listing |
| `/notes/[slug]` | Full note/article |
| `/about` | Bio, skills, experience timeline |
| `/contact` | Contact form (Web3Forms + Supabase storage) + dynamic contact info |
| `/systems` | Systems section |

### Admin Panel (`/admin`)
Protected by Supabase Auth (email/password). Middleware redirects unauthenticated users to `/admin/login`.

| Route | Description |
|---|---|
| `/admin` | Dashboard — live counts for projects, notes, messages |
| `/admin/projects` | Projects list with Live/Draft status |
| `/admin/projects/new` | Create project |
| `/admin/projects/[id]/edit` | Edit project |
| `/admin/notes` | Notes list with Live/Draft status |
| `/admin/notes/new` | Create note with markdown editor + live preview |
| `/admin/notes/[id]/edit` | Edit note |
| `/admin/messages` | Contact form inbox — mark read, delete |
| `/admin/config` | Site configuration — availability status, email, phone, location |

The admin panel is always dark and immune to clean mode CSS overrides via `data-admin` attribute.

---

## Project Structure

```
app/
├── admin/              # Protected admin panel
│   ├── _components/    # DeleteButton, ProjectForm, NoteForm
│   ├── config/         # Site config editor
│   ├── login/          # Auth pages + server actions
│   ├── messages/       # Contact inbox
│   ├── notes/          # Notes CRUD
│   ├── projects/       # Projects CRUD
│   ├── actions.ts      # Shared server actions (CRUD + config)
│   ├── layout.tsx      # Admin shell with sidebar
│   └── page.tsx        # Dashboard
├── contact/
│   ├── page.tsx        # Server component — fetches system_config
│   └── ContactClient.tsx # Client component — form + useTheme
├── notes/              # Public notes pages
├── projects/           # Public project pages
├── layout.tsx          # Root layout with FOUC script
└── globals.css         # Global styles + clean mode overrides

components/
├── OSShell.tsx         # Theme router — OS chrome vs clean layout vs admin bypass
├── AdminSidebar.tsx    # Admin nav sidebar (client)
├── Sidebar.tsx         # OS mode sidebar (client)
├── ThemeProvider.tsx   # React context for theme state
├── CleanNav.tsx        # Clean mode top nav
├── SystemDock.tsx      # OS taskbar (desktop)
├── MobileDock.tsx      # OS dock (mobile)
└── ...

lib/
├── supabase.ts         # Public anon client (lazy singleton)
└── supabase-server.ts  # Server-side client using @supabase/ssr + cookies

middleware.ts           # Route protection for /admin/*
```

---

## Supabase Schema

```sql
-- Projects
create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  content text,
  image_url text,
  live_url text,
  github_url text,
  tech_stack text[],
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Notes / Blog
create table notes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  tag text,
  read_time text,
  cover_image text,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Contact form submissions
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Site-wide configuration (single row, id = 1)
create table system_config (
  id integer primary key default 1,
  availability_status text not null default 'Available for freelance work',
  available boolean not null default true,
  email text not null,
  phone text not null,
  location text not null,
  updated_at timestamptz not null default now()
);
```

### RLS Policies
- `projects` / `notes` — anon SELECT, authenticated full write
- `messages` — anon INSERT, authenticated SELECT / UPDATE / DELETE
- `system_config` — anon SELECT, authenticated UPDATE

---

## Local Development

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_WEB3FORMS_KEY

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin) — requires a Supabase Auth user (create one in Supabase Dashboard → Authentication → Users).

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_WEB3FORMS_KEY=
```

---

## Deployment

Deployed on Vercel. Add the environment variables in the Vercel project settings. The Supabase client is initialized lazily to prevent build-time crashes when env vars are absent.
