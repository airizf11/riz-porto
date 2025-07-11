// src/components/SocialsSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";
import { getGroupedSocialLinks } from "@/lib/data";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

export const SocialsSection = async () => {
  const socialGroups = await getGroupedSocialLinks();

  return (
    <AnimatedSection className="w-full py-20 md:py-32 bg-dark/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-8">
        <h2 className="heading text-4xl md:text-5xl text-center mb-16">
          Find Me <span className="text-tertiary">Online</span>
        </h2>
        <div className="flex flex-col gap-12">
          {socialGroups.map(
            (group: {
              category:
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | Key
                | null
                | undefined;
              borderColor: any;
              links: any[];
              color: any;
            }) => (
              <div key={String(group.category ?? "")}>
                <h3
                  className={`heading text-2xl mb-6 border-l-4 pl-4 ${group.borderColor}`}
                >
                  {group.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {group.links.map((link: any) => {
                    const Icon = link.icon;
                    return (
                      <a
                        href={link.url}
                        key={link.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out group-hover:scale-105">
                          {link.imageUrl && (
                            <Image
                              src={link.imageUrl}
                              alt={`Cover image for ${link.name}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/70"></div>

                          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                            <div className="flex items-center gap-3 mb-2">
                              {Icon && (
                                <Icon className={`text-3xl ${group.color}`} />
                              )}
                              <h4 className="font-bold text-2xl tracking-tight text-light">
                                {link.name}
                              </h4>
                            </div>
                            <p className="text-sm text-light/80">{link.desc}</p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};
