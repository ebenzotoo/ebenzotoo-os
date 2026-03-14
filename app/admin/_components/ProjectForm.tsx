"use client";

import Link from "next/link";

type Project = {
  id?: string;
  slug?: string;
  title?: string;
  description?: string;
  content?: string;
  image_url?: string;
  live_url?: string;
  github_url?: string;
  tech_stack?: string[];
  published?: boolean;
};

export default function ProjectForm({
  action,
  project,
}: {
  action: (formData: FormData) => Promise<void>;
  project?: Project;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      {project?.id && <input type="hidden" name="id" value={project.id} />}

      <Field label="Title" name="title" defaultValue={project?.title} required />
      <Field label="Slug" name="slug" defaultValue={project?.slug} required placeholder="my-project" />
      <Field label="Description" name="description" defaultValue={project?.description} textarea rows={2} />
      <Field label="Content (Markdown)" name="content" defaultValue={project?.content} textarea rows={8} />
      <Field label="Image URL" name="image_url" defaultValue={project?.image_url} placeholder="https://..." />
      <Field label="Live URL" name="live_url" defaultValue={project?.live_url} placeholder="https://..." />
      <Field label="GitHub URL" name="github_url" defaultValue={project?.github_url} placeholder="https://github.com/..." />
      <Field
        label="Tech Stack (comma-separated)"
        name="tech_stack"
        defaultValue={project?.tech_stack?.join(", ")}
        placeholder="Next.js, TypeScript, Supabase"
      />

      {/* Published toggle */}
      <div className="flex items-center gap-3 pt-1">
        <input
          type="checkbox"
          name="published"
          id="proj-published"
          defaultChecked={project?.published ?? true}
          value="true"
          className="w-4 h-4 accent-[#D4AF37] rounded"
        />
        <label htmlFor="proj-published" className="text-sm text-white/60 cursor-pointer">
          Published — visible on the portfolio
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-[#050810] text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          {project?.id ? "Save Changes" : "Create Project"}
        </button>
        <Link
          href="/admin/projects"
          className="text-white/40 hover:text-white/70 text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  textarea,
  rows,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
}) {
  const cls =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/40 transition-colors resize-none";
  return (
    <div>
      <label className="block text-xs text-white/40 mb-1.5 tracking-wide">
        {label}
        {required && <span className="text-[#D4AF37]/60 ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue} required={required} placeholder={placeholder} rows={rows ?? 4} className={cls} />
      ) : (
        <input type="text" name={name} defaultValue={defaultValue} required={required} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}
