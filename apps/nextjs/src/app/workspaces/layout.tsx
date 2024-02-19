import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import Heading from "../_components/heading";
import routes from "../_lib/routes";
import WorkspaceModal from "./_components/WorkspaceModal";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect(routes.home);
  }

  return (
    <section className="container">
      <header className="mb-12 grid grid-cols-5">
        <Heading as="h1" className="col-start-3 flex-1">
          My Workspaces
        </Heading>
        <WorkspaceModal className="col-start-5" />
      </header>

      {children}
    </section>
  );
}
