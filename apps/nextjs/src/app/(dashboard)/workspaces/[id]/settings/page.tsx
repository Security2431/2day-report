import { api } from "~/trpc/server";
import { Settings } from "./_components/Settings";

export const runtime = "edge";

export default async function WorkspacesSettingsPage({
  params,
}: {
  params: { id: string };
}) {
  const workspace = api.workspace.byId({ id: params.id });

  // You can await this here if you don't want to show Suspense fallback below
  return <Settings workspace={workspace} id={params.id} />;
}
