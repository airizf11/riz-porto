// src/app/(public)/layout.tsx
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative z-10 pt-28">
        {children}
        <Footer />
      </main>
    </>
  );
}
