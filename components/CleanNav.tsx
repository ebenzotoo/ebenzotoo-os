"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About",    path: "/"          },
  { name: "Projects", path: "/projects"  },
  { name: "Systems",  path: "/systems"   },
  { name: "Notes",    path: "/notes"     },
  { name: "Lab",      path: "/lab"       },
  { name: "Contact",  path: "/contact"   },
];

export default function CleanNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-16">
        <span className="font-heading font-bold text-slate-900 text-lg tracking-tight">
          Ebenezer Zotoo
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm transition-colors duration-200 pb-0.5 ${
                pathname === item.path
                  ? "text-slate-900 font-semibold border-b-2 border-slate-900"
                  : "text-slate-500 hover:text-slate-900 border-b-2 border-transparent"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className={`py-2.5 text-sm font-sans transition-colors border-b border-slate-50 last:border-0 ${
                pathname === item.path
                  ? "text-slate-900 font-semibold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
