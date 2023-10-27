"use client";

import { useContext } from "react";
import { HiOutlineCalendar, HiOutlineClock, HiUserGroup } from "react-icons/hi";

import Button from "~/app/_components/button";
import Switch from "~/app/_components/switch/Switch";
import { WeekendContext } from "../providers";

/* <WorkspaceHeader />
============================================================================= */
const WorkspaceHeader = () => {
  const { weekend, setWeekend } = useContext(WeekendContext);

  return (
    <header className="container flex gap-8 py-8">
      <Button>
        <HiUserGroup className="mr-2" /> Teams Overivew
      </Button>

      <button className="inline-flex w-64 items-center justify-center rounded border border-white bg-transparent px-4 py-2 font-semibold uppercase text-white hover:border-transparent hover:bg-white hover:text-purple-500">
        <HiOutlineClock className="mr-2" /> Time Zones
      </button>

      <button className="inline-flex w-64 items-center justify-center rounded border border-white bg-transparent px-4 py-2 font-semibold uppercase text-white hover:border-transparent hover:bg-white hover:text-purple-500">
        <HiOutlineCalendar className="mr-2" /> My Availability
      </button>

      <div className="ml-auto inline-flex items-center">
        <h6 className="text-md mr-2 uppercase">Weekends: </h6>
        <Switch
          defaultChecked={weekend}
          onChange={() => setWeekend((prevState) => !prevState)}
        />
      </div>
    </header>
  );
};

export default WorkspaceHeader;
