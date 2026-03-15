import { notFound } from "next/navigation";
import PageTransition from "../../../components/PageTransition";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";
import { getSupabase } from "../../../lib/supabase";
import { ArrowLeft, Calendar, Code2 } from "lucide-react";
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
            <div className="border-b border-white/5 flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-md z-20">
              <NotificationBell />
              <CloudStatus />
              <span>~/PROJECTS/{slug.toUpperCase()} <LiveClock /></span>
            </div>

            <div className="p-6 md:p-10 max-w-4xl w-full">

              {/* Back link */}
              <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-mono text-os-text-muted hover:text-white transition-colors mb-8 group">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                cd .. /projects
              </Link>

              {/* Title + date */}
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-wide">{project.title}</h1>
              <div className="flex items-center gap-2 text-xs font-mono text-os-text-muted mb-6">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(project.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                <span className="ml-2 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white">STATUS: DEPLOYED</span>
              </div>

              {project.content && (
                <p className="text-os-text-muted text-sm leading-relaxed mb-8 max-w-2xl">{project.content}</p>
              )}

              {/* Tech stack tags */}
              {project.tech_stack?.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-4 flex items-center gap-2">
                    <Code2 className="w-4 h-4" /> ARCHITECTURE_STACK
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 text-xs font-mono text-os-accent-green bg-os-accent-green/10 border border-os-accent-green/20 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* App Window Preview */}
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 mb-10">
                {/* Mac-style title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1C2333] border-b border-white/5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-3 text-[11px] font-mono text-os-text-muted tracking-wide flex-1 text-center truncate">
                    {project.live_url ?? project.title}
                  </span>
                </div>
                {/* Screenshot */}
                <div className="bg-[#0A0F1C] max-h-[460px] overflow-hidden">
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
                  <h3 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-4">SCREENSHOTS</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.images.map((img: string, i: number) => (
                      <a key={i} href={img} target="_blank" rel="noopener noreferrer"
                        className="block rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/30 transition-colors group">
                        <img
                          src={img}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full object-cover object-top max-h-56 group-hover:scale-105 transition-transform duration-500"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* README content */}
              {project.description && (
                <div className="bg-[#111827]/40 border border-white/5 rounded-xl p-6 md:p-8">
                  <h3 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-6">README.md</h3>
                  <div className="text-os-text-main leading-relaxed font-sans whitespace-pre-wrap text-sm">
                    {project.description}
                  </div>
                </div>
              )}

              {/* CTA Links */}
              <div className="flex items-center gap-4 mt-8">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-mono text-white bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-lg transition-colors">
                    LIVE_SITE ↗
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-mono text-os-text-muted hover:text-white border border-white/10 px-5 py-2.5 rounded-lg transition-colors">
                    SOURCE_CODE ↗
                  </a>
                )}
              </div>

            </div>
          </PageTransition>
    </main>
  );
}
