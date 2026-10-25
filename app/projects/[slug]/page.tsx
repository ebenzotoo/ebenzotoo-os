import { notFound } from "next/navigation";
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";
import { getSupabase } from "@/lib/supabase";
import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const projectImageMap: Record<string, string> = {
  "naspa-skills-hub":              "/projects/skillshub.png",
  "ani-surgical":                  "/projects/ani-medical.png",
  "ani-surgical-medical-consult":  "/projects/ani-medical.png",
  "ani-medical-consult":           "/projects/ani-medical.png",
  "aurateq":                       "/projects/aurateq.png",
  "aurateq-consult":               "/projects/aurateq.png",
  "empower-communities-ghana":     "/projects/empower.png",
  "empower-communities":           "/projects/empower.png",
  "gaim-church-app":               "/projects/gaim.png",
  "gaim":                          "/projects/gaim.png",
  "kwahu-asabi-royal-foundation":  "/projects/kwahu-asabi.png",
  "karf":                          "/projects/kwahu-asabi.png",
  "kwahu-asabi-foundation":        "/projects/kwahu-asabi.png",
  "naspa-ghana":                   "/projects/naspa1.png",
  "naspa":                         "/projects/naspa1.png",
  "nss-internal-portal":           "/projects/nss-portal.png",
  "nss-contributor-portal":        "/projects/nss-portal.png",
  "nss-revenue-portal":            "/projects/nss-portal.png",
  "nss-ghana-portal":              "/projects/nss-portal.png",
  "nss-restaurant-app":            "/projects/nss-restaurant.png",
  "nss-restaurant":                "/projects/nss-restaurant.png",
};

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: project, error } = await getSupabase()
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !project) notFound();

  const previewImage = project.image_url ?? projectImageMap[slug] ?? "/project1.png";

  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.05 — SELECTED WORK" sheet="05/06" />

        <div className="p-6 md:p-10 max-w-4xl w-full">
          <Link href="/projects" className="flex items-center gap-1.5 text-[14px] text-bp-text-muted hover:text-bp-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Work
          </Link>

          {previewImage && (
            <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-8 border border-bp-border">
              <img src={previewImage} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bp-bg/80 via-transparent to-transparent" />
            </div>
          )}

          <h1 className="text-[28px] font-bold text-bp-text-main mb-3 font-heading">{project.title}</h1>
          <div className="flex items-center gap-2 text-sm font-mono text-bp-text-muted mb-6">
            <Calendar className="w-4 h-4" />
            {new Date(project.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            <span className="ml-2 px-2 py-0.5 rounded bg-bp-surface border border-bp-border text-bp-text-main">STATUS: SHIPPED</span>
          </div>

          {project.content && (
            <p className="text-[17px] text-bp-text-muted leading-relaxed mb-6">{project.content}</p>
          )}

          {project.tech_stack?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech_stack.map((tech: string) => (
                <span key={tech} className="px-3.5 py-2 rounded-lg bg-bp-primary/8 text-bp-primary text-[13px] font-mono border border-bp-primary/15">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="rounded-xl overflow-hidden border border-bp-border mb-10">
            <div className="flex items-center gap-2 px-4 py-3 bg-bp-surface border-b border-bp-border">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-[13px] font-mono text-bp-text-muted tracking-wide flex-1 text-center truncate">
                {project.live_url ?? project.title}
              </span>
            </div>
            <div className="bg-bp-bg max-h-[460px] overflow-hidden">
              <img src={previewImage} alt={`${project.title} preview`} className="w-full object-cover object-top" />
            </div>
          </div>

          {project.images?.length > 0 && (
            <div className="mb-10">
              <h2 className="fig-label">GALLERY</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((img: string, i: number) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-bp-border aspect-video">
                    <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.description && (
            <div className="sheet-card p-7 md:p-9">
              <h2 className="fig-label">README.MD</h2>
              <div className="text-bp-text-main leading-relaxed whitespace-pre-wrap text-base">{project.description}</div>
            </div>
          )}

          <div className="flex items-center gap-4 mt-8">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-bp-primary hover:bg-bp-primary/90 text-black text-[15px] font-bold font-mono rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4" /> Live Site
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/[0.04] border border-bp-border hover:border-bp-primary/40 text-bp-text-muted hover:text-bp-primary text-[15px] font-mono rounded-lg transition-colors">
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
          </div>
        </div>
      </PageTransition>
    </main>
  );
}
