"use client";

import { useContext } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

import Heading from "~/app/_components/heading";
import routes from "~/app/_lib/routes";
import { CollapsedContext } from "./navigation";

/* Local constants & types
============================================================================= */
export type NavigationItemType = {
  icon: IconType;
  text: string;
  href: string;
};

/* Props - <NavigationScope />
============================================================================= */
type Props = {
  navigation: NavigationItemType[];
  className?: string;
  title: NavigationItemType;
};

/* <NavigationScope />
============================================================================= */
export function NavigationScope({ title, navigation, className }: Props) {
  const isCollapsed = useContext(CollapsedContext);

  if (isCollapsed) {
    return (
      <Link
        className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-white hover:text-purple-500"
        href={title.href}
      >
        <title.icon />
      </Link>
    );
  }

  return (
    <section className={twMerge("mb-2.5", className)}>
      {title && (
        <Heading className="mb-1 text-left" as="h6">
          {title.text}
        </Heading>
      )}

      <nav>
        {navigation.map((item) => (
          <Link
            key={item.text}
            className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-white hover:text-purple-500"
            href={item.href}
          >
            <item.icon /> {item.text}
          </Link>
        ))}
      </nav>
    </section>
  );
}
