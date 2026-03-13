"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-16">
        <span className="font-heading font-bold text-slate-900 text-lg tracking-tight">
          Ebenezer Zotoo
        </span>
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
        {/* Mobile: show active page name */}
        <span className="md:hidden text-sm text-slate-500 font-sans">
          {navItems.find((i) => i.path === pathname)?.name ?? "Menu"}
        </span>
      </div>
    </nav>
  );
}
