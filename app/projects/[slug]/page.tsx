import { notFound } from "next/navigation";
import PageTransition from "../../../components/PageTransition";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";
import { getSupabase } from "../../../lib/supabase";
import { ArrowLeft, Calendar } from "lucide-react";
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
        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
          <PageTransition>

            {/* Top Bar */}
            <div className="border-b border-os-border flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-os-bg/90 backdrop-blur-md z-20">
              <NotificationBell />
              <CloudStatus />
              <span>~/PROJECTS/{slug.toUpperCase()} <LiveClock /></span>
            </div>

            <div className="p-6 md:p-10 max-w-4xl w-full">

              {/* Back link */}
              <Link href="/projects" className="flex items-center gap-1.5 text-[12px] text-os-text-muted hover:text-os-primary transition-colors mb-6">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
              </Link>

              {/* Hero image */}
              {previewImage && (
                <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-8 border border-os-border">
                  <img src={previewImage} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-os-bg/80 via-transparent to-transparent" />
                </div>
              )}

              {/* Title + date */}
              <h1 className="text-[24px] font-bold text-os-text-main mb-3">{project.title}</h1>
              <div className="flex items-center gap-2 text-xs font-mono text-os-text-muted mb-6">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(project.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                <span className="ml-2 px-2 py-0.5 rounded bg-os-surface border border-os-border text-os-text-main">STATUS: DEPLOYED</span>
              </div>

              {project.content && (
                <p className="text-[15px] text-os-text-muted leading-relaxed mb-6">{project.content}</p>
              )}

              {/* Tech stack tags */}
              {project.tech_stack?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech_stack.map((tech: string) => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-os-primary/8 text-os-primary text-[11px] font-medium border border-os-primary/15">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* App Window Preview */}
              <div className="rounded-xl overflow-hidden border border-os-border shadow-2xl shadow-black/60 mb-10">
                {/* Mac-style title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-os-surface border-b border-os-border">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-3 text-[11px] font-mono text-os-text-muted tracking-wide flex-1 text-center truncate">
                    {project.live_url ?? project.title}
                  </span>
                </div>
                {/* Screenshot */}
                <div className="bg-os-bg max-h-[460px] overflow-hidden">
                  <img
                    src={previewImage}
                    alt={`${project.title} preview`}
                    className="w-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Gallery screenshots */}
              {project.images?.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-4 uppercase">
                    <span className="text-os-primary">//</span> Gallery
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.images.map((img: string, i: number) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-os-border aspect-video">
                        <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* README content */}
              {project.description && (
                <div className="bg-os-surface border border-os-border rounded-xl p-6 md:p-8">
                  <h3 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-6 uppercase">
                    <span className="text-os-primary">//</span> README.md
                  </h3>
                  <div className="text-os-text-main leading-relaxed font-sans whitespace-pre-wrap text-sm">
                    {project.description}
                  </div>
                </div>
              )}

              {/* CTA Links */}
              <div className="flex items-center gap-4 mt-8">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-os-primary text-[#080E1A] text-[13px] font-semibold rounded-lg hover:bg-os-primary/90 transition-colors">
                    View Live ↗
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-os-border text-os-text-muted text-[13px] font-medium rounded-lg hover:border-os-border-hover hover:text-os-text-main transition-colors">
                    GitHub
                  </a>
                )}
              </div>

            </div>
          </PageTransition>
    </main>
  );
}
