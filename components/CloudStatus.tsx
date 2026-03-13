"use client";

import { Cloud } from "lucide-react";

export default function CloudStatus() {
  return (
    <div className="flex items-center gap-1.5 text-os-text-muted" title="Cloud sync active">
      <Cloud className="w-4 h-4" />
      <span className="text-[10px] font-mono tracking-widest hidden lg:inline text-[#F9A41E]/70">
        SYNCED
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#F9A41E]/60 animate-pulse" />
    </div>
  );
}
