"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monitor, Folder, Layers, MessageSquare, User, Mail, Linkedin, Twitter, Facebook } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/233200012873";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/ebenzotoo",    label: "LinkedIn"  },
  { icon: Twitter,  href: "https://twitter.com/st_romario1",      label: "Twitter/X" },
  { icon: Facebook, href: "https://facebook.com/ebenezerromario", label: "Facebook"  },
];

const dockItems = [
  { icon: User,          path: "/",         title: "About"    },
  { icon: Folder,        path: "/projects", title: "Projects" },
  { icon: Layers,        path: "/systems",  title: "Systems"  },
  { icon: MessageSquare, path: "/notes",    title: "Notes"    },
  { icon: Monitor,       path: "/lab",      title: "Lab"      },
  { icon: Mail,          path: "/contact",  title: "Contact"  },
];

export default function SystemDock() {
  const pathname = usePathname();

  return (
    <div className="w-full max-w-[1440px] mx-auto hidden md:flex flex-col items-center border-t border-white/[0.06] bg-[rgba(10,10,15,0.92)] backdrop-blur-md z-20 px-8 py-4 shrink-0">

      {/* Row 1: Status bar */}
      <div className="w-full flex items-center justify-between text-[11px] mb-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-os-primary animate-pulse" />
          <span className="text-os-primary font-medium">Open to collaborating</span>
        </div>

        <div className="flex items-center gap-5">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
              className="text-os-text-muted hover:text-os-primary transition-colors duration-150">
              <Icon className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/contact"
            className="px-4 py-2 border border-white/[0.08] hover:border-os-primary/40 text-os-text-muted hover:text-os-text-main rounded-lg text-[11px] font-medium transition-colors duration-150">
            Start a Project
          </Link>
          <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 bg-os-primary hover:bg-os-primary/90 text-black rounded-lg text-[11px] font-semibold transition-colors duration-150">
            Book a Consult ↗
          </Link>
        </div>
      </div>

      {/* Row 2: Icon dock */}
      <div className="flex items-center gap-8">
        {dockItems.map(({ icon: Icon, path, title }) => {
          const isActive = pathname === path;
          return (
            <Link key={path} href={path} title={title} className="flex flex-col items-center gap-1.5">
              <Icon className={`w-[18px] h-[18px] transition-colors duration-150 ${isActive ? "text-os-primary" : "text-os-text-muted hover:text-os-text-main"}`} />
              {isActive && <span className="w-1 h-1 rounded-full bg-os-primary" />}
            </Link>
          );
        })}
      </div>

    </div>
  );
}
