"use client";

import { createContext } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@acme/ui";

import type { NavigationType } from "./nav-item";
import { NavItem } from "./nav-item";

/* Local constants & types
============================================================================= */
export const CollapsedContext = createContext<boolean>(false);

/* Props - <Navigation />
============================================================================= */
interface Props {
  links: NavigationType[];
  className?: string;
}

/* <Navigation />
============================================================================= */
export function Navigation({ links, className }: Props) {
  const pathname = usePathname();

  return (
    <nav className={cn("grid gap-1 p-2", className)}>
      {links.map((item) => (
        <NavItem
          isActive={item.sub?.some((item) => item.href === pathname)}
          key={item.text}
          {...item}
        />
      ))}
    </nav>
  );
}
