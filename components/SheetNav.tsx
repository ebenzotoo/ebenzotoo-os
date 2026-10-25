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
