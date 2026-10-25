import SheetHeader from "@/components/SheetHeader";
import PageTransition from "@/components/PageTransition";
import { getSupabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

/* ─── Inline markdown renderer (unchanged logic, bp-* colors) ─────────────── */

function parseInline(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0, m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[2]) parts.push(<strong key={key++} className="text-bp-text-main font-semibold">{m[2]}</strong>);
    else if (m[3]) parts.push(<em key={key++} className="italic">{m[3]}</em>);
    else if (m[4]) parts.push(<code key={key++} className="px-1.5 py-0.5 bg-bp-surface rounded text-bp-primary font-mono text-[0.85em]">{m[4]}</code>);
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
    if (!line.trim()) { i++; continue; }

    if (/^# /.test(line)) {
      nodes.push(<h1 key={key++} className="text-[28px] font-bold text-bp-text-main mb-4 mt-8 leading-snug font-heading">{parseInline(line.replace(/^# /, ""))}</h1>);
      i++; continue;
    }
    if (/^## /.test(line)) {
      nodes.push(<h2 key={key++} className="text-[22px] font-semibold text-bp-text-main mb-3 mt-7 leading-snug font-heading">{parseInline(line.replace(/^## /, ""))}</h2>);
      i++; continue;
    }
    if (/^### /.test(line)) {
      nodes.push(<h3 key={key++} className="text-[19px] font-semibold text-bp-text-main mb-2 mt-6 font-heading">{parseInline(line.replace(/^### /, ""))}</h3>);
      i++; continue;
    }
    if (/^> /.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^> /.test(lines[i])) { quoteLines.push(lines[i].replace(/^> /, "")); i++; }
      nodes.push(
        <blockquote key={key++} className="relative my-8 pl-6 border-l-2 border-bp-primary">
          <span className="absolute -top-2 left-4 text-4xl text-bp-primary/30 font-serif leading-none select-none">&ldquo;</span>
          <p className="text-bp-text-main italic text-lg leading-relaxed pt-2">{parseInline(quoteLines.join(" "))}</p>
        </blockquote>
      );
      continue;
    }
    if (/^---+$/.test(line.trim())) {
      nodes.push(<hr key={key++} className="my-8 border-bp-border" />);
      i++; continue;
    }
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) { items.push(lines[i].replace(/^[-*] /, "")); i++; }
      nodes.push(
        <ul key={key++} className="my-5 space-y-2 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-bp-text-main text-lg leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-bp-gold/60 shrink-0" />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, "")); i++; }
      nodes.push(
        <ol key={key++} className="my-5 space-y-2 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-bp-text-main text-lg leading-relaxed">
              <span className="shrink-0 text-sm font-mono text-bp-primary mt-1 w-5">{idx + 1}.</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length && lines[i].trim() &&
      !/^#{1,3} /.test(lines[i]) && !/^> /.test(lines[i]) &&
      !/^[-*] /.test(lines[i]) && !/^\d+\. /.test(lines[i]) && !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      nodes.push(<p key={key++} className="text-[18px] text-bp-text-muted leading-[1.75] mb-4">{parseInline(paraLines.join(" "))}</p>);
    }
  }

  return nodes;
}

const noteImageMap: Record<string, string> = {
  "losing-ability-to-explain-tech":   "/notes/explain-tech.jpg",
  "liberating-power-of-self-honesty": "/notes/power.jpg",
};

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
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.04 — LAB" sheet="04/06" />

        <div className="p-6 md:px-12 md:py-10 w-full max-w-3xl mx-auto">
          <Link href="/lab" className="flex items-center gap-1.5 text-[14px] text-bp-text-muted hover:text-bp-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Lab
          </Link>

          {coverImage && (
            <div className="rounded-2xl overflow-hidden mb-8 border border-bp-border">
              <img src={coverImage} alt={note.title} className="w-full object-cover max-h-72 object-center" />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm font-mono text-bp-primary">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(note.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            {note.read_time && (
              <span className="flex items-center gap-1.5 text-bp-text-muted">
                <Clock className="w-4 h-4" />
                {note.read_time}
              </span>
            )}
            {note.tag && (
              <span className="px-2 py-0.5 rounded bg-bp-primary/10 border border-bp-primary/20 text-bp-primary">{note.tag}</span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-bp-text-main mb-4 leading-tight font-heading">{note.title}</h1>

          {note.excerpt && (
            <p className="text-bp-text-muted text-lg leading-relaxed mb-8 border-b border-bp-border pb-8">{note.excerpt}</p>
          )}
          {!note.excerpt && <div className="border-b border-bp-border mb-8" />}

          <article className="max-w-[720px] mx-auto text-[18px] leading-[1.75] text-bp-text-muted">
            {renderContent(note.content ?? "")}
          </article>
        </div>
      </PageTransition>
    </main>
  );
}
