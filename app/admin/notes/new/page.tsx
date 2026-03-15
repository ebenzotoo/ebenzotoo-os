import { upsertNote } from "../../actions";
import NoteForm from "../../_components/NoteForm";

export default async function NewNotePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-1">
          notes
        </p>
        <h1 className="text-2xl font-bold text-white/90">New Note</h1>
      </div>
      {error && (
        <div className="mb-6 max-w-2xl bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
          <strong>Save failed:</strong> {decodeURIComponent(error)}
        </div>
      )}
      <NoteForm action={upsertNote} />
    </div>
  );
}
