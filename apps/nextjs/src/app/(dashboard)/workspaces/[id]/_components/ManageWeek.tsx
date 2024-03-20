"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { addWeeks, format, isValid, parse, subWeeks } from "date-fns";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

import { Button } from "@acme/ui/button";

import { getDaysOfWeek } from "~/_utils/days";
import routes from "~/_utils/routes";
import WorkspaceHeader from "./WorkspaceHeader";

export function ManageWeek() {
  const [today, setToday] = useState(new Date());
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
    if (date && isValid(new Date(date))) {
      setToday(parse(date, "yyyy-MM-dd", new Date()));
    }
  }, [searchParams]);

  return (
    <section className="flex items-center justify-end gap-4 p-4">
      <Button variant="secondary" asChild>
        <Link className="mr-auto" href={routes.workspaces}>
          <FaArrowLeft className="mr-2" />
          Workspaces
        </Link>
      </Button>
      <div className="flex items-center justify-center gap-3 text-xl font-thin">
        <Link
          href={
            pathname +
            "?" +
            createQueryString("today", format(subWeeks(today, 1), "yyyy-MM-dd"))
          }
        >
          <HiArrowSmLeft />
        </Link>
        <Link
          className="inline-flex items-center gap-2"
          title="Today"
          href={
            pathname +
            "?" +
            createQueryString("today", format(new Date(), "yyyy-MM-dd"))
          }
        >
          <FaRegCalendarPlus />
          {startWeek}-{endWeek}
        </Link>
        <Link
          href={
            pathname +
            "?" +
            createQueryString("today", format(addWeeks(today, 1), "yyyy-MM-dd"))
          }
        >
          <HiArrowSmRight />
        </Link>
      </div>

      <WorkspaceHeader />
    </section>
  );
}
