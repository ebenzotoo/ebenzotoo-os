"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { marked } from "marked";
import { getSupabase } from "@/lib/supabase";
import ImageUpload from "./ImageUpload";

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
  const [insertingImage, setInsertingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function handleImageInsert(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setInsertingImage(true);
    setUploadError("");

    const ext = file.name.split(".").pop();
    const path = `notes/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await getSupabase()
      .storage.from("portfolio")
      .upload(path, file, { upsert: true });

    if (error) {
      setUploadError(error.message);
      setInsertingImage(false);
      return;
    }

    const { data: { publicUrl } } = getSupabase()
      .storage.from("portfolio")
      .getPublicUrl(data.path);

    const markdown = `![](${publicUrl})`;
    const ta = textareaRef.current;

    if (ta) {
      const start = ta.selectionStart ?? content.length;
      const end = ta.selectionEnd ?? content.length;
      const newContent =
        content.slice(0, start) + "\n" + markdown + "\n" + content.slice(end);
      setContent(newContent);
      setTimeout(() => {
        ta.focus();
        const pos = start + markdown.length + 2;
        ta.setSelectionRange(pos, pos);
      }, 0);
    } else {
      setContent((prev) => prev + "\n" + markdown + "\n");
    }

    setInsertingImage(false);
    e.target.value = "";
  }

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

      {/* Markdown editor with preview + inline image insert */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs text-white/40 tracking-wide">
            Content <span className="text-[#D4AF37]/60 ml-1">*</span>
          </label>
          <div className="flex items-center gap-2">
            {!preview && (
              <label
                className={`cursor-pointer text-xs px-2 py-0.5 rounded border transition-colors ${
                  insertingImage
                    ? "border-white/10 text-white/20 pointer-events-none"
                    : "border-[#D4AF37]/30 text-[#D4AF37]/60 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                }`}
                title="Upload image — inserts at cursor as ![](url)"
              >
                {insertingImage ? "Uploading…" : "↑ Insert Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageInsert}
                  disabled={insertingImage}
                />
              </label>
            )}
            <button
              type="button"
              onClick={() => setPreview((p) => !p)}
              className="text-xs text-white/30 hover:text-[#D4AF37]/70 transition-colors px-2 py-0.5 rounded border border-white/10 hover:border-[#D4AF37]/30"
            >
              {preview ? "← Editor" : "Preview →"}
            </button>
          </div>
        </div>

        {uploadError && (
          <p className="text-xs text-red-400 mb-1.5">{uploadError}</p>
        )}

        {preview ? (
          <div
            className="min-h-[320px] bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/80 prose prose-invert prose-sm max-w-none overflow-auto"
            dangerouslySetInnerHTML={{
              __html: marked.parse(content || "_Nothing to preview yet._") as string,
            }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={16}
            placeholder="Write in Markdown… Use '↑ Insert Image' to upload images — they'll be inserted at the cursor."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/40 transition-colors resize-none font-mono"
          />
        )}
        {preview && <input type="hidden" name="content" value={content} />}
      </div>

      {/* Cover + card images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
        <ImageUpload
          name="cover_image"
          label="Cover Image (article hero)"
          folder="notes"
          defaultUrl={note?.cover_image ?? ""}
        />
        <ImageUpload
          name="image_url"
          label="Card Image (listing thumbnail)"
          folder="notes"
          defaultUrl={note?.image_url ?? ""}
        />
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
