import Sidebar from "../../components/Sidebar";
import MobileDock from "../../components/MobileDock";
import SystemDock from "../../components/SystemDock";
import { FileText, Clock, Calendar, ChevronRight } from "lucide-react";
import PageTransition from "../../components/PageTransition";

export default function Notes() {
  const articles = [
    {
      title: "Are We Losing the Ability to Explain Tech?",
      date: "December 7, 2025",
      readTime: "3 min read",
      excerpt: "Discusses the side effects of AI over-reliance, specifically focusing on how developers and architects risk losing the ability to explain complex concepts simply.",
      tag: "TECHNOLOGY",
    },
    {
      title: "The Liberating Power of Self-Honesty: Why You Haven't Earned What You Want (Yet)",
      date: "December 7, 2025",
      readTime: "2 min read",
      excerpt: "A personal and reflective piece on self-honesty, accountability, and the mindset required to actually achieve the milestones you set for yourself.",
      tag: "MINDSET",
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center w-full pb-16 md:pb-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#0A0F1C] to-[#050810]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Top Hero Section */}
      <div className="w-full flex flex-col items-center justify-center pt-24 pb-16 text-center z-10 px-4">
        <h1 className="text-4xl md:text-[40px] font-semibold tracking-[0.15em] text-white mb-6 font-sans">
          EBENEZER ZOTOO
        </h1>
        <div className="flex flex-col gap-2 text-[17px] text-os-text-muted mb-12 tracking-wide font-sans font-light">
          <p>Full-Stack Developer</p>
          <p>Systems Architect</p>
          <p>UI/UX Designer</p>
        </div>
      </div>

      {/* The OS Workspace */}
      <div className="w-full max-w-[1440px] flex-1 flex border-t border-white/10 bg-[#0A0F1C]/40 backdrop-blur-2xl z-10 shadow-2xl">
        
        <Sidebar />

        <main className="flex-1 flex flex-col min-h-[800px] overflow-y-auto">
            <PageTransition>
          {/* Top Bar */}
          <div className="h-16 border-b border-white/5 flex justify-end items-center px-8 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-md z-20">
            <span>🔔</span>
            <span>☁️</span>
            <span>~/LOGS/NOTES</span>
          </div>
          
          <div className="p-6 md:p-10 flex-1 max-w-4xl w-full">
            <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-8 font-sans">SYSTEM_NOTES</h2>
            
            <div className="flex flex-col gap-6">
              {articles.map((article, index) => (
                <div 
                  key={index} 
                  className="group relative flex flex-col gap-3 p-6 rounded-xl bg-[#111827]/40 border border-white/5 hover:border-os-accent-green/50 hover:bg-[#111827]/80 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Subtle Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-os-accent-green/0 via-os-accent-green/5 to-os-accent-green/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono tracking-widest text-os-accent-green px-2 py-1 rounded bg-os-accent-green/10 border border-os-accent-green/20">
                      {article.tag}
                    </span>
                    <div className="flex items-center gap-4 text-xs text-os-text-muted font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="z-10 mt-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-os-accent-green transition-colors flex items-center gap-2">
                      <FileText className="w-5 h-5 text-os-text-muted group-hover:text-os-accent-green transition-colors" />
                      {article.title}
                    </h3>
                    <p className="text-sm text-os-text-muted mt-3 leading-relaxed ml-7">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="z-10 mt-4 ml-7 flex items-center gap-1 text-xs font-mono text-os-text-muted group-hover:text-white transition-colors">
                    READ_FILE <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
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