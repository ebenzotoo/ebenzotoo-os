"use client";

import { useTheme } from "./ThemeProvider";
import { Monitor, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isClean = theme === "clean";

  return (
    <button
      onClick={toggle}
      title={isClean ? "Switch to OS Mode" : "Switch to Clean Mode"}
      className="fixed bottom-20 md:bottom-6 right-4 z-[9999] flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono transition-all duration-300 shadow-lg border backdrop-blur-md
        bg-[#0D1117]/90 border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]/70 hover:bg-[#0D1117]
        data-[clean=true]:bottom-6 data-[clean=true]:bg-white data-[clean=true]:border-slate-200 data-[clean=true]:text-slate-500 data-[clean=true]:shadow-md data-[clean=true]:hover:border-slate-400 data-[clean=true]:font-sans"
      data-clean={isClean}
    >
      {isClean ? (
        <>
          <Monitor className="w-3.5 h-3.5" />
          <span>OS Mode</span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5" />
          <span>Clean</span>
        </>
      )}
    </button>
  );
}
