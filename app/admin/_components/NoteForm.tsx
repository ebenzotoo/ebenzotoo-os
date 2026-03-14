"use client";

import Link from "next/link";
import { useState } from "react";
import { marked } from "marked";

type Note = {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  tag?: string;
  read_time?: string;
  cover_image?: string;
  image_url?: string;
  published?: boolean;
};

export default function NoteForm({
  action,
  note,
}: {
  action: (formData: FormData) => Promise<void>;
  note?: Note;
}) {
  const [content, setContent] = useState(note?.content ?? "");
  const [preview, setPreview] = useState(false);

  return (
    <form action={action} className="space-y-5">
      {note?.id && <input type="hidden" name="id" value={note.id} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
        <Field label="Title" name="title" defaultValue={note?.title} required />
        <Field label="Slug" name="slug" defaultValue={note?.slug} required placeholder="my-note" />
        <Field label="Tag" name="tag" defaultValue={note?.tag} placeholder="React, TypeScript..." />
        <Field label="Read Time" name="read_time" defaultValue={note?.read_time} placeholder="5 min read" />
      </div>

      <div className="max-w-2xl">
        <Field label="Excerpt" name="excerpt" defaultValue={note?.excerpt} textarea rows={2} />
      </div>

      {/* Markdown editor with preview */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs text-white/40 tracking-wide">
            Content <span className="text-[#D4AF37]/60 ml-1">*</span>
          </label>
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="text-xs text-white/30 hover:text-[#D4AF37]/70 transition-colors px-2 py-0.5 rounded border border-white/10 hover:border-[#D4AF37]/30"
          >
            {preview ? "← Editor" : "Preview →"}
          </button>
        </div>

        {preview ? (
          <div
            className="min-h-[320px] bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/80 prose prose-invert prose-sm max-w-none overflow-auto"
            dangerouslySetInnerHTML={{
              __html: marked.parse(content || "_Nothing to preview yet._") as string,
            }}
          />
        ) : (
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={16}
            placeholder="Write in Markdown..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/40 transition-colors resize-none font-mono"
          />
        )}
        {/* Hidden input keeps value when in preview mode */}
        {preview && <input type="hidden" name="content" value={content} />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
        <Field label="Cover Image URL" name="cover_image" defaultValue={note?.cover_image} placeholder="https://..." />
        <Field label="Image URL" name="image_url" defaultValue={note?.image_url} placeholder="https://..." />
      </div>

      {/* Published toggle */}
      <div className="max-w-2xl flex items-center gap-3 pt-1">
        <input
          type="checkbox"
          name="published"
          id="note-published"
          defaultChecked={note?.published ?? true}
          value="true"
          className="w-4 h-4 accent-[#D4AF37] rounded"
        />
        <label htmlFor="note-published" className="text-sm text-white/60 cursor-pointer">
          Published — visible on the portfolio
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-[#050810] text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          {note?.id ? "Save Changes" : "Create Note"}
        </button>
        <Link
          href="/admin/notes"
          className="text-white/40 hover:text-white/70 text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  textarea,
  rows,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
}) {
  const cls =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/40 transition-colors resize-none";
  return (
    <div>
      <label className="block text-xs text-white/40 mb-1.5 tracking-wide">
        {label}
        {required && <span className="text-[#D4AF37]/60 ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue} required={required} placeholder={placeholder} rows={rows ?? 4} className={cls} />
      ) : (
        <input type="text" name={name} defaultValue={defaultValue} required={required} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}
