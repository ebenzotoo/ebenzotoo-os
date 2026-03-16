import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { deleteNotification } from "@/app/admin/actions";
import DeleteButton from "@/app/admin/_components/DeleteButton";

const TYPE_LABELS: Record<string, string> = {
  project: "Project",
  note:    "Note",
  role:    "Role",
  db:      "DB",
  zap:     "Zap",
  check:   "Check",
};

export default async function AdminNotificationsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: notifications } = await supabase
    .from("notifications")
    .select("id, title, body, type, time_label, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white/90">Notifications</h1>
          <p className="text-xs text-white/30 mt-1 font-mono">
            {notifications?.length ?? 0} entries · shown in the bell dropdown
          </p>
        </div>
        <Link
          href="/admin/notifications/new"
          className="px-4 py-2 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] text-sm rounded-lg border border-[#D4AF37]/30 transition-colors"
        >
          + New
        </Link>
      </div>

      <div className="border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="text-left px-4 py-3 text-[10px] font-mono tracking-widest text-white/30">#</th>
              <th className="text-left px-4 py-3 text-[10px] font-mono tracking-widest text-white/30">TITLE</th>
              <th className="text-left px-4 py-3 text-[10px] font-mono tracking-widest text-white/30">BODY</th>
              <th className="text-left px-4 py-3 text-[10px] font-mono tracking-widest text-white/30">TYPE</th>
              <th className="text-left px-4 py-3 text-[10px] font-mono tracking-widest text-white/30">TIME</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {notifications?.map((n) => (
              <tr key={n.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-white/20 font-mono text-xs">{n.sort_order}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-mono text-white/50 tracking-wider">{n.title}</span>
                </td>
                <td className="px-4 py-3 text-white/70 max-w-xs truncate">{n.body}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/40">
                    {TYPE_LABELS[n.type] ?? n.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/40 text-xs font-mono">{n.time_label}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 justify-end">
                    <Link
                      href={`/admin/notifications/${n.id}/edit`}
                      className="text-xs text-white/40 hover:text-white/80 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteNotification.bind(null, n.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
