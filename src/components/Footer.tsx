// src/components/Footer.tsx
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-8 bg-dark border-t border-light/10">
      <div className="container mx-auto text-center text-light/60">
        <p>© {currentYear} Riziyan. Built with curiosity, code, and coffee.</p>
      </div>
    </footer>
  );
};
