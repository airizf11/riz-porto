// src/components/admin/content-form/FormFieldsContent.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { FormField } from "./FormField";
import { useMemo } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface Props {
  excerpt: string | null;
  content: string | null;
  onContentChange: (value: string) => void;
  errors?: any;
}

export function FormFieldsContent({
  excerpt,
  content,
  onContentChange,
  errors,
}: Props) {
  const mdeOptions = useMemo(
    () => ({
      spellChecker: false,
      minHeight: "300px",
      // bisa add more opsi here
    }),
    []
  );

  return (
    <div className="space-y-6">
      <FormField label="Excerpt / Short Description" error={errors?.excerpt}>
        <textarea
          name="excerpt"
          defaultValue={excerpt ?? ""}
          rows={3}
        ></textarea>
      </FormField>
      <FormField
        label="Main Content / Case Study (Markdown)"
        error={errors?.content}
      >
        <SimpleMDE
          id="case_study_editor"
          value={content ?? ""}
          onChange={onContentChange}
          options={mdeOptions}
        />
        <textarea
          name="content"
          value={content ?? ""}
          className="hidden"
          readOnly
        />
      </FormField>
    </div>
  );
}
