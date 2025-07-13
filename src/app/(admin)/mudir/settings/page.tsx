// src/app/(admin)/mudir/settings/page.tsx
import { createClient } from "@/lib/supabase/server";
import SettingsPageClient from "./client-page";

async function getSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*");
  return data ?? [];
}

export default async function SettingsPageContainer() {
  const settings = await getSettings();
  return <SettingsPageClient settings={settings} />;
}
