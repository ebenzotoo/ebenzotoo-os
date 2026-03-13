import PageTransition from "../../components/PageTransition";
import Link from "next/link";
import { getSupabase } from "../../lib/supabase";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";
import {
  Smartphone, Globe, Palette, Terminal, Database,
  LayoutTemplate, Code2, AppWindow, ArrowUpRight,
} from "lucide-react";

const techIconMap: Record<string, React.ReactNode> = {
  "Flutter":            <Smartphone className="w-4 h-4" />,
  "Mobile App Dev":     <AppWindow className="w-4 h-4" />,
  "Web Development":    <Globe className="w-4 h-4" />,
  "UI/UX Design":       <Palette className="w-4 h-4" />,
  "Python":             <Terminal className="w-4 h-4" />,
  "Database Management":<Database className="w-4 h-4" />,
  "WordPress":          <LayoutTemplate className="w-4 h-4" />,
};

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
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching projects:", error);

  return (
        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
          <PageTransition>
            <div className="border-b border-white/5 flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-md z-20">
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
                <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted font-sans">PROJECTS</h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-os-text-muted px-3 py-1.5 border border-white/10 rounded-md">
                    {projects?.length ?? 0} total
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-os-accent-green px-3 py-1.5 border border-os-accent-green/20 rounded-md bg-os-accent-green/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-os-accent-green animate-pulse" />
                    All active
                  </span>
                </div>
              </div>

              {/* Project Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {projects?.map((project) => (
                  <Link href={`/projects/${project.slug}`} key={project.id} className="block group">
                    <div className="bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/35 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)] group-hover:-translate-y-1">

                      {/* Card Text */}
                      <div className="p-5 pb-4">
                        <h3 className="text-[15px] font-semibold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-os-text-muted line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Card Preview */}
                      <div className="mx-4 mb-4 rounded-xl overflow-hidden h-44 border border-white/5 relative">
                        <img
                          src={project.image_url ?? projectImageMap[project.slug] ?? "/project1.png"}
                          alt={project.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Hover overlay with "open" hint */}
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
          </PageTransition>
    </main>
  );
}
