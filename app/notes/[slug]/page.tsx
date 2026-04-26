import Sidebar from "../../../components/Sidebar";
import MobileDock from "../../../components/MobileDock";
import SystemDock from "../../../components/SystemDock";
import PageTransition from "../../../components/PageTransition";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";
import { getSupabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Terminal } from "lucide-react";

/* ─── Inline markdown renderer ─────────────────────────────────────────── */

function parseInline(text: string) {
  // **bold**, *italic*, `code`
  const parts: React.ReactNode[] = [];
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0, m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[2]) parts.push(<strong key={key++} className="text-os-text-main font-semibold">{m[2]}</strong>);
    else if (m[3]) parts.push(<em key={key++} className="italic">{m[3]}</em>);
    else if (m[4]) parts.push(<code key={key++} className="px-1.5 py-0.5 bg-os-surface rounded text-os-primary font-mono text-[0.85em]">{m[4]}</code>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === "string" ? text : parts;
}

function renderContent(raw: string) {
  const lines = raw.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // blank
    if (!line.trim()) { i++; continue; }

    // H1
    if (/^# /.test(line)) {
      nodes.push(
        <h1 key={key++} className="text-[24px] font-bold text-os-text-main mb-4 mt-8 leading-snug font-heading">
          {parseInline(line.replace(/^# /, ""))}
        </h1>
      );
      i++; continue;
    }

    // H2
    if (/^## /.test(line)) {
      nodes.push(
        <h2 key={key++} className="text-[20px] font-semibold text-os-text-main mb-3 mt-7 leading-snug font-heading">
          {parseInline(line.replace(/^## /, ""))}
        </h2>
      );
      i++; continue;
    }

    // H3
    if (/^### /.test(line)) {
      nodes.push(
        <h3 key={key++} className="text-[17px] font-semibold text-os-text-main mb-2 mt-6 font-heading">
          {parseInline(line.replace(/^### /, ""))}
        </h3>
      );
      i++; continue;
    }

    // Blockquote
    if (/^> /.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^> /.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^> /, ""));
        i++;
      }
      nodes.push(
        <blockquote key={key++} className="relative my-8 pl-6 border-l-2 border-os-primary">
          <span className="absolute -top-2 left-4 text-4xl text-os-primary/30 font-serif leading-none select-none">&ldquo;</span>
          <p className="text-os-text-main italic text-base leading-relaxed pt-2 font-sans">
            {parseInline(quoteLines.join(" "))}
          </p>
        </blockquote>
      );
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      nodes.push(<hr key={key++} className="my-8 border-os-border" />);
      i++; continue;
    }

    // Unordered list
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(lines[i].replace(/^[-*] /, ""));
        i++;
      }
      nodes.push(
        <ul key={key++} className="my-5 space-y-2 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-os-text-main text-base leading-relaxed font-sans">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-os-gold/60 shrink-0" />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      nodes.push(
        <ol key={key++} className="my-5 space-y-2 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-os-text-main text-base leading-relaxed font-sans">
              <span className="shrink-0 text-xs font-mono text-os-primary mt-1 w-5">{idx + 1}.</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph — collect until blank or block-level token
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{1,3} /.test(lines[i]) &&
      !/^> /.test(lines[i]) &&
      !/^[-*] /.test(lines[i]) &&
      !/^\d+\. /.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      nodes.push(
        <p key={key++} className="text-[16px] text-os-text-muted leading-[1.75] mb-4 font-sans">
          {parseInline(paraLines.join(" "))}
        </p>
      );
    }
  }

  return nodes;
}

const noteImageMap: Record<string, string> = {
  "losing-ability-to-explain-tech":   "/notes/explain-tech.jpg",
  "liberating-power-of-self-honesty": "/notes/power.jpg",
};

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default async function NoteDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: note, error } = await getSupabase()
    .from("notes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !note) notFound();

  const coverImage = note.cover_image ?? note.image_url ?? noteImageMap[slug] ?? null;

  return (
        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
          <PageTransition>

            {/* Top bar */}
            <div className="border-b border-os-border flex justify-between items-center px-8 py-6 text-os-text-muted text-sm sticky top-0 bg-os-bg/90 backdrop-blur-md z-20 font-mono">
              <div className="flex items-center gap-2 text-os-primary">
                <Terminal className="w-4 h-4" />
                <span>~/notes/{note.slug}.md</span>
              </div>
              <div className="hidden md:flex items-center gap-5">
                <NotificationBell />
                <CloudStatus />
                <LiveClock />
              </div>
            </div>

            <div className="p-6 md:px-12 md:py-10 w-full max-w-3xl mx-auto">

              {/* Back link */}
              <Link href="/notes" className="flex items-center gap-1.5 text-[12px] text-os-text-muted hover:text-os-primary transition-colors mb-6">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Notes
              </Link>

              {/* Cover image */}
              {coverImage && (
                <div className="rounded-2xl overflow-hidden mb-8 border border-os-border shadow-2xl shadow-black/60">
                  <img
                    src={coverImage}
                    alt={note.title}
                    className="w-full object-cover max-h-72 object-center"
                  />
                </div>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono text-os-primary">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(note.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                {note.read_time && (
                  <span className="flex items-center gap-1.5 text-os-text-muted">
                    <Clock className="w-3.5 h-3.5" />
                    {note.read_time}
                  </span>
                )}
                {note.tag && (
                  <span className="px-2 py-0.5 rounded bg-os-primary/10 border border-os-primary/20 text-os-primary">
                    {note.tag}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-os-text-main mb-4 leading-tight font-heading">
                {note.title}
              </h1>

              {/* Excerpt / subtitle */}
              {note.excerpt && (
                <p className="text-os-text-muted text-base leading-relaxed mb-8 font-sans border-b border-os-border pb-8">
                  {note.excerpt}
                </p>
              )}

              {!note.excerpt && <div className="border-b border-os-border mb-8" />}

              {/* Article body */}
              <article className="max-w-[680px] mx-auto">
                {renderContent(note.content ?? "")}
              </article>

            </div>
          </PageTransition>
        </main>
  );
}
