// src/components/ProjectsSkeleton.tsx
export const ProjectsSkeleton = () => {
  const SkeletonCard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className="aspect-video bg-dark/50 rounded-xl animate-pulse"></div>

      <div className="flex flex-col gap-4">
        <div className="h-8 w-1/3 bg-dark/50 rounded-lg animate-pulse"></div>
        <div className="h-20 w-full bg-dark/50 rounded-lg animate-pulse"></div>
        <div className="flex flex-wrap gap-2 my-2">
          <div className="h-6 w-16 bg-dark/50 rounded-full animate-pulse"></div>
          <div className="h-6 w-20 bg-dark/50 rounded-full animate-pulse"></div>
          <div className="h-6 w-24 bg-dark/50 rounded-full animate-pulse"></div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="h-10 w-32 bg-dark/50 rounded-lg animate-pulse"></div>
          <div className="h-10 w-28 bg-dark/50 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="w-full py-20 md:py-32 bg-dark">
      <div className="container mx-auto max-w-6xl px-8">
        <div className="h-12 w-3/5 md:w-2/5 bg-dark/50 rounded-lg mx-auto mb-16 animate-pulse"></div>

        <div className="flex flex-col gap-16 md:gap-24">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </section>
  );
};
