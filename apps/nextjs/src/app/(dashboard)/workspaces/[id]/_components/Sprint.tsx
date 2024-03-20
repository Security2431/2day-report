"use client";

import React, { use, useMemo } from "react";
import { isSameDay } from "date-fns";

import type { RouterOutputs } from "@acme/api";
import type { Session } from "@acme/auth";
import { cn } from "@acme/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";

import { getAvatarFallback } from "~/_utils/common";
import { getDaysOfWeek, getWeekdays } from "~/_utils/days";
import { api } from "~/trpc/react";
import { ReportList } from "./reports";

/* <Sprint />
============================================================================= */
export const Sprint = (props: {
  session: Session;
  users: Promise<RouterOutputs["user"]["byWorkspaceId"]>;
  projects: Promise<RouterOutputs["project"]["byWorkspaceId"]>;
  sprints: Promise<RouterOutputs["sprint"]["byDateRange"]>;
  weekend: boolean;
  workspaceId: string;
  today: string;
}) => {
  const showDaysPerWeek = getWeekdays(props.weekend);
  const weekdays = getDaysOfWeek(props.today);

  // TODO: Make `useSuspenseQuery` work without having to pass a promise from RSC
  const { data: users } = api.user.byWorkspaceId.useQuery(
    {
      workspaceId: props.workspaceId,
    },
    {
      initialData: use(props.users),
    },
  );

  const { data: projects } = api.project.byWorkspaceId.useQuery(
    {
      id: props.workspaceId,
    },
    {
      initialData: use(props.projects),
    },
  );

  const { data: sprints } = api.sprint.byDateRange.useQuery(
    {
      from: weekdays.at(0)!.date,
      to: weekdays.at(-1)!.date,
      workspaceId: props.workspaceId,
    },
    {
      initialData: use(props.sprints),
    },
  );

  const sortedUsers = useMemo(() => {
    const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

    const movePersonInArray = (
      userId: string,
      users: RouterOutputs["user"]["byWorkspaceId"],
    ) => {
      const user = users.find((user) => user.id === userId);
      // remove the item from the array

      const filteredUsers = users.filter((p) => p.id !== userId);
      // add it at the beginning
      return [
        { ...user },
        ...filteredUsers,
      ] as RouterOutputs["user"]["byWorkspaceId"];
    };

    return movePersonInArray(props.session.user.id, sortedUsers);
  }, [users, props.session]);

  return (
    <>
      {sortedUsers.map((user) => (
        <section
          key={user.id}
          className={cn("my-4 flex items-start justify-stretch gap-3 px-3")}
        >
          <div className="sticky bottom-4 top-36 flex h-24 w-36 flex-none flex-col items-center text-center">
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{getAvatarFallback(user.name)}</AvatarFallback>
            </Avatar>
            <h4 className="w-full truncate text-sm">{user.name}</h4>
          </div>
          {weekdays.slice(0, showDaysPerWeek).map((weekday) => (
            <ReportList
              key={weekday.date.toString()}
              date={weekday.date}
              sprint={sprints?.find(
                (sprint) =>
                  isSameDay(weekday.date, sprint.date) &&
                  sprint.user.id === user.id,
              )}
              projects={projects}
              workspaceId={props.workspaceId}
              isAuth={props.session.user.id === user.id}
              session={props.session}
              user={user}
            />
          ))}
        </section>
      ))}
    </>
  );
};
