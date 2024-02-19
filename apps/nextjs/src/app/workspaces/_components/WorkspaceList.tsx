"use client";

import { use } from "react";

import type { RouterOutputs } from "@acme/api";

import { api } from "~/trpc/react";
import WorkspaceCard from "./WorkspaceCard";

/* <WorkspaceList />
============================================================================= */
const WorkspaceList = (props: {
  workspaces: Promise<RouterOutputs["workspace"]["all"]>;
}) => {
  // TODO: Make `useSuspenseQuery` work without having to pass a promise from RSC
  const initialData = use(props.workspaces);
  const { data: workspaces } = api.workspace.all.useQuery(undefined, {
    initialData,
  });

  if (workspaces.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-2xl text-white">No workspaces yet...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {workspaces.map((workspace) => {
        return <WorkspaceCard key={workspace.id} workspace={workspace} />;
      })}
    </div>
  );
};

export default WorkspaceList;
