"use client";

import { useState } from "react";
import Link from "next/link";
import { FlaskConical, FileText, Play } from "lucide-react";

export interface Experiment {
  id: string;
  title: string;
  type: string;
  icon: React.ReactNode;
  snippet: string;
  render: string;
}

export interface LabNote {
  slug: string;
  title: string;
  excerpt: string | null;
  tag: string | null;
  created_at: string;
  read_time: string | null;
}

interface LabTabsProps {
  experiments: Experiment[];
  notes: LabNote[];
}

export default function LabTabs({ experiments, notes }: LabTabsProps) {
  const [tab, setTab] = useState<"experiments" | "notes">("experiments");

  return (
    <div>
      <div className="flex items-center gap-1 mb-8 border-b border-bp-border" role="tablist">
        <button
          role="tab"
          id="lab-tab-experiments"
          aria-selected={tab === "experiments"}
          aria-controls="lab-panel-experiments"
          onClick={() => setTab("experiments")}
          className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.1em] border-b-2 transition-colors flex items-center gap-1.5 ${
            tab === "experiments" ? "border-bp-primary text-bp-primary" : "border-transparent text-bp-text-muted hover:text-bp-text-main"
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" /> Experiments
        </button>
        <button
          role="tab"
          id="lab-tab-notes"
          aria-selected={tab === "notes"}
          aria-controls="lab-panel-notes"
          onClick={() => setTab("notes")}
          className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.1em] border-b-2 transition-colors flex items-center gap-1.5 ${
            tab === "notes" ? "border-bp-primary text-bp-primary" : "border-transparent text-bp-text-muted hover:text-bp-text-main"
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Notes
        </button>
      </div>

      {tab === "experiments" ? (
        <div id="lab-panel-experiments" role="tabpanel" aria-labelledby="lab-tab-experiments" className="flex flex-col gap-10">
          {experiments.map((exp) => (
            <div key={exp.id} className="sheet-card overflow-hidden flex flex-col">
              <div className="bg-white/[0.03] px-5 py-3 border-b border-bp-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {exp.icon}
                  <span className="text-bp-text-main font-medium text-sm tracking-wide">{exp.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono tracking-widest text-bp-text-muted px-2 py-1 rounded bg-white/[0.04] border border-bp-border hidden sm:block">
                    {exp.type}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-bp-primary bg-bp-primary/10 px-3 py-1.5 rounded border border-bp-primary/20">
                    <Play className="w-3 h-3" fill="currentColor" /> RUN
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-bp-border">
                <div className="p-5 font-mono text-xs overflow-x-auto bg-black/20">
                  <pre className="text-bp-text-main leading-relaxed"><code>{exp.snippet}</code></pre>
                </div>
                <div className="p-5 flex flex-col justify-center items-center text-center bg-white/[0.02] min-h-[150px]">
                  <p className="text-sm text-bp-text-muted leading-relaxed max-w-sm">{exp.render}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div id="lab-panel-notes" role="tabpanel" aria-labelledby="lab-tab-notes" className="flex flex-col gap-4">
          {notes.length === 0 && (
            <p className="text-sm text-bp-text-muted font-mono">NO_NOTES_PUBLISHED_YET</p>
          )}
          {notes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="sheet-card flex flex-col gap-2 p-5 no-underline">
              <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-bp-secondary">{note.tag ?? "Note"}</span>
              <h3 className="text-[15px] font-semibold text-bp-text-main leading-snug">{note.title}</h3>
              {note.excerpt && <p className="text-[13px] text-bp-text-muted leading-relaxed line-clamp-2">{note.excerpt}</p>}
              <div className="flex items-center gap-4 mt-1 text-[11px] text-bp-text-muted font-mono">
                <span>{new Date(note.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                {note.read_time && <span>{note.read_time}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
