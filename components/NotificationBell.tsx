"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, X, CheckCircle2, Zap, Database, FileText, Folder } from "lucide-react";

const notifications = [
  {
    icon: CheckCircle2,
    color: "text-[#F9A41E]",
    title: "PROJECT_DEPLOYED",
    body: "Ghana Law Society - live in production",
    time: "Feb 2026",
  },
  {
    icon: CheckCircle2,
    color: "text-[#F9A41E]",
    title: "ROLE_UPDATE",
    body: "Senior Web & Graphics Designer · Industrial Coatings Africa",
    time: "Mar 2025",
  },
  {
    icon: Folder,
    color: "text-[#D4AF37]",
    title: "PROJECT_DEPLOYED",
    body: "NextEra Skills Hub — live in production",
    time: "Sep 2025",
  },
  {
    icon: FileText,
    color: "text-os-accent-blue",
    title: "NOTE_PUBLISHED",
    body: "The Liberating Power of Self-Honesty",
    time: "Jan 2025",
  },
  {
    icon: Folder,
    color: "text-[#D4AF37]",
    title: "PROJECT_DEPLOYED",
    body: "Aurateq Consult — brand & web platform live",
    time: "Dec 2024",
  },
  {
    icon: Database,
    color: "text-[#F9A41E]",
    title: "DB_SYNC",
    body: "Supabase · All tables synced & operational",
    time: "active",
  },
  {
    icon: Zap,
    color: "text-os-accent-blue",
    title: "NOTE_PUBLISHED",
    body: "Are We Losing the Ability to Explain Tech?",
    time: "Dec 2024",
  },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-1 text-os-text-muted hover:text-white transition-colors"
        title="Notifications"
      >
        <Bell className="w-4 h-4" />
        <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-[#F9A41E] ring-1 ring-[#0A0F1C]" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 w-72 bg-[#0D1117] border border-white/10 rounded-xl shadow-2xl shadow-black/60 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <span className="text-[10px] font-mono tracking-widest text-os-text-muted">
              SYSTEM_NOTIFICATIONS
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-os-text-muted hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
            {notifications.map((n, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors"
              >
                <n.icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${n.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono text-os-text-muted tracking-wider">{n.title}</p>
                  <p className="text-xs text-white mt-0.5 font-sans truncate">{n.body}</p>
                </div>
                <span className="text-[10px] font-mono text-os-text-muted shrink-0 mt-0.5">{n.time}</span>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-white/5">
            <p className="text-[10px] font-mono text-os-text-muted text-center tracking-wider">
              ALL_SYSTEMS_NOMINAL
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
