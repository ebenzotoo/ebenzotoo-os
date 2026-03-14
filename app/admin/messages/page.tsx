import { createSupabaseServerClient } from "@/lib/supabase-server";
import { markMessageRead, deleteMessage } from "../actions";
import DeleteButton from "../_components/DeleteButton";

export default async function AdminMessagesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-1">
          inbox
        </p>
        <h1 className="text-2xl font-bold text-white/90">Messages</h1>
      </div>

      <div className="space-y-3">
        {!messages?.length ? (
          <div className="bg-[#0A0F1C]/60 border border-white/10 rounded-xl p-12 text-center backdrop-blur-xl">
            <p className="text-white/30 text-sm">No messages yet.</p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`bg-[#0A0F1C]/60 border rounded-xl p-5 backdrop-blur-xl transition-colors ${
                m.read ? "border-white/10" : "border-[#D4AF37]/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!m.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                    )}
                    <p className="text-sm font-semibold text-white/90 truncate">
                      {m.name}
                    </p>
                    <span className="text-white/30 text-xs shrink-0">·</span>
                    <a
                      href={`mailto:${m.email}`}
                      className="text-xs text-white/40 hover:text-[#D4AF37]/70 truncate transition-colors"
                    >
                      {m.email}
                    </a>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {m.message}
                  </p>
                  <p className="text-xs text-white/25 mt-2">
                    {new Date(m.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!m.read && (
                    <form action={markMessageRead.bind(null, m.id)}>
                      <button
                        type="submit"
                        className="text-xs text-white/30 hover:text-white/60 transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/20"
                      >
                        Mark read
                      </button>
                    </form>
                  )}
                  <DeleteButton
                    action={deleteMessage.bind(null, m.id)}
                    confirm="Delete this message?"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
