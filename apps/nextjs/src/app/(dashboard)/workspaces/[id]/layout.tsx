import { notFound } from "next/navigation";

import { Navigation } from "~/_components/navigation";
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
    <>
      <div className="flex">
        <Navigation />

        <article className="flex-1">{children}</article>
      </div>
    </>
  );
}
