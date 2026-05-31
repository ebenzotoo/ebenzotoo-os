import PageTransition from "../../components/PageTransition";
import Link from "next/link";
import { getSupabase } from "../../lib/supabase";
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
                <span className="text-os-primary">// </span>Notes
              </h2>

              <div className="flex flex-col gap-5">
                {(notes ?? []).map((note: Record<string, unknown>) => {
                  const slug = note.slug as string;
                  const tag = (note.tag as string) ?? "Other";
                  const tagColor = tag === "Tech"    ? "text-os-primary border-os-primary/25 bg-os-primary/10"
                                 : tag === "Mindset" ? "text-os-secondary border-os-secondary/25 bg-os-secondary/10"
                                 : "text-os-gold border-os-gold/25 bg-os-gold/10";

                  const coverImage = (note.cover_image ?? note.image_url ?? noteImageMap[slug] ?? null) as string | null;

                  return (
                    <Link key={slug} href={`/notes/${slug}`}
                      className="glass-card group flex rounded-[14px] overflow-hidden no-underline">
                      {/* Cover strip */}
                      <div className={`w-[90px] shrink-0 relative overflow-hidden bg-gradient-to-br
                        ${tag === "Tech"    ? "from-os-primary/15 to-transparent"
                        : tag === "Mindset" ? "from-os-secondary/15 to-transparent"
                        : "from-os-gold/15 to-transparent"}`}>
                        {coverImage && (
                          <>
                            <img src={coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                            <div className={`absolute inset-0 bg-gradient-to-r
                              ${tag === "Tech"    ? "from-transparent to-os-primary/20"
                              : tag === "Mindset" ? "from-transparent to-os-secondary/20"
                              : "from-transparent to-os-gold/20"}`} />
                          </>
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex flex-col gap-2 p-4 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-[0.08em] border ${tagColor}`}>
                            {tag}
                          </span>
                        </div>
                        <h3 className="text-[15px] font-semibold text-os-text-main leading-snug line-clamp-2">
                          {note.title as string}
                        </h3>
                        <p className="text-[13px] text-os-text-muted leading-relaxed line-clamp-2">
                          {note.excerpt as string}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-[11px] text-os-text-muted">
                            {new Date(note.created_at as string).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          {!!note.read_time && (
                            <span className="text-[11px] text-os-text-muted">{note.read_time as string}</span>
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
