// src/components/admin/DeleteProjectButton.tsx
"use client";

import { useFormStatus } from "react-dom";
import { deleteProject } from "@/app/(admin)/mudir/projects/actions";
import { Trash2 } from "lucide-react";

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

export function DeleteProjectButton({ id }: { id: string }) {
  const deleteProjectWithId = deleteProject.bind(null, id);

  return (
    <form
      action={deleteProjectWithId}
      onSubmit={(e) => {
        if (
          !confirm(
            "Are you sure you want to delete this project? This action cannot be undone."
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <DeleteBtn />
    </form>
  );
}
