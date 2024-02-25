"use client";

import React, { use, useMemo } from "react";
import clsx from "clsx";
import { isSameDay } from "date-fns";

import type { RouterOutputs } from "@acme/api";
import type { Session } from "@acme/auth";

import Avatar from "~/app/_components/avatar";
import { api } from "~/trpc/react";
import { getDaysOfWeek, getWeekdays } from "../_lib/days";
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
    <article>
      {sortedUsers.map((user) => (
        <section
          key={user.id}
          className={clsx("my-4 grid items-start gap-4", {
            "grid-cols-6": !props.weekend,
            "grid-cols-8": props.weekend,
          })}
        >
          <div className="sticky bottom-4 top-36 flex h-24 flex-col items-center">
            <Avatar src={user.image} alt="" />
            <h4>{user.name}</h4>
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
    </article>
  );
};
