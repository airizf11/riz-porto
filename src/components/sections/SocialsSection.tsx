// src/components/sections/SocialsSection.tsx
import { SocialsClient } from "./SocialsClient";
import { getGroupedSocialLinks } from "@/services/socials";

export const SocialsSection = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socialGroups: any[] = await getGroupedSocialLinks();

  return <SocialsClient socialGroups={socialGroups} />;
};
