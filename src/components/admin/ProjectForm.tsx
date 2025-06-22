// src/components/ProjectForm.tsx
"use client";

import { useActionState, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import {
  createOrUpdateProject,
  type FormState,
} from "@/app/(admin)/mudir/projects/actions";
import type { Database } from "@/types/supabase";
import { useFormStatus } from "react-dom";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type Project = Database["public"]["Tables"]["projects"]["Row"];

const initialState: FormState = { message: null, errors: {} };

function SubmitButton({ isEditing }: { isEditing: boolean }) {
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
        : "Create Project"}
    </button>
  );
}

export function ProjectForm({ project }: { project?: Project | null }) {
  const [state, formAction] = useActionState(
    createOrUpdateProject,
    initialState
  );
  const isEditing = !!project;

  // State khusus untuk mengelola konten dari editor Markdown
  const [caseStudyContent, setCaseStudyContent] = useState(
    project?.case_study ?? ""
  );

  // Handler untuk mengupdate state saat konten editor berubah
  const handleCaseStudyChange = (value: string) => {
    setCaseStudyContent(value);
  };

  // Memoize opsi untuk SimpleMDE agar tidak dibuat ulang di setiap render
  const mdeOptions = useMemo(() => {
    return {
      spellChecker: false,
      minHeight: "300px",
      // Kamu bisa tambah opsi lain di sini jika perlu, cek dokumentasi EasyMDE
    };
  }, []);

  return (
    <form action={formAction} className="space-y-8">
      {/* Input tersembunyi untuk ID, hanya ada saat mode edit */}
      {project && <input type="hidden" name="id" value={project.id} />}

      {/* Grid Layout untuk Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-semibold text-light/80"
          >
            Project Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={project?.name ?? ""}
            className="w-full p-3 bg-neutral-800 rounded border border-light/20 focus:ring-2 focus:ring-accent outline-none"
          />
          {state.errors?.name && (
            <p className="text-red-400 text-sm mt-1">{state.errors.name[0]}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="slug"
            className="block mb-2 font-semibold text-light/80"
          >
            URL Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            defaultValue={project?.slug ?? ""}
            className="w-full p-3 bg-neutral-800 rounded border border-light/20 focus:ring-2 focus:ring-accent outline-none"
          />
          {state.errors?.slug && (
            <p className="text-red-400 text-sm mt-1">{state.errors.slug[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-2 font-semibold text-light/80"
        >
          Short Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={project?.description ?? ""}
          className="w-full p-3 bg-neutral-800 rounded border border-light/20 focus:ring-2 focus:ring-accent outline-none"
          rows={3}
        ></textarea>
        {state.errors?.description && (
          <p className="text-red-400 text-sm mt-1">
            {state.errors.description[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="case_study"
          className="block mb-2 font-semibold text-light/80"
        >
          Case Study (Markdown)
        </label>
        {/* Editor Markdown sebagai controlled component */}
        <SimpleMDE
          id="case_study_editor"
          value={caseStudyContent}
          onChange={handleCaseStudyChange}
          options={mdeOptions}
        />
        {/* Textarea ini tersembunyi, tapi nilainya akan dikirim bersama form */}
        <textarea
          name="case_study"
          value={caseStudyContent}
          className="hidden"
          readOnly
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="stack"
            className="block mb-2 font-semibold text-light/80"
          >
            Tech Stack (comma separated)
          </label>
          <input
            type="text"
            id="stack"
            name="stack"
            defaultValue={project?.stack ?? ""}
            className="w-full p-3 bg-neutral-800 rounded border border-light/20 focus:ring-2 focus:ring-accent outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="image_url"
            className="block mb-2 font-semibold text-light/80"
          >
            Image URL
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            defaultValue={project?.image_url ?? ""}
            className="w-full p-3 bg-neutral-800 rounded border border-light/20 focus:ring-2 focus:ring-accent outline-none"
          />
          {state.errors?.image_url && (
            <p className="text-red-400 text-sm mt-1">
              {state.errors.image_url[0]}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="live_url"
            className="block mb-2 font-semibold text-light/80"
          >
            Live URL
          </label>
          <input
            type="url"
            id="live_url"
            name="live_url"
            defaultValue={project?.live_url ?? ""}
            className="w-full p-3 bg-neutral-800 rounded border border-light/20 focus:ring-2 focus:ring-accent outline-none"
          />
          {state.errors?.live_url && (
            <p className="text-red-400 text-sm mt-1">
              {state.errors.live_url[0]}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="repo_url"
            className="block mb-2 font-semibold text-light/80"
          >
            Repository URL
          </label>
          <input
            type="url"
            id="repo_url"
            name="repo_url"
            defaultValue={project?.repo_url ?? ""}
            className="w-full p-3 bg-neutral-800 rounded border border-light/20 focus:ring-2 focus:ring-accent outline-none"
          />
          {state.errors?.repo_url && (
            <p className="text-red-400 text-sm mt-1">
              {state.errors.repo_url[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-8 pt-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_featured"
            id="is_featured"
            defaultChecked={project?.is_featured ?? false}
            className="h-5 w-5 rounded bg-neutral-700 border-light/30 text-secondary focus:ring-secondary"
          />
          <label htmlFor="is_featured" className="font-semibold text-light/80">
            Is Featured?
          </label>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="order_index" className="font-semibold text-light/80">
            Order Index
          </label>
          <input
            type="number"
            id="order_index"
            name="order_index"
            defaultValue={project?.order_index ?? 99}
            className="p-2 bg-neutral-800 rounded border border-light/20 w-24 focus:ring-2 focus:ring-accent outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-light/10">
        <SubmitButton isEditing={isEditing} />
        {state.message && (
          <p className="text-red-400 font-semibold">{state.message}</p>
        )}
      </div>
    </form>
  );
}
