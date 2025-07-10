// src/components/admin/DeleteContentButton.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";
import { deleteContent } from "@/app/(admin)/mudir/content/actions";

function DeleteBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold disabled:text-red-500/50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? (
        "Deleting..."
      ) : (
        <>
          <Trash2 className="w-4 h-4" /> Delete
        </>
      )}
    </button>
  );
}

export function DeleteContentButton({ id }: { id: string }) {
  const deleteContentWithId = deleteContent.bind(null, id);

  return (
    <form
      action={deleteContentWithId}
      onSubmit={(e) => {
        if (!confirm("Are you sure? This action cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold disabled:text-red-500/50 disabled:cursor-not-allowed transition-colors"
      >
        <Trash2 className="w-4 h-4" /> Delete
      </button>
    </form>
  );
}
