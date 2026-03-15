"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ── Projects ──────────────────────────────────────────────────────────────────

export async function upsertProject(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = formData.get("id") as string | null;
  const techRaw = formData.get("tech_stack") as string;
  const imagesRaw = formData.get("images") as string | null;

  const payload: Record<string, unknown> = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    image_url: formData.get("image_url") as string,
    live_url: formData.get("live_url") as string,
    github_url: formData.get("github_url") as string,
    tech_stack: techRaw
      ? techRaw.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    published: formData.get("published") === "true",
  };

  // include images only if the column exists in DB (added via SQL migration)
  if (imagesRaw !== null) {
    try { payload.images = JSON.parse(imagesRaw || "[]"); }
    catch { payload.images = []; }
  }

  const { error } = id
    ? await supabase.from("projects").update(payload).eq("id", id)
    : await supabase.from("projects").insert(payload);

  if (error) {
    const dest = id
      ? `/admin/projects/${id}/edit?error=${encodeURIComponent(error.message)}`
      : `/admin/projects/new?error=${encodeURIComponent(error.message)}`;
    redirect(dest);
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createSupabaseServerClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

// ── Notes ─────────────────────────────────────────────────────────────────────

export async function upsertNote(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = formData.get("id") as string | null;

  const payload = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    tag: formData.get("tag") as string,
    read_time: formData.get("read_time") as string,
    cover_image: formData.get("cover_image") as string,
    image_url: formData.get("image_url") as string,
    published: formData.get("published") === "true",
  };

  const { error } = id
    ? await supabase.from("notes").update(payload).eq("id", id)
    : await supabase.from("notes").insert(payload);

  if (error) {
    const dest = id
      ? `/admin/notes/${id}/edit?error=${encodeURIComponent(error.message)}`
      : `/admin/notes/new?error=${encodeURIComponent(error.message)}`;
    redirect(dest);
  }

  revalidatePath("/admin/notes");
  revalidatePath("/notes");
  redirect("/admin/notes");
}

export async function deleteNote(id: string) {
  const supabase = await createSupabaseServerClient();
  await supabase.from("notes").delete().eq("id", id);
  revalidatePath("/admin/notes");
  revalidatePath("/notes");
}

// ── Messages ──────────────────────────────────────────────────────────────────

export async function markMessageRead(id: string) {
  const supabase = await createSupabaseServerClient();
  await supabase.from("messages").update({ read: true }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  const supabase = await createSupabaseServerClient();
  await supabase.from("messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
}

// ── System Config ─────────────────────────────────────────────────────────────

export async function updateConfig(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  await supabase
    .from("system_config")
    .update({
      availability_status: formData.get("availability_status") as string,
      available: formData.get("available") === "true",
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: formData.get("location") as string,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  revalidatePath("/admin/config");
  revalidatePath("/");
  revalidatePath("/contact");
}
