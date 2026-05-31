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
