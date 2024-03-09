import { Suspense } from "react";
import { cookies } from "next/headers";
import clsx from "clsx";

import { auth } from "@acme/auth";

import { api } from "~/trpc/server";
import {
  ReportCardSkeleton,
  ReportPictureSkeleton,
} from "./_components/reports";
import { Sprint } from "./_components/Sprint";
import { getDaysOfWeek, getWeekdays } from "./_lib/days";

export const runtime = "edge";

export default async function WorkspacePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const session = await auth();

  const cookieStore = cookies();
  const weekend = JSON.parse(cookieStore.get("weekend")?.value ?? null);

  const today = searchParams?.today as string;
  const weekdays = getDaysOfWeek(today);

  // // You can await this here if you don't want to show Suspense fallback below
  // const sprints = api.sprint.byDateRange({
  //   from: weekdays.at(0)!.date,
  //   to: weekdays.at(-1)!.date,
  //   workspaceId: params.id,
  // });

  // const users = api.user.byWorkspaceId({
  //   workspaceId: params.id,
  // });

  // const projects = api.project.byWorkspaceId({
  //   id: params.id,
  // });

  const cards = [...Array<number>(getWeekdays(weekend))];

  return (
    <Suspense
      fallback={
        <>
          {[...Array<number>(2)].map((_, index) => (
            <div
              key={index}
              className={clsx(
                "my-4 flex items-start justify-stretch gap-3 px-3",
              )}
            >
              <ReportPictureSkeleton />
              {cards.map((_, index) => (
                <ReportCardSkeleton key={index} />
              ))}
            </div>
          ))}
        </>
      }
    >
      {/* <Sprint
        session={session!}
        users={users}
        projects={projects}
        sprints={sprints}
        weekend={weekend}
        workspaceId={params.id}
        today={today}
      /> */}
    </Suspense>
  );
}
