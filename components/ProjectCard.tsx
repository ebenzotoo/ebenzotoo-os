"use client";

import { Folder, CheckCircle2, LayoutTemplate, Database } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  updatedAt: string;
}

export default function ProjectCard({ title, description, updatedAt }: ProjectCardProps) {
  return (
    <div className="group relative flex items-center justify-between p-5 rounded-xl bg-[#111827]/60 border border-white/5 hover:border-os-accent-blue/50 hover:bg-[#111827]/80 transition-all duration-300 cursor-pointer overflow-hidden">
      
      {/* Subtle hover background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-os-accent-blue/0 via-os-accent-blue/5 to-os-accent-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Left Side: Icon + Text */}
      <div className="flex items-start gap-4 z-10">
        <div className="mt-1">
          <Folder className="w-5 h-5 text-os-accent-blue" fill="currentColor" fillOpacity={0.2} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-white group-hover:text-os-accent-blue transition-colors">
            {title}
          </h3>
          <p className="text-xs text-os-text-muted">
            {description}
          </p>
        </div>
      </div>

      {/* Right Side: Metadata + Stack Icons */}
      <div className="flex items-center gap-6 z-10">
        <span className="text-[11px] text-os-text-muted hidden sm:block">
          {updatedAt}
        </span>
        
        {/* Placeholder Tech Stack Icons matching your mockup */}
        <div className="flex items-center gap-2 text-os-text-muted">
          <CheckCircle2 className="w-4 h-4" />
          <LayoutTemplate className="w-4 h-4" />
          <Database className="w-4 h-4" />
        </div>
      </div>
      
    </div>
  );
}