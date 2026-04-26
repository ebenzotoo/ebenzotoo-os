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
