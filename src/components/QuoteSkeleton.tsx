// src/components/QuoteSkeleton.tsx
export const QuoteSkeleton = () => (
  <div className="w-full py-20">
    <div className="container mx-auto max-w-4xl px-8 text-center animate-pulse">
      <div className="h-10 bg-dark/50 rounded-lg w-3/4 mx-auto mb-4"></div>
      <div className="h-8 bg-dark/50 rounded-lg w-1/2 mx-auto"></div>
      <div className="h-6 bg-dark/50 rounded-lg w-1/4 mx-auto mt-6"></div>
    </div>
  </div>
);
