"use client";

import Link from "next/link";

import type { RouterOutputs } from "@acme/api";
import { Role } from "@acme/db";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import { Card } from "@acme/ui/card";
import { Icons } from "@acme/ui/icons";
import { Title } from "@acme/ui/title";

import { getAvatarFallback } from "~/_utils/common";
import routes from "~/_utils/routes";

/* <WorkspaceCard />
============================================================================= */
export function WorkspaceCard(
  props: RouterOutputs["workspace"]["all"][number],
) {
  return (
    <Card className="relative flex flex-col items-center justify-center gap-3 p-6">
      {props.workspace.workspacePermissions.includes(Role.ADMIN) && (
        <Button variant="ghost" size="icon" className="size-8" asChild>
          <Link
            href={routes.workspaceSettings(props.workspace.id)}
            className="absolute right-0 top-0"
          >
            <Icons.Settings className="size-4" />
            <span className="sr-only">Settings</span>
          </Link>
        </Button>
      )}

      <Avatar>
        <AvatarImage src={props.workspace.image} />
        <AvatarFallback>
          {getAvatarFallback(props.workspace.name)}
        </AvatarFallback>
      </Avatar>

      <Title className="w-full truncate whitespace-nowrap text-xl font-bold leading-none">
        {props.workspace.name}
      </Title>
      <span className="flex items-center">
        <Icons.Users size={16} className="mr-2" />
        {props.workspace.people}{" "}
        {props.workspace.people > 1 ? "people" : "person"}
      </span>
      <Button variant="outline" asChild>
        <Link href={routes.workspace(props.workspace.id)}>
          <Icons.ArrowRight size={18} className="mr-2" /> Enter
        </Link>
      </Button>
      {/* </div> */}
    </Card>
  );
}
