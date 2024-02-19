"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { FormProvider, useForm } from "react-hook-form";
import { HiOutlineCalendar, HiOutlineClock, HiUserGroup } from "react-icons/hi";

import Button from "~/app/_components/button";
import Switch from "~/app/_components/switch/Switch";

/* <WorkspaceHeader />
============================================================================= */
const WorkspaceHeader = () => {
  const methods = useForm<{ weekend: boolean }>({
    defaultValues: {
      weekend: false,
    },
  });

  useEffect(() => {
    const weekendCookie = Boolean(Cookies.get("weekend"));
    if (weekendCookie) {
      methods.setValue("weekend", weekendCookie);
    }
  }, [methods]);

  useEffect(() => {
    const subscription = methods.watch((value) =>
      Cookies.set("weekend", value.weekend!.toString(), {
        expires: 365,
      }),
    );

    return () => subscription.unsubscribe();
  });
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
        <FormProvider {...methods}>
          <Switch name="weekend" />
        </FormProvider>
      </div>
    </header>
  );
};

export default WorkspaceHeader;
