"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import classNames from "classnames";
import { addWeeks, format, isToday, isValid, subWeeks } from "date-fns";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

import { getDaysOfWeek } from "../_lib/days";
import { WeekendContext } from "../providers";

/* <WeekList />
============================================================================= */
export const WeekList = () => {
  const { weekend, weekdays } = useContext(WeekendContext);
  const [today, setToday] = useState(new Date());
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const daysOfWeek = getDaysOfWeek(today);
  const { formattedDate: startWeek } = daysOfWeek.at(0)!;
  const { formattedDate: endWeek } = daysOfWeek.at(-1)!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const date = searchParams.get("today");
    if (date && isValid(date)) {
      setToday(new Date(date));
    }
  }, [searchParams]);

  return (
    <section className="sticky top-0 z-10 mb-8 border-y border-white backdrop-blur">
      <div
        className={classNames("my-4 grid items-stretch gap-4", {
          "grid-cols-6": !weekend,
          "grid-cols-8": weekend,
        })}
      >
        <div className="flex items-center justify-center text-2xl font-thin">
          <Link
            href={
              pathname +
              "?" +
              createQueryString(
                "today",
                format(subWeeks(today, 1), "yyyy-mm-dd"),
              )
            }
          >
            <HiArrowSmLeft />
          </Link>
          {startWeek}-{endWeek}
          <Link
            href={
              pathname +
              "?" +
              createQueryString(
                "today",
                format(addWeeks(today, 1), "yyyy-mm-dd"),
              )
            }
          >
            <HiArrowSmRight />
          </Link>
        </div>
        {daysOfWeek.slice(0, weekdays).map(({ day, date }) => (
          <Day key={day} day={day} date={date} />
        ))}
      </div>
    </section>
  );
};

/* Props - <Day />
============================================================================= */
interface DayProps {
  day: number;
  date: Date;
}

/* <Day />
============================================================================= */
export const Day: React.FC<DayProps> = ({ day, date }) => {
  return (
    <span
      className={classNames(
        "m-auto flex h-24 w-24 items-center justify-center self-center rounded-full p-3  text-6xl font-thin",
        {
          "bg-white text-purple-500": isToday(date),
        },
      )}
    >
      {day}
    </span>
  );
};
