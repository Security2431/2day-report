import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@acme/ui/button";
import { Icons } from "@acme/ui/icons";
import { TooltipProvider } from "@acme/ui/tooltip";

import { Sidebar } from "~/_components/workspaces/navigation";
import routes from "~/_utils/routes";
import { api } from "~/trpc/server";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const workspace = api.workspace.byId({ id: params.id });

  if (!(await workspace)) {
    notFound();
  }

  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[53px]">
        <Sidebar />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
            <Button
              variant="outline"
              size="icon"
              className="mr-2 size-7"
              asChild
            >
              <Link href={routes.workspaces}>
                <Icons.ChevronLeft className="size-4" />
                <span className="sr-only">Workspaces</span>
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">Teams Overview</h1>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-1.5 text-sm"
            >
              <Icons.Share className="size-3.5" />
              Share
            </Button>
          </header>
          <main className="flex flex-1 flex-col gap-4 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
