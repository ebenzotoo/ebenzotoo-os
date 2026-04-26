"use client";

import { Code2, Globe, Smartphone, Database, LayoutTemplate, Palette, Terminal, AppWindow } from "lucide-react";
import { JSX } from "react/jsx-dev-runtime";

interface ProjectCardProps {
  title: string;
  description: string;
  updatedAt: string;
  techStack?: string[];
  imageUrl?: string;
}

const techIconMap: Record<string, JSX.Element> = {
  "Flutter":             <Smartphone className="w-3 h-3" />,
  "Mobile App Dev":      <AppWindow className="w-3 h-3" />,
  "Web Development":     <Globe className="w-3 h-3" />,
  "UI/UX Design":        <Palette className="w-3 h-3" />,
  "Python":              <Terminal className="w-3 h-3" />,
  "Database Management": <Database className="w-3 h-3" />,
  "WordPress":           <LayoutTemplate className="w-3 h-3" />,
};

export default function ProjectCard({ title, description, updatedAt, techStack = [], imageUrl }: ProjectCardProps) {
  return (
    <div className="group flex flex-col rounded-xl bg-os-surface border border-os-border hover:border-os-primary/35 hover:shadow-[0_8px_32px_rgba(11,206,175,0.07)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer">

      {/* Cover image */}
      {imageUrl && (
        <div className="relative h-40 w-full overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-os-surface via-transparent to-transparent" />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <h3 className="text-[15px] font-semibold text-os-text-main group-hover:text-os-primary transition-colors duration-150 leading-snug">
          {title}
        </h3>
        <p className="text-[13px] text-os-text-muted leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tech tags */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {techStack.map((tech) => (
              <span key={tech} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-os-primary/8 text-os-primary text-[10px] font-medium">
                {techIconMap[tech] ?? <Code2 className="w-3 h-3" />}
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-os-border flex items-center justify-between">
          <span className="text-[11px] text-os-text-muted font-medium">{updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
