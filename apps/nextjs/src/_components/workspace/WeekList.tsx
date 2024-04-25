"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format, isToday, isValid, parse } from "date-fns";

import { cn } from "@acme/ui";

import { getDaysOfWeek } from "~/_utils/days";

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
    <header className="sticky top-0 z-10 mb-8 border-y px-4 shadow-sm backdrop-blur dark:border-white">
      <div className={cn("my-2 flex items-stretch gap-2")}>
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
      className={cn(
        "m-auto flex size-16 flex-col items-center justify-center self-center rounded-md p-3 text-2xl",
        {
          "bg-foreground text-background": isToday(date),
        },
      )}
    >
      {day}
      <span className="text-xs">{format(date, "EEE")}</span>
    </span>
  );
};
