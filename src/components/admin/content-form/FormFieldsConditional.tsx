// src/components/admin/content-form/FormFieldsConditional.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField } from "./FormField";

interface Props {
  contentType: string;
  defaultValues: {
    live_url?: string | null;
    repo_url?: string | null;
    author_name?: string | null;
  };
  errors?: any;
}

export function FormFieldsConditional({
  contentType,
  defaultValues,
  errors,
}: Props) {
  if (contentType === "project") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Live Demo URL" error={errors?.live_url}>
          <input
            type="url"
            name="live_url"
            defaultValue={defaultValues.live_url ?? ""}
          />
        </FormField>
        <FormField label="Repository URL" error={errors?.repo_url}>
          <input
            type="url"
            name="repo_url"
            defaultValue={defaultValues.repo_url ?? ""}
          />
        </FormField>
      </div>
    );
  }
  if (contentType === "quote") {
    return (
      <FormField label="Author Name" error={errors?.author_name}>
        <input
          type="text"
          name="author_name"
          defaultValue={defaultValues.author_name ?? ""}
        />
      </FormField>
    );
  }
  return null;
}
