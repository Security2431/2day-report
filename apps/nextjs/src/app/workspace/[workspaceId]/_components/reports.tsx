import classNames from "classnames";
import { GoDotFill } from "react-icons/go";

/* <ReportCardSkeleton />
============================================================================= */
interface Props {
  pulse?: boolean;
}

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
          className={classNames("text-xxs mb-2 w-full rounded bg-current", {
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
