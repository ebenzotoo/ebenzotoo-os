"use client";

import { Monitor, Folder, Layers, MessageSquare, User, Mail } from "lucide-react";

export default function SystemDock() {
  return (
    <div className="w-full max-w-[1440px] flex flex-col items-center justify-center border-t border-white/10 bg-[#0A0F1C]/80 backdrop-blur-md z-20 px-6 py-4 mt-auto">
      
      {/* Top Row: Status Bar */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between text-xs text-os-text-muted mb-6 gap-4 font-sans">
        
        {/* Left: Availability */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-os-accent-green animate-pulse" />
          <span className="text-os-accent-green tracking-wide">available for freelance work</span>
        </div>
        
        {/* Center: Supabase Text (Hidden on very small phone screens to save space) */}
        <div className="hidden md:flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-os-text-muted" />
          <span className="tracking-wide">All data is synced with Supabase on a PostgreSQL database.</span>
        </div>

        {/* Right: CTA Button */}
        <button className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-white transition-colors tracking-wide">
          Get in touch
        </button>
      </div>

      {/* Bottom Row: OS Icon Dock */}
      <div className="flex items-center gap-8 text-os-text-muted">
        <Monitor className="w-[18px] h-[18px] hover:text-white cursor-pointer transition-colors" />
        <Folder className="w-[18px] h-[18px] hover:text-white cursor-pointer transition-colors" />
        <Layers className="w-[18px] h-[18px] hover:text-white cursor-pointer transition-colors" />
        <MessageSquare className="w-[18px] h-[18px] hover:text-white cursor-pointer transition-colors" />
        <User className="w-[18px] h-[18px] hover:text-white cursor-pointer transition-colors" />
        <Mail className="w-[18px] h-[18px] hover:text-white cursor-pointer transition-colors" />
      </div>
    </div>
  );
}