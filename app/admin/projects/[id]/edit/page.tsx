import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { upsertProject } from "../../../actions";
import ProjectForm from "../../../_components/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) notFound();

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-1">
          projects
        </p>
        <h1 className="text-2xl font-bold text-white/90">Edit Project</h1>
      </div>
      <ProjectForm action={upsertProject} project={project} />
    </div>
  );
}
