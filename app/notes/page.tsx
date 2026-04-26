import PageTransition from "../../components/PageTransition";
import Link from "next/link";
import { getSupabase } from "../../lib/supabase";
import { Clock, Calendar } from "lucide-react";
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
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching notes:", error);

  return (
        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
          <PageTransition>
            <div className="border-b border-os-border flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-os-bg/90 backdrop-blur-md z-20">
              <NotificationBell />
              <CloudStatus />
              <span>~/LOGS/NOTES <LiveClock /></span>
            </div>

            <div className="p-6 md:p-10 flex-1 w-full relative">

              {/* Ghost watermark */}
              <div className="absolute top-4 right-0 text-[100px] font-heading font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">
                NOTES
              </div>

              <h2 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-8 uppercase">
                <span className="text-os-primary">//</span> Notes
              </h2>

              <div className="flex flex-col gap-5">
                {notes?.map((article) => {
                  const cover = article.cover_image ?? article.image_url ?? noteImageMap[article.slug] ?? null;
                  return (
                    <Link href={`/notes/${article.slug}`} key={article.id} className="block group">
                      <div className="flex flex-col sm:flex-row rounded-xl bg-os-surface border border-os-border hover:border-os-primary/35 hover:shadow-[0_8px_32px_rgba(11,206,175,0.07)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">

                        {/* Cover image strip */}
                        {cover && (
                          <div className="sm:w-[120px] sm:shrink-0 h-40 sm:h-auto overflow-hidden">
                            <img src={cover} alt={article.title} className="w-full h-full object-cover" />
                          </div>
                        )}

                        {/* Text */}
                        <div className="flex flex-col gap-2.5 p-5 flex-1">
                          <div className="flex flex-wrap items-center gap-2.5">
                            {article.tag && (
                              <span className={`text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-lg ${
                                article.tag.toLowerCase().includes("tech") ? "bg-os-primary/8 text-os-primary border border-os-primary/15" :
                                article.tag.toLowerCase().includes("mind") ? "bg-os-secondary/8 text-os-secondary border border-os-secondary/15" :
                                "bg-os-gold/8 text-os-gold border border-os-gold/15"
                              }`}>
                                {article.tag}
                              </span>
                            )}
                            <div className="flex items-center gap-3 text-[12px] text-os-text-muted">
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
                          <h3 className="text-[16px] font-semibold text-os-text-main group-hover:text-os-primary transition-colors leading-snug">
                            {article.title}
                          </h3>
                          {article.excerpt && (
                            <p className="text-[13px] text-os-text-muted leading-relaxed line-clamp-2">{article.excerpt}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

            </div>
          </PageTransition>
    </main>
  );
}
