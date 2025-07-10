// src/components/admin/content-form/FormFieldsTags.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField } from "./FormField";

interface Props {
  contentType: string;
  topicTags: string;
  techTags: string;
  errors?: any;
}

export function FormFieldsTags({
  contentType,
  topicTags,
  techTags,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        label="Topic Tags (comma separated)"
        error={errors?.topic_tags}
      >
        <input type="text" name="topic_tags" defaultValue={topicTags} />
      </FormField>
      {contentType === "project" && (
        <FormField
          label="Tech Tags (comma separated)"
          error={errors?.tech_tags}
        >
          <input type="text" name="tech_tags" defaultValue={techTags} />
        </FormField>
      )}
    </div>
  );
}
