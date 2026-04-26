"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, X, CheckCircle2, Zap, Database, FileText, Folder } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

type NotifType = "project" | "note" | "role" | "db" | "zap" | "check";

const TYPE_CONFIG: Record<NotifType, { icon: React.ComponentType<{ className?: string }>, color: string }> = {
  project: { icon: Folder,       color: "text-[#D4AF37]" },
  note:    { icon: FileText,     color: "text-os-secondary" },
  role:    { icon: CheckCircle2, color: "text-[#F9A41E]" },
  db:      { icon: Database,     color: "text-[#F9A41E]" },
  zap:     { icon: Zap,          color: "text-os-secondary" },
  check:   { icon: CheckCircle2, color: "text-[#F9A41E]" },
};

type Notification = {
  id: string;
  title: string;
  body: string;
  type: NotifType;
  time_label: string;
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getSupabase()
      .from("notifications")
      .select("id, title, body, type, time_label")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) setNotifications(data as Notification[]);
      });
  }, []);

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
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-[#F9A41E] ring-1 ring-os-bg" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-8 w-72 bg-os-bg border border-os-border rounded-xl shadow-2xl shadow-black/60 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-os-border">
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
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-[10px] font-mono text-os-text-muted tracking-wider">NO_NOTIFICATIONS</p>
              </div>
            ) : (
              notifications.map((n) => {
                const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.check;
                const Icon = cfg.icon;
                return (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-os-surface transition-colors"
                  >
                    <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${cfg.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-mono text-os-text-muted tracking-wider">{n.title}</p>
                      <p className="text-xs text-white mt-0.5 font-sans truncate">{n.body}</p>
                    </div>
                    <span className="text-[10px] font-mono text-os-text-muted shrink-0 mt-0.5">{n.time_label}</span>
                  </div>
                );
              })
            )}
          </div>

          <div className="px-4 py-3 border-t border-os-border">
            <p className="text-[10px] font-mono text-os-text-muted text-center tracking-wider">
              ALL_SYSTEMS_NOMINAL
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
