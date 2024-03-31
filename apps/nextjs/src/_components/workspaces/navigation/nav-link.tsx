"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@acme/ui";

/* Props - <NavLink />
============================================================================= */
interface Props {
  href: string;
  children: React.ReactNode;
}

/* <NavLink />
============================================================================= */
export function NavLink({ href, children }: Props) {
  const pathName = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 font-bold text-muted-foreground transition-all hover:text-secondary-foreground",
        {
          "bg-primary text-secondary-foreground": pathName === href,
        },
      )}
    >
      {children}
    </Link>
  );
}
