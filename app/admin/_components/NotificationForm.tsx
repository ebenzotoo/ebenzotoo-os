"use client";

import { use } from "react";

const TYPE_OPTIONS = [
  { value: "project", label: "Project (Folder / Gold)" },
  { value: "note",    label: "Note (FileText / Blue)" },
  { value: "role",    label: "Role (CheckCircle / Orange)" },
  { value: "db",      label: "DB (Database / Orange)" },
  { value: "zap",     label: "Zap (Zap / Blue)" },
  { value: "check",   label: "Check (CheckCircle / Orange)" },
];

type Notification = {
  id?: string;
  title?: string;
  body?: string;
  type?: string;
  time_label?: string;
  sort_order?: number;
};

export default function NotificationForm({
  action,
  notification,
  searchParams,
}: {
  action: (formData: FormData) => Promise<void>;
  notification?: Notification;
  searchParams: Promise<{ error?: string }>;
}) {
  const params = use(searchParams);
  const error = params?.error;

  const field =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/40 transition-colors";

  return (
    <form action={action} className="space-y-5">
      {notification?.id && <input type="hidden" name="id" value={notification.id} />}

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs text-white/40 mb-1.5 tracking-wide">Title (e.g. PROJECT_DEPLOYED)</label>
        <input
          name="title"
          required
          defaultValue={notification?.title ?? ""}
          placeholder="PROJECT_DEPLOYED"
          className={field}
        />
      </div>

      <div>
        <label className="block text-xs text-white/40 mb-1.5 tracking-wide">Body</label>
        <input
          name="body"
          required
          defaultValue={notification?.body ?? ""}
          placeholder="Short description shown in the dropdown"
          className={field}
        />
      </div>

      <div>
        <label className="block text-xs text-white/40 mb-1.5 tracking-wide">Type (icon + colour)</label>
        <select name="type" defaultValue={notification?.type ?? "project"} className={field}>
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#0D1117]">
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs text-white/40 mb-1.5 tracking-wide">Time Label (e.g. Feb 2026, active)</label>
        <input
          name="time_label"
          required
          defaultValue={notification?.time_label ?? ""}
          placeholder="Feb 2026"
          className={field}
        />
      </div>

      <div>
        <label className="block text-xs text-white/40 mb-1.5 tracking-wide">Sort Order (lower = top)</label>
        <input
          name="sort_order"
          type="number"
          defaultValue={notification?.sort_order ?? 0}
          className={field}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] border border-[#D4AF37]/30 text-sm font-medium py-2.5 rounded-lg transition-colors"
      >
        Save Notification
      </button>
    </form>
  );
}
