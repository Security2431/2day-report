import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import routes from "~/app/_lib/routes";
import { ManageWeek } from "./_components/ManageWeek";
import { WeekList } from "./_components/WeekList";
import { getWeekdays } from "./_lib/days";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const cookieStore = cookies();
  const weekend = JSON.parse(cookieStore.get("weekend")?.value ?? null);
  const weekdays = getWeekdays(weekend);

  if (!session) {
    redirect(routes.home);
  }

  return (
    <>
      <ManageWeek />
      <WeekList weekend={weekend} weekdays={weekdays} />

      {children}
    </>
  );
}
