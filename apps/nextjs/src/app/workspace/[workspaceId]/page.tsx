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
import { getDaysOfWeek } from "./_lib/days";

// export const runtime = "edge";

export default async function WorkspacePage({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const session = await auth();

  const cookieStore = cookies();
  const weekend = Boolean(cookieStore.get("weekend"));

  const today = searchParams?.today as string;
  const weekdays = getDaysOfWeek(today);

  // // You can await this here if you don't want to show Suspense fallback below
  const sprints = api.sprint.byDateRange({
    from: weekdays.at(0)!.date,
    to: weekdays.at(-1)!.date,
    workspaceId: params.workspaceId,
  });

  const users = api.user.byWorkspaceId({
    workspaceId: params.workspaceId,
  });

  const projects = api.project.byWorkspaceId({
    id: params.workspaceId,
  });

  const cards = [...Array(weekdays)];

  return (
    <Suspense
      fallback={
        <div
          className={clsx("my-4 grid items-stretch gap-4", {
            "grid-cols-6": !weekend,
            "grid-cols-8": weekend,
          })}
        >
          <ReportPictureSkeleton />
          {cards.map((_, index) => (
            <ReportCardSkeleton key={index} />
          ))}
        </div>
      }
    >
      <Sprint
        session={session!}
        users={users}
        projects={projects}
        sprints={sprints}
        weekend={weekend}
        workspaceId={params.workspaceId}
        today={today}
      />
    </Suspense>
  );
}
