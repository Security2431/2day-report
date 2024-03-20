"use client";

import type { IconType } from "react-icons";
import { useContext } from "react";
import Link from "next/link";

import { cn } from "@acme/ui";
import { Title } from "@acme/ui/title";

import { CollapsedContext } from "./navigation";

/* Local constants & types
============================================================================= */
export interface NavigationItemType {
  icon: IconType;
  text: string;
  href: string;
}

/* Props - <NavigationScope />
============================================================================= */
interface Props {
  navigation: NavigationItemType[];
  className?: string;
  title: NavigationItemType;
}

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
    <section className={cn("mb-2.5", className)}>
      {title && (
        <Title className="mb-1 text-left" asChild variant="h6">
          <h6>{title.text}</h6>
        </Title>
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
