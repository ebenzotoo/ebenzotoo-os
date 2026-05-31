import PageTransition from "../../components/PageTransition";
import Link from "next/link";
import { getSupabase } from "../../lib/supabase";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";
import { ArrowUpRight } from "lucide-react";

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

export default async function Projects() {
  const { data: projects, error } = await getSupabase()
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching projects:", error);

  return (
    <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
      <PageTransition>

        {/* ========== OS VERSION ========== */}
        <div className="os-only">
          <div className="border-b border-os-border flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-os-bg/90 backdrop-blur-md z-20">
            <NotificationBell />
            <CloudStatus />
            <LiveClock />
          </div>

          <div className="p-6 md:p-10 relative">
            {/* Ghost watermark */}
            <div className="absolute top-4 right-0 text-[90px] font-heading font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">
              PROJECTS
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted uppercase">
                <span className="text-os-primary">//</span> Projects
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-os-text-muted px-3 py-1.5 bg-os-surface-2 border border-white/[0.08] rounded-md">
                  {projects?.length ?? 0} total
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-os-primary px-3 py-1.5 border border-os-primary/30 rounded-md bg-os-primary/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-os-primary animate-pulse" />
                  All active
                </span>
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {projects?.map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.id} className="block group">
                  <div className="bg-os-surface border border-white/[0.08] rounded-2xl overflow-hidden hover:border-os-primary/40 transition-all duration-300 group-hover:shadow-[0_8px_32px_rgba(249,115,22,0.07)] group-hover:-translate-y-1">
                    <div className="p-5 pb-4">
                      <h3 className="text-[15px] font-semibold text-white mb-2 group-hover:text-os-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-os-text-muted line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="mx-4 mb-4 rounded-xl overflow-hidden h-44 border border-white/[0.08] relative">
                      <img
                        src={project.image_url ?? projectImageMap[project.slug] ?? "/project1.png"}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <span className="text-[11px] font-mono tracking-widest text-white/0 group-hover:text-white/80 transition-all duration-300">
                          OPEN_PROJECT ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ========== CLEAN VERSION ========== */}
        <div className="clean-only">
          <div className="py-14 px-6">
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-xs tracking-[0.15em] text-slate-400 mb-3">// my_work</p>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mb-2">Selected Work</h1>
              <p className="text-slate-500 text-sm leading-relaxed">
                Each project represents a real-world problem solved through design, technology, and strategic thinking. These are not just designs — they are systems built to improve usability, efficiency, and impact.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {projects?.map((project) => (
                <Link
                  href={`/projects/${project.slug}`}
                  key={project.id}
                  className="group block bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image_url ?? projectImageMap[project.slug] ?? "/project1.png"}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-900 text-base mb-1.5 group-hover:text-blue-600 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0 mt-0.5" />
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </PageTransition>
    </main>
  );
}
