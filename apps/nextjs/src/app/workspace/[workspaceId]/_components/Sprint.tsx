"use client";

import React, { useContext, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import classNames from "classnames";
import { isSameDay } from "date-fns";

import type { Session } from "@acme/auth";

import Avatar from "~/app/_components/avatar";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { getDaysOfWeek } from "../_lib/days";
import { WeekendContext } from "../providers";
import { ReportList } from "./reports";

/* Props = <Sprint />
============================================================================= */
interface Props {
  session: Session;
}

/* <Sprint />
============================================================================= */
export const Sprint: React.FC<Props> = ({ session }) => {
  const params = useParams<{ workspaceId: string }>();
  const searchParams = useSearchParams();
  const { weekend, weekdays: showDaysPerWeek } = useContext(WeekendContext);

  const date = searchParams.get("today");
  const weekdays = getDaysOfWeek(date);

  const [users] = api.user.byWorkspaceId.useSuspenseQuery({
    workspaceId: params.workspaceId,
  });

  const [sprints] = api.sprint.byDateRange.useSuspenseQuery({
    from: weekdays.at(0)!.date,
    to: weekdays.at(-1)!.date,
    workspaceId: params.workspaceId,
  });

  const [projects] = api.project.byWorkspaceId.useSuspenseQuery({
    id: params.workspaceId,
  });

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
      return [{ ...user }, ...filteredUsers];
    };

    return movePersonInArray(session.user.id, sortedUsers);
  }, [users, session]);

  return (
    <article>
      {sortedUsers.map((user) => (
        <section
          key={user.id}
          className={classNames("my-4 grid items-start gap-4", {
            "grid-cols-6": !weekend,
            "grid-cols-8": weekend,
          })}
        >
          <div className="sticky bottom-4 top-36 flex h-24 flex-col items-center">
            <Avatar src={user.image!} alt="" />
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
              workspaceId={params.workspaceId}
              isAuth={session.user.id === user.id}
              user={session.user}
            />
          ))}
        </section>
      ))}
    </article>
  );
};
