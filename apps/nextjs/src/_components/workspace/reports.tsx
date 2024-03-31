"use client";

import type { ReactNode } from "react";
import { Emoji } from "emoji-picker-react";

import type { RouterOutputs } from "@acme/api";
import type { Session } from "@acme/auth";
import { DayType } from "@acme/db";
import { cn } from "@acme/ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@acme/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import { Card } from "@acme/ui/card";
import { Icons } from "@acme/ui/icons";
import { toast } from "@acme/ui/toast";

import { FillMyDayModal } from "~/_components/modals";
import { getAvatarFallback, isObjectEmpty } from "~/_utils/common";
import { getDayType } from "~/_utils/days";
import { api } from "~/trpc/react";
import { Markdown } from "./markdown";
import { ReactionRow } from "./reactions";

/* Local constants & types
============================================================================= */
interface Props {
  pulse?: boolean;
}

/* <ReportList />
============================================================================= */
export function ReportList(props: {
  date: Date;
  sprint?: RouterOutputs["sprint"]["byDateRange"][number];
  projects: RouterOutputs["project"]["byWorkspaceId"];
  user: RouterOutputs["user"]["byWorkspaceId"][number];
  session: Session;
  workspaceId: string;
  isAuth: boolean;
}) {
  const dayType = getDayType(props.sprint && DayType[props.sprint.type]);

  if (isObjectEmpty(props.sprint) || !dayType) {
    return (
      <ReportCard className="flex flex-col items-center justify-center gap-6">
        <p>No availability & No report</p>

        {props.isAuth && (
          <FillMyDayModal
            date={props.date}
            projects={props.projects}
            workspaceId={props.workspaceId}
            userId={props.session.user.id}
          />
        )}
      </ReportCard>
    );
  }

  return (
    <ReportCard>
      {props.sprint?.mood && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          {/* TODO: Hydration error */}
          <Emoji unified={props.sprint.mood} size={18} />
        </div>
      )}

      <h6 className="flex items-center leading-[0]">
        <span className={cn("mr-2 size-1.5 rounded bg-current", dayType.color)}>
          &nbsp;
        </span>
        {dayType.name}
        {props.isAuth && <DeleteReport id={props.sprint?.id!} />}
      </h6>

      {!props.sprint?.reports?.length ? (
        <div className="flex flex-col gap-2 text-center">
          <dayType.icon className="mx-auto text-3xl" />
          {dayType?.description ? (
            <span>
              {dayType.description.replace("{name}", props.user.name)}
            </span>
          ) : (
            <span>No report yet</span>
          )}
        </div>
      ) : (
        <>
          {props.sprint?.reports.map((report) => (
            <ReportRow key={report.id} report={report} />
          ))}

          {props.sprint?.tomorrowsDescription && (
            <>
              <Markdown content={props.sprint?.tomorrowsDescription} />
            </>
          )}
        </>
      )}

      {/* {props.sprint && (
        <ReactionRow
          userId={props.session.user.id}
          sprintId={props.sprint.id}
        />
      )} */}

      {props.isAuth && (
        <FillMyDayModal
          date={props.date}
          projects={props.projects}
          sprint={props.sprint}
          workspaceId={props.workspaceId}
          userId={props.session.user.id}
        />
      )}
    </ReportCard>
  );
}

/* <DeleteReport />
============================================================================= */
export const DeleteReport = ({ id }: { id: string }) => {
  const utils = api.useUtils();
  const deleteSprint = api.sprint.delete.useMutation({
    async onSuccess() {
      toast.success("Your daily report successfully deleted!");

      await utils.sprint.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete sprint"
          : "Failed to delete sprint",
      );
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 size-9 text-red-500 hover:text-red-500"
        >
          <Icons.Trash2 className="size-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            report <span></span> and remove all related data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteSprint.mutate(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

/* <ReportCard />
============================================================================= */
export const ReportCard = (props: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "relative flex min-h-[12rem] w-full flex-col gap-4 p-4",
        props.className,
      )}
    >
      {props.children}
    </Card>
  );
};

/* <ReportRow />
============================================================================= */
export const ReportRow = (props: {
  report: RouterOutputs["sprint"]["byDateRange"][number]["reports"][number];
}) => {
  if (!props.report) {
    return null;
  }

  return (
    <section className="space-y-2">
      <header className="flex  items-center gap-2 text-sm">
        <Avatar className="size-6">
          <AvatarImage src={props.report.project.image} />
          <AvatarFallback>
            {getAvatarFallback(props.report.project.name)}
          </AvatarFallback>
        </Avatar>

        <p className="m-0 flex-1 truncate">{props.report.project.name}</p>
        <span className="inline-flex items-center gap-1">
          <Icons.Clock4 className="size-3" />
          {props.report.hours}h
        </span>
      </header>

      {props.report?.description && (
        <Markdown content={props.report?.description} />
      )}
    </section>
  );
};

/* <ReportCardSkeleton />
============================================================================= */
export const ReportCardSkeleton: React.FC<Props> = ({ pulse = true }) => {
  return (
    <div className="min-h-[12rem] w-full rounded border border-white px-3 py-2 text-white shadow">
      <h6 className="mb-4 flex items-center">
        <Icons.Dot
          className={cn("text-md mr-2", {
            "animate-pulse": pulse,
          })}
        />
        <span
          className={cn(
            "w-3/4 rounded bg-current text-sm font-bold uppercase",
            {
              "animate-pulse": pulse,
            },
          )}
        >
          &nbsp;
        </span>
      </h6>

      <DayReportSkeleton />
      <DayReportSkeleton />
    </div>
  );
};

/* <DayReportSkeleton />
============================================================================= */
export const DayReportSkeleton: React.FC<Props> = ({ pulse = true }) => {
  return (
    <section className="mb-4">
      <header className="mb-4 flex items-center gap-2 text-sm">
        <picture
          className={cn(
            "h-5 w-5 flex-none overflow-hidden rounded-full border bg-pink-400",
            {
              "animate-pulse": pulse,
            },
          )}
        />
        <p
          className={cn("mb-0 w-3/4 rounded bg-current text-sm", {
            "animate-pulse": pulse,
          })}
        >
          &nbsp;
        </p>
        <span
          className={cn("w-1/4 rounded bg-current text-xs", {
            "animate-pulse": pulse,
          })}
        >
          &nbsp;
        </span>
      </header>

      {[...Array<never>(2)].map((_, index) => (
        <p
          key={index}
          className={cn("mb-2 w-full rounded bg-current text-xxs", {
            "animate-pulse": pulse,
          })}
        >
          &nbsp;
        </p>
      ))}
    </section>
  );
};

/* <ReportPictureSkeleton />
============================================================================= */
export const ReportPictureSkeleton: React.FC<Props> = ({ pulse = true }) => {
  return (
    <div className="sticky bottom-4 top-36 flex h-24 w-36 flex-none flex-col items-center">
      <picture
        className={cn(
          "mb-4 h-12 w-12 overflow-hidden rounded-full border bg-pink-400",
          {
            "animate-pulse": pulse,
          },
        )}
      />
      <h2
        className={cn("w-1/3 rounded bg-current font-bold uppercase", {
          "animate-pulse": pulse,
        })}
      >
        &nbsp;
      </h2>
    </div>
  );
};
