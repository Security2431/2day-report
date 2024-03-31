import Link from "next/link";

import type { Icon } from "@acme/ui/icons";
import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";

import { NavLink } from "./nav-link";

/* Local constants & types
============================================================================= */
export interface NavigationItemType {
  icon: Icon;
  text: string;
  href: string;
}

// FIXME: Add union types either sub or tooltip are available
export type NavigationType = NavigationItemType & {
  sub?: NavigationItemType[];
  tooltip?: string;
  isActive?: boolean;
};

/* Props - <NavItem />
============================================================================= */
type Props = NavigationType;

/* <NavItem />
============================================================================= */
export const NavItem = (props: Props) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-lg", {
            "bg-muted": props.isActive,
          })}
          aria-label={props.text}
          asChild
        >
          <Link href={props.href}>
            <props.icon className="size-5" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5} className="p-1.5">
        {props.sub?.map((item) => (
          <NavLink key={item.href} href={item.href}>
            <item.icon className="h-4 w-4" />
            {item.text}
          </NavLink>
        ))}
        {props.tooltip ?? null}
      </TooltipContent>
    </Tooltip>
  );
};
