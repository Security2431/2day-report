"use client";

import type { ReactNode } from "react";
import { useCallback } from "react";
import clsx from "clsx";
import { Emoji } from "emoji-picker-react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";

import type { RouterOutputs } from "@acme/api";
import type { Session } from "@acme/auth";

import Button from "~/app/_components/button";
import useConfirm from "~/app/_hooks/useConfirm";
import { api } from "~/trpc/react";
import { isObjectEmpty } from "../_lib/common";
import { DayTypes, getDayType } from "../_lib/days";
import { Markdown } from "./markdown";
import FilldayModal from "./modal/FilldayModal";
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
  const dayType = getDayType(props.sprint && DayTypes[props.sprint.type]);

  if (isObjectEmpty(props.sprint) || !dayType) {
    return (
      <ReportCard className="flex flex-col items-center justify-center gap-6">
        <p>No availability & No report</p>

        {props.isAuth && (
          <FilldayModal
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

      <h6 className="mb-2 flex items-center">
        <GoDotFill className={clsx("text-md", dayType.color)} />
        {dayType.name}
        {props.isAuth && <DeleteReport id={props.sprint?.id} />}
      </h6>

      {!props.sprint?.reports?.length ? (
        <div className="mb-2 flex flex-col gap-2 text-center">
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

      {props.sprint && (
        <ReactionRow
          userId={props.session.user.id}
          sprintId={props.sprint.id}
        />
      )}

      {props.isAuth && (
        <FilldayModal
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
export const DeleteReport = ({ id }: { id?: string }) => {
  const utils = api.useUtils();
  const [Dialog, confirmDelete] = useConfirm(
    "Are you sure?",
    "Surely you want delete this report?",
  );

  const deleteSprint = api.sprint.delete.useMutation({
    async onSuccess() {
      toast.success("Your sprint day deleted successfully!");

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

  const handleDelete = useCallback(async () => {
    const ans = await confirmDelete();

    if (ans && id) {
      deleteSprint.mutate(id);
    }
  }, [confirmDelete, deleteSprint, id]);

  return (
    <>
      <Button
        onClick={handleDelete}
        variant="base"
        className="ml-auto text-red-500"
      >
        <BsTrash />
      </Button>
      <Dialog />
    </>
  );
};

/* <ReportCard />
============================================================================= */
export const ReportCard = (props: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "relative flex min-h-[12rem] w-full flex-col gap-2 rounded border border-white p-4",
        props.className,
      )}
    >
      {props.children}
    </div>
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
    <section className="mb-2">
      <header className="mb-2 flex gap-2 text-sm">
        <img
          className="object-fit h-5 w-5 rounded-full border border-white"
          src={props.report.project?.image ?? ""}
          alt=""
        />
        <p className="m-0 flex-1 truncate">{props.report.project.name}</p>
        <span className="inline-flex items-center gap-1">
          <AiOutlineClockCircle />
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
        <GoDotFill
          className={clsx("text-md mr-2", {
            "animate-pulse": pulse,
          })}
        />
        <span
          className={clsx(
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
          className={clsx(
            "h-5 w-5 flex-none overflow-hidden rounded-full border bg-pink-400",
            {
              "animate-pulse": pulse,
            },
          )}
        />
        <p
          className={clsx("mb-0 w-3/4 rounded bg-current text-sm", {
            "animate-pulse": pulse,
          })}
        >
          &nbsp;
        </p>
        <span
          className={clsx("w-1/4 rounded bg-current text-xs", {
            "animate-pulse": pulse,
          })}
        >
          &nbsp;
        </span>
      </header>

      {[...Array<never>(2)].map((_, index) => (
        <p
          key={index}
          className={clsx("text-xxs mb-2 w-full rounded bg-current", {
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
        className={clsx(
          "mb-4 h-12 w-12 overflow-hidden rounded-full border bg-pink-400",
          {
            "animate-pulse": pulse,
          },
        )}
      />
      <h2
        className={clsx("w-1/3 rounded bg-current font-bold uppercase", {
          "animate-pulse": pulse,
        })}
      >
        &nbsp;
      </h2>
    </div>
  );
};
