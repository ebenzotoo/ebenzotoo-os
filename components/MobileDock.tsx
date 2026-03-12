"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, FolderClosed, Share2, FileText, FlaskConical, Mail } from "lucide-react";

// The same navigation items as our Sidebar
const navItems = [
  { name: "About", path: "/", icon: User },
  { name: "Projects", path: "/projects", icon: FolderClosed },
  { name: "Systems", path: "/systems", icon: Share2 },
  { name: "Notes", path: "/notes", icon: FileText },
  { name: "Lab", path: "/lab", icon: FlaskConical },
  { name: "Contact", path: "/contact", icon: Mail },
];

export default function MobileDock() {
  const pathname = usePathname();

  return (
    // fixed to the bottom, hidden on medium (md) screens and larger, glassy blur effect
    <div className="fixed bottom-0 left-0 w-full h-16 bg-os-panel/90 backdrop-blur-lg border-t border-os-border md:hidden z-50 px-2 pb-safe flex justify-between items-center">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.path}
            className="relative flex flex-col items-center justify-center gap-0.5 w-12 h-12"
          >
            {/* Active Indicator (Dot above icon) */}
            {isActive && (
              <span className="absolute top-0.5 w-1 h-1 bg-os-accent-green rounded-full" />
            )}

            <Icon
              className={`w-5 h-5 transition-all duration-200 ${
                isActive ? "text-os-accent-green" : "text-os-text-muted"
              }`}
            />
            <span className={`text-[9px] tracking-wide transition-colors ${
              isActive ? "text-os-accent-green" : "text-os-text-muted"
            }`}>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}