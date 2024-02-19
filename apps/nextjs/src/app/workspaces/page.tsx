import { Suspense } from "react";

import { api } from "~/trpc/server";
import WorkspaceCardSkeleton from "./_components/WorkspaceCardSkeleton";
import WorkspaceList from "./_components/WorkspaceList";

// export const runtime = "edge";

export default async function WorkspacePage() {
  // You can await this here if you don't want to show Suspense fallback below
  const workspaces = api.workspace.all();

  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-4 gap-4">
          <WorkspaceCardSkeleton />
          <WorkspaceCardSkeleton />
          <WorkspaceCardSkeleton />
        </div>
      }
    >
      <WorkspaceList workspaces={workspaces} />
    </Suspense>
  );
}
