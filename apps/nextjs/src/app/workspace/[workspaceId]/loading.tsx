"use client";

import { useContext } from "react";
import classNames from "classnames";

import {
  ReportCardSkeleton,
  ReportPictureSkeleton,
} from "./_components/reports";
import { WeekendContext } from "./providers";

export default function Loading() {
  const { weekend, weekdays } = useContext(WeekendContext);
  const cards = [...Array<never>(weekdays)];

  return (
    <div
      className={classNames("my-4 grid items-stretch gap-4", {
        "grid-cols-6": !weekend,
        "grid-cols-8": weekend,
      })}
    >
      <ReportPictureSkeleton />
      {cards.map((_, index) => (
        <ReportCardSkeleton key={index} />
      ))}
    </div>
  );
}
