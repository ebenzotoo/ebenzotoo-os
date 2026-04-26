"use client";

import { useTheme } from "./ThemeProvider";
import Sidebar from "./Sidebar";
import SystemDock from "./SystemDock";
import MobileDock from "./MobileDock";
import CleanNav from "./CleanNav";
import { usePathname } from "next/navigation";

export default function OSShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  if (theme === "clean") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
        <CleanNav />
        <div className="max-w-[1100px] mx-auto">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden flex flex-col w-full">
      {/* Background image */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      {/* Dark overlay to keep OS feel */}
      <div className="absolute inset-0 bg-[#050810]/70 z-0" />
      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.07)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      <div className="w-full max-w-[1440px] mx-auto flex-1 overflow-hidden flex border-t border-os-border bg-os-bg/30 backdrop-blur-2xl z-10 shadow-2xl">
        <Sidebar />
        {children}
      </div>
      <SystemDock />
      <MobileDock />
    </div>
  );
}
