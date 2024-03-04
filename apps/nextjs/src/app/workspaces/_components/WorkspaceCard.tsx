"use client";

import Link from "next/link";
import { BsGear } from "react-icons/bs";
import { HiOutlineArrowRight, HiUsers } from "react-icons/hi";

import type { RouterOutputs } from "@acme/api";
import { Role } from "@acme/db";

import Button from "~/app/_components/button";
import Heading from "~/app/_components/heading";
import { NO_AVATAR_IMG } from "~/app/_lib/constants";
import routes from "~/app/_lib/routes";

/* <WorkspaceCard />
============================================================================= */
interface Props {
  workspace: RouterOutputs["workspace"]["all"][number];
}

/* <WorkspaceCard />
============================================================================= */
const WorkspaceCard: React.FC<Props> = (props) => {
  return (
    <div className="relative flex h-64 max-w-sm flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-white p-4 shadow-lg  hover:bg-[#2e026fff]">
      {props.workspace.workspacePermissions.includes(Role.ADMIN) && (
        <Link href={`/workspace/${props.workspace.id}/settings`}>
          <Button className="absolute right-0 top-0 border-none px-4 py-4">
            <BsGear />
          </Button>
        </Link>
      )}

      <img
        className="h-12 w-12 rounded-full"
        src={props.workspace.image ? props.workspace.image : NO_AVATAR_IMG}
        alt={props.workspace.name}
      />
      <Heading className="w-full truncate whitespace-nowrap text-xl font-bold">
        {props.workspace.name}
      </Heading>
      <span className="flex items-center">
        <HiUsers className="mr-2" />
        {props.workspace.people}{" "}
        {props.workspace.people > 1 ? "people" : "person"}
      </span>
      <Link href={routes.workspace(props.workspace.id)}>
        <Button>
          <HiOutlineArrowRight className="mr-2" /> Enter
        </Button>
      </Link>
    </div>
  );
};

export default WorkspaceCard;
