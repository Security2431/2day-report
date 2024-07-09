import { Suspense } from "react";
import { cookies } from "next/headers";

import { auth } from "@acme/auth";
import { cn } from "@acme/ui";

import { ManageWeek } from "~/_components/workspace/manage-week";
import {
  ReportCardSkeleton,
  ReportPictureSkeleton,
} from "~/_components/workspace/reports";
import { Sprint } from "~/_components/workspace/Sprint";
import { WeekList } from "~/_components/workspace/WeekList";
import { getDaysOfWeek, getWeekdays } from "~/_utils/days";
import { api, HydrateClient } from "~/trpc/server";

// export const runtime = "edge";

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
  void api.sprint.byDateRange.prefetch({
    from: weekdays.at(0)!.date,
    to: weekdays.at(-1)!.date,
    workspaceId: params.id,
  });

  void api.user.byWorkspaceId.prefetch({
    workspaceId: params.id,
  });

  void api.project.byWorkspaceId.prefetch({
    id: params.id,
  });

  const cards = [...Array<number>(getWeekdays(weekend))];

  return (
    <HydrateClient>
      <ManageWeek />
      <WeekList weekend={weekend} weekdays={getWeekdays(weekend)} />
      <Suspense
        fallback={
          <>
            {[...Array<number>(2)].map((_, index) => (
              <div
                key={index}
                className={cn(
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
        <Sprint
          session={session!}
          weekend={weekend}
          workspaceId={params.id}
          today={today}
        />
      </Suspense>
    </HydrateClient>
  );
}
