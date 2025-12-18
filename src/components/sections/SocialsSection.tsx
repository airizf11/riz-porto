// src/components/sections/SocialsSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SocialsClient } from "./SocialsClient";
import { getGroupedSocialLinks } from "@/services/socials";

export const SocialsSection = async () => {
  const socialGroups: any[] = await getGroupedSocialLinks();

  return <SocialsClient socialGroups={socialGroups} />;
};
