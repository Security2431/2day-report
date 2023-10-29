import { useCallback } from "react";
import type { ReactNode } from "react";
import classNames from "classnames";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";

import type { RouterOutputs } from "@acme/api";

import Button from "~/app/_components/button";
import Heading from "~/app/_components/heading";
import useConfirm from "~/app/_hooks/useConfirm";
import { api } from "~/utils/api";
import { isObjectEmpty } from "../_lib/common";
import { DayTypes, getDayType } from "../_lib/days";
import { Markdown } from "./markdown";
import FilldayModal from "./modal/FilldayModal";

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
  userId: string;
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
            userId={props.userId}
          />
        )}
      </ReportCard>
    );
  }

  return (
    <ReportCard>
      <h6 className="mb-2 flex items-center">
        <GoDotFill className={classNames("text-md", dayType.color)} />
        {dayType.name}
        {props.isAuth && <DeleteReport id={props.sprint?.id} />}
      </h6>

      {!props.sprint?.reports?.length ? (
        <div className="flex items-center justify-center gap-2">
          <dayType.icon />
          <span>No report yet</span>
        </div>
      ) : (
        <>
          {props.sprint?.reports.map((report) => (
            <ReportRow key={report.id} report={report} />
          ))}

          {props.sprint?.tomorrowsDescription && (
            <>
              <Heading as="h6" className="text-sm">
                Tomorrow:
              </Heading>
              <Markdown content={props.sprint?.tomorrowsDescription} />
            </>
          )}
        </>
      )}

      {props.isAuth && (
        <FilldayModal
          date={props.date}
          projects={props.projects}
          sprint={props.sprint}
          workspaceId={props.workspaceId}
          userId={props.userId}
        />
      )}
    </ReportCard>
  );
}

/* <DeleteReport />
============================================================================= */
export const DeleteReport = ({ id }: { id?: string }) => {
  const context = api.useContext();
  const [Dialog, confirmDelete] = useConfirm(
    "Are you sure?",
    "Surely you want delete this report?",
  );

  const { mutateAsync: deleteSprint, error } = api.sprint.delete.useMutation({
    async onSuccess() {
      toast.success("Your sprint day deleted successfully!");

      await context.sprint.all.invalidate();
    },
    onError() {
      console.error(error);
      // toast.error(error);
    },
  });

  const handleDelete = useCallback(async () => {
    const ans = await confirmDelete();

    if (ans && id) {
      await deleteSprint(id);
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
      className={classNames(
        "flex min-h-[12rem] flex-col gap-2 rounded border border-white p-4",
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
      <header className="flex gap-2 text-sm">
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
    <div className="min-h-[12rem] rounded border border-white px-3 py-2 text-white shadow">
      <h6 className="mb-4 flex items-center">
        <GoDotFill
          className={classNames("text-md mr-2", {
            "animate-pulse": pulse,
          })}
        />
        <span
          className={classNames(
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
          className={classNames(
            "h-5 w-5 flex-none overflow-hidden rounded-full border bg-pink-400",
            {
              "animate-pulse": pulse,
            },
          )}
        />
        <p
          className={classNames("mb-0 w-3/4 rounded bg-current text-sm", {
            "animate-pulse": pulse,
          })}
        >
          &nbsp;
        </p>
        <span
          className={classNames("w-1/4 rounded bg-current text-xs", {
            "animate-pulse": pulse,
          })}
        >
          &nbsp;
        </span>
      </header>

      {[...Array<never>(2)].map((_, index) => (
        <p
          key={index}
          className={classNames("mb-2 w-full rounded bg-current text-xxs", {
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
    <div className="sticky bottom-4 top-36 flex h-24 flex-col items-center">
      <picture
        className={classNames(
          "mb-4 h-12 w-12 overflow-hidden rounded-full border bg-pink-400",
          {
            "animate-pulse": pulse,
          },
        )}
      />
      <h2
        className={classNames("w-1/3 rounded bg-current font-bold uppercase", {
          "animate-pulse": pulse,
        })}
      >
        &nbsp;
      </h2>
    </div>
  );
};
