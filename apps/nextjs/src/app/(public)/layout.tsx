import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import routes from "~/_utils/routes";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect(routes.workspaces);
  }

  return <>{children}</>;
}
