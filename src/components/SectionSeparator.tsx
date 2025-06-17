// src/components/SectionSeparator.tsx
type SectionSeparatorProps = {
  color: "primary" | "accent" | "secondary" | "tertiary";
};

export const SectionSeparator = ({ color }: SectionSeparatorProps) => {
  const colorMap = {
    primary: "fill-primary",
    accent: "fill-accent",
    secondary: "fill-secondary",
    tertiary: "fill-tertiary",
  };

  return (
    <div className="bg-dark/95 backdrop-blur-sm">
      <svg
        className={`w-full ${colorMap[color]}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
      </svg>
    </div>
  );
};
