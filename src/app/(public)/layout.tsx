// src/app/(public)/layout.tsx
import { Header } from "@/components/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-20">{children}</main>
    </>
  );
}
