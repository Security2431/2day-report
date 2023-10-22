"use client";

import { useContext } from "react";
import classNames from "classnames";
import { isToday } from "date-fns";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

import { getDaysOfWeek } from "../_lib/days";
import { WeekendContext } from "../providers";

/* <WeekList />
============================================================================= */
export const WeekList = () => {
  const { weekend, weekdays } = useContext(WeekendContext);
  const daysOfWeek = getDaysOfWeek();
  const { formattedDate: startWeek } = daysOfWeek.at(0)!;
  const { formattedDate: endWeek } = daysOfWeek.at(-1)!;

  return (
    <section className="sticky top-0 z-10 mb-8 border-y border-white backdrop-blur">
      <div
        className={classNames("my-4 grid items-stretch gap-4", {
          "grid-cols-6": !weekend,
          "grid-cols-8": weekend,
        })}
      >
        <div className="flex items-center justify-center text-2xl font-thin">
          <HiArrowSmLeft />
          {startWeek}-{endWeek}
          <HiArrowSmRight />
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
          "bg-white text-[#2e026d]": isToday(date),
        },
      )}
    >
      {day}
    </span>
  );
};
