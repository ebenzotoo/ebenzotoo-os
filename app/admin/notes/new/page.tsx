import { upsertNote } from "../../actions";
import NoteForm from "../../_components/NoteForm";

export default function NewNotePage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-1">
          notes
        </p>
        <h1 className="text-2xl font-bold text-white/90">New Note</h1>
      </div>
      <NoteForm action={upsertNote} />
    </div>
  );
}
