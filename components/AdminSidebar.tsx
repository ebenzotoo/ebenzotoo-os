"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "⬡" },
  { label: "Projects", href: "/admin/projects", icon: "◈" },
  { label: "Notes", href: "/admin/notes", icon: "◎" },
  { label: "Messages", href: "/admin/messages", icon: "◻" },
  { label: "Config", href: "/admin/config", icon: "⚙" },
];

export default function AdminSidebar({
  logout,
}: {
  logout: () => Promise<void>;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col border-r border-white/10 bg-[#0A0F1C]/60 backdrop-blur-xl">
      <div className="px-5 py-5 border-b border-white/10">
        <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-0.5">
          system
        </p>
        <p className="text-sm font-semibold text-white/90">Admin Panel</p>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[#D4AF37]/15 text-[#D4AF37]"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
          >
            <span className="text-base leading-none">⏻</span>
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
