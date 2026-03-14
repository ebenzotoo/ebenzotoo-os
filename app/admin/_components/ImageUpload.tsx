"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

export default function ImageUpload({
  name,
  label = "Image",
  folder = "general",
  defaultUrl = "",
}: {
  name: string;
  label?: string;
  folder?: string;
  defaultUrl?: string;
}) {
  const [url, setUrl] = useState(defaultUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error: upErr } = await getSupabase()
      .storage.from("portfolio")
      .upload(path, file, { upsert: true });

    if (upErr) {
      setError(upErr.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = getSupabase()
      .storage.from("portfolio")
      .getPublicUrl(data.path);

    setUrl(publicUrl);
    setUploading(false);
    // clear the file input so the same file can be re-selected if needed
    e.target.value = "";
  }

  return (
    <div>
      <label className="block text-xs text-white/40 mb-1.5 tracking-wide">
        {label}
      </label>

      {url && (
        <div className="relative mb-2 rounded-lg overflow-hidden border border-white/10 h-44 bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white/70 hover:text-white text-xs px-2 py-1 rounded transition-colors"
          >
            ✕ Remove
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <input type="hidden" name={name} value={url} />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste URL or upload a file →"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/40 transition-colors"
        />
        <label
          className={`shrink-0 cursor-pointer px-4 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
            uploading
              ? "border-white/10 text-white/20 pointer-events-none"
              : "border-[#D4AF37]/30 text-[#D4AF37]/70 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
          }`}
        >
          {uploading ? "Uploading…" : "↑ Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      </div>

      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}
