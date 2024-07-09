"use client";

import { api } from "~/trpc/react";
import { WorkspaceCard } from "./_components/WorkspaceCard";

/* <WorkspaceList />
============================================================================= */
export function WorkspaceList() {
  // TODO: Make `useSuspenseQuery` work without having to pass a promise from RSC
  const [workspaces] = api.workspace.all.useSuspenseQuery();

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
}
