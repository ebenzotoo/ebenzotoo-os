import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { deleteNote } from "../actions";
import DeleteButton from "../_components/DeleteButton";

export default async function AdminNotesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: notes } = await supabase
    .from("notes")
    .select("id, slug, title, tag, created_at, published")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-1">
            content
          </p>
          <h1 className="text-2xl font-bold text-white/90">Notes</h1>
        </div>
        <Link
          href="/admin/notes/new"
          className="bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-[#050810] text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + New Note
        </Link>
      </div>

      <div className="bg-[#0A0F1C]/60 border border-white/10 rounded-xl backdrop-blur-xl overflow-hidden">
        {!notes?.length ? (
          <p className="text-white/30 text-sm text-center py-12">
            No notes yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/30 font-medium px-5 py-3">Title</th>
                <th className="text-left text-white/30 font-medium px-5 py-3 hidden sm:table-cell">Tag</th>
                <th className="text-left text-white/30 font-medium px-5 py-3 hidden md:table-cell">Status</th>
                <th className="text-left text-white/30 font-medium px-5 py-3 hidden lg:table-cell">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {notes.map((n) => (
                <tr
                  key={n.id}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  <td className="px-5 py-3 text-white/80">{n.title}</td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    {n.tag && (
                      <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37]/70 px-2 py-0.5 rounded">
                        {n.tag}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${n.published ? "bg-emerald-500/15 text-emerald-400" : "bg-white/5 text-white/30"}`}>
                      {n.published ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-white/30 hidden lg:table-cell text-xs">
                    {new Date(n.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/notes/${n.id}/edit`}
                      className="text-[#D4AF37]/70 hover:text-[#D4AF37] text-xs mr-4 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteNote.bind(null, n.id)}
                      confirm="Delete this note?"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
