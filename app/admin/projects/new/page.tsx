import { upsertProject } from "../../actions";
import ProjectForm from "../../_components/ProjectForm";

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-1">
          projects
        </p>
        <h1 className="text-2xl font-bold text-white/90">New Project</h1>
      </div>
      {error && (
        <div className="mb-6 max-w-2xl bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
          <strong>Save failed:</strong> {decodeURIComponent(error)}
        </div>
      )}
      <ProjectForm action={upsertProject} />
    </div>
  );
}
