// src/app/(admin)/layout.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-light">
      <header className="bg-dark border-b border-light/10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-accent">Mudir Panel</h1>
          <LogoutButton />
        </nav>
      </header>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
