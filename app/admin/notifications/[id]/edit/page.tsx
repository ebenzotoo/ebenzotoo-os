import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { upsertNotification } from "@/app/admin/actions";
import NotificationForm from "@/app/admin/_components/NotificationForm";

export default async function EditNotificationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: notification } = await supabase
    .from("notifications")
    .select("*")
    .eq("id", id)
    .single();

  if (!notification) notFound();

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-xl font-semibold text-white/90 mb-6">Edit Notification</h1>
      <NotificationForm
        action={upsertNotification}
        notification={notification}
        searchParams={searchParams}
      />
    </div>
  );
}
