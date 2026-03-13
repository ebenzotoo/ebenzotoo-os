import Sidebar from "../../../components/Sidebar";
import MobileDock from "../../../components/MobileDock";
import SystemDock from "../../../components/SystemDock";
import PageTransition from "../../../components/PageTransition";
import { getSupabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Calendar, Clock, Terminal } from "lucide-react";

export default async function NoteDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: note, error } = await getSupabase()
    .from("notes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !note) {
    notFound();
  }

  return (
    <div className="relative h-screen overflow-hidden flex flex-col w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#0A0F1C] to-[#050810]">

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="w-full max-w-[1440px] mx-auto flex-1 overflow-hidden flex border-t border-white/10 bg-[#0A0F1C]/40 backdrop-blur-2xl z-10 shadow-2xl">

        <Sidebar />

        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
          <PageTransition>
            
            <div className="h-16 border-b border-white/5 flex justify-between items-center px-8 text-os-text-muted text-sm sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-md z-20 font-mono">
              <div className="flex items-center gap-2 text-os-accent-green">
                <Terminal className="w-4 h-4" />
                <span>~/notes/{note.slug}.md</span>
              </div>
              <div className="hidden md:flex gap-5">
                <span>🔔</span>
                <span>☁️</span>
                <span>SYSTEM_READ</span>
              </div>
            </div>
            
            <div className="p-6 md:p-10 flex-1 max-w-3xl mx-auto w-full">
              
              <Link href="/notes" className="inline-flex items-center gap-2 text-xs font-mono text-os-text-muted hover:text-white transition-colors mb-8 group">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                cd .. /notes
              </Link>
              
              <div className="mb-12">
                <span className="text-[10px] font-mono tracking-widest text-os-accent-green px-2 py-1 rounded bg-os-accent-green/10 border border-os-accent-green/20 mb-6 inline-block">
                  {note.tag}
                </span>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide leading-tight">
                  {note.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-os-text-muted border-b border-white/5 pb-8">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(note.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {note.read_time}
                  </span>
                  <span className="flex items-center gap-2 text-os-accent-green">
                    <FileText className="w-4 h-4" />
                    STATUS: PUBLISHED
                  </span>
                </div>
              </div>

              <article className="prose prose-invert prose-p:text-os-text-main prose-p:leading-relaxed prose-p:font-sans prose-a:text-os-accent-green max-w-none">
                {note.content.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-6">{paragraph}</p>
                ))}
              </article>

            </div>
          </PageTransition>
        </main>
      </div>

      <SystemDock />
      <MobileDock />
    </div>
  );
}