import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import routes from "~/app/_lib/routes";
import { WeekList } from "./_components/WeekList";
import WorkspaceHeader from "./_components/WorkspaceHeader";
import WorkspaceTimer from "./_components/WorkspaceTimer";
import { getWeekdays } from "./_lib/days";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const cookieStore = cookies();
  const weekend = Boolean(cookieStore.get("weekend"));
  const weekdays = getWeekdays(weekend);

  if (!session) {
    redirect(routes.home);
  }

  return (
    <section>
      <WorkspaceTimer />
      <WorkspaceHeader />
      <WeekList weekend={weekend} weekdays={weekdays} />

      {children}
    </section>
  );
}
