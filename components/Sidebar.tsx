"use client"; // This tells Next.js this component uses interactive features like checking the URL path

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, FolderClosed, Share2, FileText, FlaskConical, Mail, MapPin, Link as LinkIcon } from "lucide-react";

// This is our list of pages matching your design
const navItems = [
  { name: "About", path: "/", icon: User },
  { name: "Projects", path: "/projects", icon: FolderClosed },
  { name: "Systems", path: "/systems", icon: Share2 },
  { name: "Notes", path: "/notes", icon: FileText },
  { name: "Lab", path: "/lab", icon: FlaskConical },
  { name: "Contact", path: "/contact", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[260px] h-full bg-os-panel border-r border-white/20 hidden md:flex flex-col">
      {/* Top Branding */}
      <div className="h-16 flex items-center px-6 border-b border-os-border">
        <h1 className="text-sm font-semibold tracking-widest text-os-text-muted">EBENEZER ZOTOO</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all relative group
                ${isActive 
                  ? "bg-[#1F2937] text-white" // Active background color
                  : "text-os-text-muted hover:bg-os-bg hover:text-white" // Inactive and hover colors
                }
              `}
            >
              {/* The green dot indicator for the active page */}
              {isActive && (
                <span className="absolute left-0 w-1 h-4 bg-os-accent-green rounded-r-md" />
              )}
              
              <Icon className={`w-4 h-4 ${isActive ? "text-os-accent-green" : "text-os-text-muted group-hover:text-white"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Information (Accra, Ghana & Availability) */}
      <div className="p-6 border-t border-os-border flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-os-text-muted">
          <LinkIcon className="w-3.5 h-3.5" />
          <span>ebenzotoo.com</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-os-text-muted">
          <MapPin className="w-3.5 h-3.5" />
          <span>Accra, Ghana</span>
        </div>
        
        {/* Glowing Freelance Badge */}
        <div className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 w-fit">
          <div className="w-1.5 h-1.5 rounded-full bg-os-accent-green animate-pulse" />
          <span className="text-[10px] tracking-wide text-os-accent-green">Open to collaborating on digital product and platform development projects</span>
        </div>
      </div>
    </div>
  );
}