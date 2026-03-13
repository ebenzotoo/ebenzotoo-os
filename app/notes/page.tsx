import Sidebar from "../../components/Sidebar";
import MobileDock from "../../components/MobileDock";
import SystemDock from "../../components/SystemDock";
import PageTransition from "../../components/PageTransition";
import Link from "next/link";
import { getSupabase } from "../../lib/supabase";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";

const noteImageMap: Record<string, string> = {
  "losing-ability-to-explain-tech":   "/notes/explain-tech.jpg",
  "liberating-power-of-self-honesty": "/notes/power.jpg",
};

export default async function Notes() {
  // Fetch live articles from Supabase
  const { data: notes, error } = await getSupabase()
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching notes:", error);

  return (
    <div className="relative h-screen overflow-hidden flex flex-col w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#0A0F1C] to-[#050810]">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.07)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />


<div className="w-full max-w-[1440px] mx-auto flex-1 overflow-hidden flex border-t border-white/10 bg-[#0A0F1C]/40 backdrop-blur-2xl z-10 shadow-2xl">
        
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
          <PageTransition>
            <div className="border-b border-white/5 flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-md z-20">
              <NotificationBell />
              <CloudStatus />
              <span>~/LOGS/NOTES <LiveClock /></span>
            </div>
            
            <div className="p-6 md:p-10 flex-1 w-full relative">

              {/* Ghost watermark */}
              <div className="absolute top-4 right-0 text-[100px] font-heading font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">
                NOTES
              </div>

              <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-8 font-sans">SYSTEM_NOTES</h2>
              
              <div className="flex flex-col gap-5">
                {notes?.map((article) => {
                  const cover = article.cover_image ?? article.image_url ?? noteImageMap[article.slug] ?? null;
                  return (
                    <Link href={`/notes/${article.slug}`} key={article.id} className="block group">
                      <div className="relative flex flex-col sm:flex-row gap-0 rounded-xl bg-[#111827]/40 border border-white/5 hover:border-[#D4AF37]/35 hover:bg-[#111827]/80 hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">

                        {/* Text side */}
                        <div className="flex-1 flex flex-col gap-3 p-6">
                          {/* Tag + meta */}
                          <div className="flex flex-wrap items-center gap-3">
                            {article.tag && (
                              <span className="text-[10px] font-mono tracking-widest text-[#F9A41E] px-2 py-1 rounded bg-[#F9A41E]/10 border border-[#F9A41E]/20">
                                {article.tag}
                              </span>
                            )}
                            <div className="flex items-center gap-4 text-xs text-os-text-muted font-mono">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </div>
                              {article.read_time && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5" />
                                  {article.read_time}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-semibold text-white group-hover:text-[#D4AF37] transition-colors leading-snug font-heading">
                            {article.title}
                          </h3>

                          {/* Excerpt */}
                          {article.excerpt && (
                            <p className="text-sm text-os-text-muted leading-relaxed line-clamp-2 font-sans">
                              {article.excerpt}
                            </p>
                          )}

                          {/* CTA */}
                          <div className="mt-auto pt-3 flex items-center gap-1 text-xs font-mono text-os-text-muted group-hover:text-[#D4AF37] transition-colors">
                            READ_FILE <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>

                        {/* Cover image */}
                        {cover && (
                          <div className="w-full sm:w-52 shrink-0 h-44 overflow-hidden">
                            <img
                              src={cover}
                              alt={article.title}
                              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
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