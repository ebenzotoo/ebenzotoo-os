import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { upsertNote } from "../../../actions";
import NoteForm from "../../../_components/NoteForm";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
      <NoteForm action={upsertNote} note={note} />
    </div>
  );
}
