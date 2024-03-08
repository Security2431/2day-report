"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { isToday, isValid, parse } from "date-fns";

import { getDaysOfWeek } from "../_lib/days";

/* <WeekList />
============================================================================= */
export const WeekList = (props: { weekend: boolean; weekdays: number }) => {
  const [today, setToday] = useState(new Date());
  const searchParams = useSearchParams();
  const daysOfWeek = getDaysOfWeek(today);

  useEffect(() => {
    const date = searchParams.get("today");
    if (date && isValid(new Date(date))) {
      setToday(parse(date, "yyyy-MM-dd", new Date()));
    }
  }, [searchParams]);

  return (
    <header className="sticky top-0 z-10 mb-8 border-y border-white px-4 backdrop-blur">
      <div className={clsx("my-4 flex items-stretch gap-2")}>
        <span className="block w-36">&nbsp;</span>
        {daysOfWeek.slice(0, props.weekdays).map(({ day, date }) => (
          <Day key={day} day={day} date={date} />
        ))}
      </div>
    </header>
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
      className={clsx(
        "m-auto flex h-24 w-24 items-center justify-center self-center rounded-full p-3 text-6xl font-thin",
        {
          "bg-white text-purple-500": isToday(date),
        },
      )}
    >
      {day}
    </span>
  );
};
