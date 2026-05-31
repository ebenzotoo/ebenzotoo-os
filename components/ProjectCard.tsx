"use client";

import { Code2, Globe, Smartphone, Database, LayoutTemplate, Palette, Terminal, AppWindow, ExternalLink, Github } from "lucide-react";
import { JSX } from "react/jsx-dev-runtime";

interface ProjectCardProps {
  title: string;
  description: string;
  updatedAt: string;
  techStack?: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  status?: "live" | "wip";
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

export default function ProjectCard({ title, description, updatedAt, techStack = [], imageUrl, liveUrl, githubUrl, status }: ProjectCardProps) {
  return (
    <div className="glass-card group flex flex-col rounded-[14px] overflow-hidden cursor-pointer">

      {/* Cover image */}
      <div className="relative h-36 w-full overflow-hidden bg-os-surface-2">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-os-primary/10 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent" />
        {status && (
          <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide
            ${status === "live"
              ? "bg-os-primary/15 border border-os-primary/30 text-os-primary"
              : "bg-white/10 border border-white/15 text-os-text-muted"
            }`}>
            {status}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="text-[15px] font-semibold text-os-text-main leading-snug">
          {title}
        </h3>
        <p className="text-[13px] text-os-text-muted leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tech tags */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span key={tech} className="flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-os-primary/10 border border-os-primary/25 text-os-primary-light text-[10px] font-semibold">
                {techIconMap[tech] ?? <Code2 className="w-3 h-3" />}
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-[11px] text-os-text-muted">{updatedAt}</span>
          <div className="flex items-center gap-2">
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/[0.04] border border-white/[0.08] hover:border-os-primary/40 hover:text-os-primary text-os-text-muted transition-colors duration-150"
                onClick={(e) => e.stopPropagation()}>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/[0.04] border border-white/[0.08] hover:border-os-primary/40 hover:text-os-primary text-os-text-muted transition-colors duration-150"
                onClick={(e) => e.stopPropagation()}>
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
