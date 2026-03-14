import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();

  const [{ count: projectCount }, { count: noteCount }, { count: messageCount }] =
    await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("notes").select("*", { count: "exact", head: true }),
      supabase.from("messages").select("*", { count: "exact", head: true }),
    ]);

  const { count: unreadCount } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("read", false);

  const stats = [
    { label: "Projects", value: projectCount ?? 0, href: "/admin/projects", icon: "◈" },
    { label: "Notes", value: noteCount ?? 0, href: "/admin/notes", icon: "◎" },
    { label: "Messages", value: messageCount ?? 0, sub: unreadCount ? `${unreadCount} unread` : null, href: "/admin/messages", icon: "◻" },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-1">
          overview
        </p>
        <h1 className="text-2xl font-bold text-white/90">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="group bg-[#0A0F1C]/60 border border-white/10 hover:border-[#D4AF37]/30 rounded-xl p-5 backdrop-blur-xl transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xl text-white/30 group-hover:text-[#D4AF37]/60 transition-colors">
                {s.icon}
              </span>
            </div>
            <p className="text-3xl font-bold text-white/90 mb-1">{s.value}</p>
            <p className="text-sm text-white/40">{s.label}</p>
            {s.sub && (
              <p className="text-xs text-[#D4AF37]/70 mt-1">{s.sub}</p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
