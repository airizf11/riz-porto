// src/components/admin/content-form/FormField.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface Props {
  label: string;
  children: React.ReactNode;
  error?: string[];
}

export function FormField({ label, children, error }: Props) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-light/80">{label}</label>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement<any>;
          return React.cloneElement(element, {
            className: `w-full p-3 bg-neutral-800 rounded-lg border border-light/20 focus:ring-2 focus:ring-accent outline-none transition-all ${
              element.props.className || ""
            }`,
          });
        }
        return child;
      })}
      {error && <p className="text-red-400 text-sm mt-1">{error[0]}</p>}
    </div>
  );
}
