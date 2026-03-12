"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monitor, Folder, Layers, MessageSquare, User, Mail } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/233200012873";

const dockItems = [
  { icon: User,          path: "/",         title: "About"    },
  { icon: Folder,        path: "/projects", title: "Projects" },
  { icon: Layers,        path: "/systems", title: "Systems"  },
  { icon: MessageSquare, path: "/notes",   title: "Notes"    },
  { icon: Monitor,       path: "/lab",     title: "Lab"      },
  { icon: Mail,          path: "/contact", title: "Contact"  },
];

export default function SystemDock() {
  const pathname = usePathname();

  return (
    <div className="w-full max-w-[1440px] mx-auto hidden md:flex flex-col items-center justify-center border-t border-white/10 bg-[#0A0F1C]/80 backdrop-blur-md z-20 px-6 py-4 shrink-0">

      {/* Top Row: Status Bar */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between text-xs text-os-text-muted mb-6 gap-4 font-sans">

        {/* Left: Availability */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-os-accent-green animate-pulse" />
          <span className="text-os-accent-green tracking-wide">available for freelance work</span>
        </div>

        {/* Center: Supabase Info */}
        <div className="hidden md:flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-os-text-muted" />
          <span className="tracking-wide">All data is synced with Supabase on a PostgreSQL database.</span>
        </div>

        {/* Right: Dual CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-white transition-colors tracking-wide text-xs font-mono"
          >
            Start a Project
          </Link>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-os-accent-green/10 hover:bg-os-accent-green/20 border border-os-accent-green/20 rounded-md text-os-accent-green transition-colors tracking-wide text-xs font-mono"
          >
            Book a Consult ↗
          </Link>
        </div>
      </div>

      {/* Bottom Row: OS Icon Dock */}
      <div className="flex items-center gap-8">
        {dockItems.map(({ icon: Icon, path, title }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              href={path}
              title={title}
              className={`transition-colors ${isActive ? "text-white" : "text-os-text-muted hover:text-white"}`}
            >
              <Icon className="w-[18px] h-[18px]" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
