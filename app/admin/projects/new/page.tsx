import { upsertProject } from "../../actions";
import ProjectForm from "../../_components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-1">
          projects
        </p>
        <h1 className="text-2xl font-bold text-white/90">New Project</h1>
      </div>
      <ProjectForm action={upsertProject} />
    </div>
  );
}
