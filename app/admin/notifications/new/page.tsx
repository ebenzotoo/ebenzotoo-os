import { upsertNotification } from "@/app/admin/actions";
import NotificationForm from "@/app/admin/_components/NotificationForm";

export default function NewNotificationPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-xl font-semibold text-white/90 mb-6">New Notification</h1>
      <NotificationForm action={upsertNotification} searchParams={searchParams} />
    </div>
  );
}
