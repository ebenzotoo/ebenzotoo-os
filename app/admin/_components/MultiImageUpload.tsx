"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

export default function MultiImageUpload({
  name,
  label = "Additional Images",
  folder = "general",
  defaultUrls = [],
}: {
  name: string;
  label?: string;
  folder?: string;
  defaultUrls?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(defaultUrls);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setError("");

    const newUrls: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { data, error: upErr } = await getSupabase()
        .storage.from("portfolio")
        .upload(path, file, { upsert: true });

      if (upErr) {
        setError(upErr.message);
        continue;
      }

      const { data: { publicUrl } } = getSupabase()
        .storage.from("portfolio")
        .getPublicUrl(data.path);

      newUrls.push(publicUrl);
    }

    setUrls((prev) => [...prev, ...newUrls]);
    setUploading(false);
    e.target.value = "";
  }

  function remove(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block text-xs text-white/40 mb-1.5 tracking-wide">
        {label}
      </label>

      {/* Image grid */}
      {urls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
          {urls.map((url, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden border border-white/10 h-28 bg-white/5 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 bg-black/70 hover:bg-red-500/80 text-white text-xs w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Hidden input — serialised as JSON */}
      <input type="hidden" name={name} value={JSON.stringify(urls)} />

      <label
        className={`inline-flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
          uploading
            ? "border-white/10 text-white/20 pointer-events-none"
            : "border-[#D4AF37]/30 text-[#D4AF37]/70 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
        }`}
      >
        {uploading ? "Uploading…" : "↑ Add Images"}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
          disabled={uploading}
        />
      </label>

      {urls.length > 0 && (
        <span className="ml-3 text-xs text-white/25">{urls.length} image{urls.length !== 1 ? "s" : ""}</span>
      )}

      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}
