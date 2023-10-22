"use client";

import { createContext } from "react";

import useLocalStorage from "~/app/_hooks/useLocalStorage";
import { getWeekdays } from "./_lib/days";

interface ContextType {
  weekend: boolean | undefined;
  setWeekend: (value: (prevState: boolean | undefined) => boolean) => void;
  weekdays: number;
}

export const WeekendContext = createContext<ContextType>({
  weekend: false,
  setWeekend: () => () => undefined,
  weekdays: getWeekdays(false),
});

export const WeekendProvider = (props: { children: React.ReactNode }) => {
  const [weekend, setWeekend] = useLocalStorage<boolean>("weekend", false);
  const weekdays = getWeekdays(weekend);

  return (
    <WeekendContext.Provider value={{ weekend, setWeekend, weekdays }}>
      {props.children}
    </WeekendContext.Provider>
  );
};
