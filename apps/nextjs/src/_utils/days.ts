import { addDays, format, getDate, startOfWeek } from "date-fns";

import { DayType } from "@acme/db";
import { Icons } from "@acme/ui/icons";

export const getDaysOfWeek = (date?: string | Date | null) => {
  const today = !date ? new Date() : new Date(date);

  const weekStartDay = 1; // Get the start of the week
  const startOfWeekDate = startOfWeek(today, { weekStartsOn: weekStartDay });

  // Function to extract the first two characters from a string
  const getTwoCharacterString = (str: string) => str.substring(0, 2);

  // Get the dates and day of the week for each day
  const weekData = [...Array<never>(7)].map((_, i) => {
    const date = addDays(startOfWeekDate, i);
    const formattedDate = format(date, "dd/MM");
    const dayOfWeekShort = getTwoCharacterString(format(date, "E")); // Short day name (e.g., Mo)
    return { date, formattedDate, day: getDate(date), dayOfWeekShort };
  });

  return weekData;
};

export const getWeekdays = (weekend?: boolean): number => (!weekend ? 5 : 7);

export const getDayType = (workday?: DayType) => {
  return {
    [DayType.WORKING]: {
      icon: Icons.Briefcase,
      name: "Working",
      color: "text-green-500",
    },
    [DayType.HOME_OFFICE]: {
      icon: Icons.Home,
      name: "Home Office",
      color: "text-yellow-500",
    },
    [DayType.NOT_WORKING]: {
      icon: Icons.OctagonX,
      name: "Not Working",
      color: "text-red-500",
    },
    [DayType.HALF_DAY_VACATION]: {
      icon: Icons.Hourglass,
      name: "Half-Day Off",
      color: "text-orange-400",
    },
    [DayType.VACATION]: {
      icon: Icons.TreePalm,
      name: "Vacation",
      color: "text-red-500",
      description: "{name} is enjoying vacation",
    },
    [DayType.SICK_DAY]: {
      icon: Icons.Thermometer,
      name: "Sick day",
      color: "text-red-500",
      description: "{name} is sick",
    },
    [DayType.ILLNESS]: {
      icon: Icons.Pill,
      name: "Illness",
      color: "text-red-500",
      description: "{name} is sick",
    },
    [DayType.TRAVELING]: {
      icon: Icons.PlaneTakeoff,
      name: "Traveling",
      color: "text-blue-500",
    },
  }[workday ?? DayType.WORKING];
};
