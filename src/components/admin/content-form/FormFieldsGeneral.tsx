// src/components/admin/content-form/FormFieldsGeneral.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField } from "./FormField";

interface Props {
  defaultValues: {
    title?: string;
    slug?: string;
    contentType?: string;
    status?: string;
  };
  errors?: any;
  onContentTypeChange: (value: string) => void;
}

export function FormFieldsGeneral({
  defaultValues,
  errors,
  onContentTypeChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField label="Content Type" error={errors?.content_type}>
        <select
          name="content_type"
          id="content_type"
          defaultValue={defaultValues.contentType}
          onChange={(e) => onContentTypeChange(e.target.value)}
        >
          <option value="project">Project</option>
          <option value="article">Article</option>
          <option value="quote">Quote</option>
          <option value="review">Review</option>
          <option value="experiment">Experiment</option>
        </select>
      </FormField>
      <FormField label="Status" error={errors?.status}>
        <select name="status" id="status" defaultValue={defaultValues.status}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </FormField>
      <FormField label="Title" error={errors?.title}>
        <input type="text" name="title" defaultValue={defaultValues.title} />
      </FormField>
      <FormField label="URL Slug" error={errors?.slug}>
        <input type="text" name="slug" defaultValue={defaultValues.slug} />
      </FormField>
    </div>
  );
}
