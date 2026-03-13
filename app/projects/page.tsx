import Sidebar from "../../components/Sidebar";
import MobileDock from "../../components/MobileDock";
import SystemDock from "../../components/SystemDock";
import PageTransition from "../../components/PageTransition";
import Link from "next/link";
import { getSupabase } from "../../lib/supabase";
import LiveClock from "@/components/LiveClock";
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

export default async function Projects() {
  const { data: projects, error } = await getSupabase()
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching projects:", error);

  return (
    <div className="relative h-screen overflow-hidden flex flex-col w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#0A0F1C] to-[#050810]">

      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.07)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="w-full max-w-[1440px] mx-auto flex-1 overflow-hidden flex border-t border-white/10 bg-[#0A0F1C]/40 backdrop-blur-2xl z-10 shadow-2xl">

        <Sidebar />

        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
          <PageTransition>
            <div className="border-b border-white/5 flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-md z-20">
              <span>🔔</span>
              <span>☁️</span>
              <LiveClock />
            </div>

            <div className="p-6 md:p-10 relative overflow-hidden">

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
                          src={project.image_url ?? "/project1.png"}
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
      </div>

      <SystemDock />
      <MobileDock />
    </div>
  );
}
