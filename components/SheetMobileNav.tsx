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
