import AdminSidebar from "@/components/AdminSidebar";
import { logoutAction } from "./login/actions";

export const metadata = { title: "Admin — ebenzotoo" };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-admin className="relative min-h-screen flex bg-[#050810]">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <AdminSidebar logout={logoutAction} />
      <main className="relative flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
