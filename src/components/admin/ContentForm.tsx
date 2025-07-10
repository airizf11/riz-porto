// src/components/admin/ContentForm.tsx
"use client";

import { useActionState, useState, useMemo } from "react";
import { createOrUpdateContent } from "@/app/(admin)/mudir/content/actions";
import type { Database } from "@/types/supabase";

import { FormActions } from "./content-form/FormActions";
import { FormFieldsGeneral } from "./content-form/FormFieldsGeneral";
import { FormFieldsConditional } from "./content-form/FormFieldsConditional";
import { FormFieldsContent } from "./content-form/FormFieldsContent";
import { FormFieldsTags } from "./content-form/FormFieldsTags";
import { FormFieldsMeta } from "./content-form/FormFieldsMeta";

type ContentItem = Database["public"]["Tables"]["content_items"]["Row"];
type Tag = Database["public"]["Tables"]["tags"]["Row"];

interface ContentFormProps {
  contentItem?: (ContentItem & { tags: Tag[] | null }) | null;
}

export function ContentForm({ contentItem }: ContentFormProps) {
  const [state, formAction] = useActionState(createOrUpdateContent, {
    message: null,
    errors: {},
  });
  const isEditing = !!contentItem;

  const [contentType, setContentType] = useState(
    contentItem?.content_type ?? "project"
  );
  const [markdownContent, setMarkdownContent] = useState(
    contentItem?.content ?? ""
  );

  const topicTags = useMemo(
    () =>
      contentItem?.tags
        ?.filter((t) => t.tag_type === "topic")
        .map((t) => t.name)
        .join(", ") ?? "",
    [contentItem?.tags]
  );
  const techTags = useMemo(
    () =>
      contentItem?.tags
        ?.filter((t) => t.tag_type === "tech")
        .map((t) => t.name)
        .join(", ") ?? "",
    [contentItem?.tags]
  );

  return (
    <form action={formAction} className="space-y-8">
      {contentItem && <input type="hidden" name="id" value={contentItem.id} />}

      <FormFieldsGeneral
        defaultValues={{
          title: contentItem?.title ?? undefined,
          slug: contentItem?.slug ?? undefined,
          contentType: contentType,
          status: contentItem?.status ?? "draft",
        }}
        errors={state.errors}
        onContentTypeChange={setContentType}
      />

      <FormFieldsConditional
        contentType={contentType}
        defaultValues={{
          live_url: contentItem?.live_url,
          repo_url: contentItem?.repo_url,
          author_name: contentItem?.author_name,
        }}
        errors={state.errors}
      />

      <FormFieldsContent
        excerpt={contentItem?.excerpt ?? null}
        content={markdownContent}
        onContentChange={setMarkdownContent}
        errors={state.errors}
      />

      <FormFieldsTags
        contentType={contentType}
        topicTags={topicTags}
        techTags={techTags}
        errors={state.errors}
      />

      <FormFieldsMeta
        defaultValues={{
          cover_image_url: contentItem?.cover_image_url,
          is_featured: contentItem?.is_featured,
          order_index: contentItem?.order_index,
        }}
        errors={state.errors}
      />

      <FormActions isEditing={isEditing} state={state} />
    </form>
  );
}
