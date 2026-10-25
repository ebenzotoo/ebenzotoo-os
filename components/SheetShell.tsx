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
