// src/components/admin/content-form/FormFieldsMeta.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField } from "./FormField";

interface Props {
  defaultValues: {
    cover_image_url?: string | null;
    is_featured?: boolean;
    order_index?: number | null;
  };
  errors?: any;
}

export function FormFieldsMeta({ defaultValues, errors }: Props) {
  return (
    <div className="space-y-6">
      <FormField label="Cover Image URL" error={errors?.cover_image_url}>
        <input
          type="url"
          name="cover_image_url"
          defaultValue={defaultValues.cover_image_url ?? ""}
        />
      </FormField>
      <div className="flex items-center gap-8 pt-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_featured"
            id="is_featured"
            defaultChecked={defaultValues.is_featured ?? false}
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
            defaultValue={defaultValues.order_index ?? 99}
            className="w-24 p-2 bg-neutral-800 rounded border border-light/20 focus:ring-2 focus:ring-accent outline-none"
          />
        </div>
      </div>
    </div>
  );
}
