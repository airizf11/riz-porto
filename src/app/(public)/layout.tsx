// src/app/(public)/layout.tsx
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-20">
        {children}
        <Footer />
      </main>
    </>
  );
}
