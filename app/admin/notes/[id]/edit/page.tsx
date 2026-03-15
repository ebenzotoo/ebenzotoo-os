import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { upsertNote } from "../../../actions";
import NoteForm from "../../../_components/NoteForm";

export default async function EditNotePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data: note } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (!note) notFound();

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-1">
          notes
        </p>
        <h1 className="text-2xl font-bold text-white/90">Edit Note</h1>
      </div>
      {error && (
        <div className="mb-6 max-w-2xl bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
          <strong>Save failed:</strong> {decodeURIComponent(error)}
        </div>
      )}
      <NoteForm action={upsertNote} note={note} />
    </div>
  );
}
