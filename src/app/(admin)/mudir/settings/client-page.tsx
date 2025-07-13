// src/app/(admin)/mudir/settings/page.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateSiteSettings, type FormState } from "./actions";

type SiteSetting = {
  key: string;
  value: string | null;
  description: string | null;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-8 py-3 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 disabled:bg-primary/50 disabled:cursor-not-allowed"
    >
      {pending ? "Saving..." : "Save All Settings"}
    </button>
  );
}

export default function SettingsPage({
  settings,
}: {
  settings: SiteSetting[];
}) {
  const initialState: FormState = { message: "", success: false };
  const [state, formAction] = useActionState(updateSiteSettings, initialState);

  const renderInput = (setting: SiteSetting) => {
    if (setting.key.includes("narrative") || setting.key.includes("headline")) {
      return (
        <textarea
          name={setting.key}
          id={setting.key}
          defaultValue={setting.value ?? ""}
          rows={4}
          className="w-full p-3 bg-neutral-800 rounded-lg border border-light/20 focus:ring-2 focus:ring-accent outline-none"
        />
      );
    }
    return (
      <input
        type="text"
        name={setting.key}
        id={setting.key}
        defaultValue={setting.value ?? ""}
        className="w-full p-3 bg-neutral-800 rounded-lg border border-light/20 focus:ring-2 focus:ring-accent outline-none"
      />
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Site Settings</h2>
        <p className="text-light/60 mt-2">
          Manage the global content of your site, like the hero and about
          sections.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        {settings
          .sort((a, b) => a.key.localeCompare(b.key))
          .map((setting) => (
            <div key={setting.key}>
              <label
                htmlFor={setting.key}
                className="block mb-2 font-semibold text-light/80 capitalize"
              >
                {setting.key.replace(/_/g, " ")}
              </label>
              {setting.description && (
                <p className="text-sm text-light/50 mb-2">
                  {setting.description}
                </p>
              )}
              {renderInput(setting)}
            </div>
          ))}

        <div className="pt-4 flex items-center gap-4">
          <SubmitButton />
          {state.message && (
            <p
              className={`font-semibold ${
                state.success ? "text-green-400" : "text-red-400"
              }`}
            >
              {state.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
