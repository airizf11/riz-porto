// src/components/admin/content-form/FormActions.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-3 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 disabled:bg-primary/50 disabled:cursor-not-allowed"
    >
      {pending
        ? isEditing
          ? "Saving..."
          : "Creating..."
        : isEditing
        ? "Save Changes"
        : "Create Content"}
    </button>
  );
}

export function FormActions({
  isEditing,
  state,
}: {
  isEditing: boolean;
  state: any;
}) {
  return (
    <div className="flex items-center gap-4 pt-4 mt-8 border-t border-light/10">
      <SubmitButton isEditing={isEditing} />
      {state.message && (
        <p className="text-red-400 font-semibold">{state.message}</p>
      )}
    </div>
  );
}
