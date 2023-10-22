import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import routes from "~/app/_lib/routes";
import { WeekList } from "./_components/WeekList";
import WorkspaceHeader from "./_components/WorkspaceHeader";
import { WeekendProvider } from "./providers";

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
    <WeekendProvider>
      <section>
        <WorkspaceHeader />
        <WeekList />

        {children}
      </section>
    </WeekendProvider>
  );
}
