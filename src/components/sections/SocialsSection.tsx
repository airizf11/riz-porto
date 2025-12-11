// src/components/sections/SocialsSection.tsx
import { getGroupedSocialLinks } from "@/lib/data";
import { SocialsClient } from "./SocialsClient";

export const SocialsSection = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socialGroups: any[] = await getGroupedSocialLinks();

  return <SocialsClient socialGroups={socialGroups} />;
};
