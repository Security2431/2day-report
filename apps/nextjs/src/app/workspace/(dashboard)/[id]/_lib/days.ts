import { addDays, format, getDate, startOfWeek } from "date-fns";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
import { BsSignDoNotEnter } from "react-icons/bs";
import { GiMedicines, GiSandsOfTime } from "react-icons/gi";
import { IoIosConstruct } from "react-icons/io";
import { MdOutlineSick } from "react-icons/md";
import { TbBeach, TbHome } from "react-icons/tb";

export enum DayTypes { // FIXME: add types from prisma
  WORKING = "Working",
  HOME_OFFICE = "Home Office",
  NOT_WORKING = "Not Working",
  HALF_DAY_VACATION = "Half-Day Vacation",
  VACATION = "Vacation",
  SICK_DAY = "Sick Day",
  ILLNESS = "Illness",
  TRAVELING = "Traveling",
}

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

export const getDayType = (workday?: DayTypes) => {
  return {
    [DayTypes.WORKING]: {
      icon: IoIosConstruct,
      name: "Working",
      color: "text-green-500",
    },
    [DayTypes.HOME_OFFICE]: {
      icon: TbHome,
      name: "Home Office",
      color: "text-yellow-500",
    },
    [DayTypes.NOT_WORKING]: {
      icon: BsSignDoNotEnter,
      name: "Not Working",
      color: "text-red-500",
    },
    [DayTypes.HALF_DAY_VACATION]: {
      icon: GiSandsOfTime,
      name: "Half Day Vacation",
      color: "text-orange-400",
    },
    [DayTypes.VACATION]: {
      icon: TbBeach,
      name: "Vacation",
      color: "text-red-500",
      description: "{name} is enjoying vacation",
    },
    [DayTypes.SICK_DAY]: {
      icon: MdOutlineSick,
      name: "Sick day",
      color: "text-red-500",
      description: "{name} is sick",
    },
    [DayTypes.ILLNESS]: {
      icon: GiMedicines,
      name: "Illness",
      color: "text-red-500",
      description: "{name} is sick",
    },
    [DayTypes.TRAVELING]: {
      icon: BiSolidPlaneTakeOff,
      name: "Traveling",
      color: "text-blue-500",
    },
    default: null,
  }[workday ?? "default"];
};
