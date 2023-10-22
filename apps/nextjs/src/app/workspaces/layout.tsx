import { redirect } from "next/navigation";
import { HiPlus } from "react-icons/hi";

import { auth } from "@acme/auth";

import Button from "../_components/button";
import Heading from "../_components/heading";
import routes from "../_lib/routes";

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
        <Button className="col-start-5">
          <HiPlus className="mr-2" /> Add new workspaces
        </Button>
      </header>
      {children}
    </section>
  );
}
