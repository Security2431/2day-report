import { Suspense } from "react";

import { Title } from "@acme/ui/title";

import Footer from "~/_components/footer";
import Header from "~/_components/header";
import { CreateWorkspacesModal } from "~/_components/modals";
import { WorkspaceCardSkeleton, WorkspaceList } from "~/_components/workspaces";
import { api, HydrateClient } from "~/trpc/server";

// export const runtime = "edge";

export default function WorkspacesPage() {
  // You can await this here if you don't want to show Suspense fallback below
  void api.workspace.all.prefetch();

  return (
    <HydrateClient>
      <header>
        <Header />
      </header>
      <main>
        <section className="container">
          <header className="mb-12 grid grid-flow-col grid-cols-6">
            <Title className="col-span-4 col-start-2" asChild variant="h1">
              <h1>My Workspaces</h1>
            </Title>
            <CreateWorkspacesModal className="col-span-1 col-start-6" />
          </header>
          <Suspense
            fallback={
              <div className="grid grid-cols-4 gap-4">
                <WorkspaceCardSkeleton />
                <WorkspaceCardSkeleton />
                <WorkspaceCardSkeleton />
              </div>
            }
          >
            <WorkspaceList />
          </Suspense>
        </section>
      </main>

      <footer className="flex items-end">
        <Footer />
      </footer>
    </HydrateClient>
  );
}
