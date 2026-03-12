"use client";

import { Folder, Smartphone, Globe, Palette, Terminal, Database, LayoutTemplate, Code2, AppWindow } from "lucide-react";
import { JSX } from "react/jsx-dev-runtime";

interface ProjectCardProps {
  title: string;
  description: string;
  updatedAt: string;
  techStack?: string[]; // We added the tech stack array here
}

// This dictionary maps your database strings to specific icons
const techIconMap: Record<string, JSX.Element> = {
  "Flutter": <Smartphone className="w-3.5 h-3.5" />,
  "Mobile App Dev": <AppWindow className="w-3.5 h-3.5" />,
  "Web Development": <Globe className="w-3.5 h-3.5" />,
  "UI/UX Design": <Palette className="w-3.5 h-3.5" />,
  "Python": <Terminal className="w-3.5 h-3.5" />,
  "Database Management": <Database className="w-3.5 h-3.5" />,
  "WordPress": <LayoutTemplate className="w-3.5 h-3.5" />,
};

export default function ProjectCard({ title, description, updatedAt, techStack = [] }: ProjectCardProps) {
  return (
    <div className="group relative flex items-center justify-between p-5 rounded-xl bg-[#111827]/60 border border-white/5 hover:border-os-accent-blue/50 hover:bg-[#111827]/80 transition-all duration-300 cursor-pointer overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-r from-os-accent-blue/0 via-os-accent-blue/5 to-os-accent-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Left Side: Folder Icon + Text */}
      <div className="flex items-start gap-4 z-10 w-2/3">
        <div className="mt-1">
          <Folder className="w-5 h-5 text-os-accent-blue" fill="currentColor" fillOpacity={0.2} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-white group-hover:text-os-accent-blue transition-colors truncate">
            {title}
          </h3>
          <p className="text-xs text-os-text-muted line-clamp-1">
            {description}
          </p>
        </div>
      </div>

      {/* Right Side: Metadata + Dynamic Stack Icons */}
      <div className="flex items-center gap-6 z-10">
        <span className="text-[11px] text-os-text-muted hidden sm:block whitespace-nowrap">
          {updatedAt}
        </span>
        
        {/* We map through the database array and render the matching icons */}
        <div className="flex items-center gap-2.5 text-os-text-muted">
          {techStack.map((tech, index) => (
            <div 
              key={index} 
              title={tech} // Shows the name when you hover over the icon!
              className="hover:text-white transition-colors"
            >
              {techIconMap[tech] || <Code2 className="w-3.5 h-3.5" />} 
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}