"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { FormProvider, useForm } from "react-hook-form";

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
    const weekendCookie = JSON.parse(Cookies.get("weekend") ?? null);

    methods.setValue("weekend", weekendCookie);
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
    <div className="mr-4 inline-flex items-center gap-2">
      <h6 className="text-md uppercase">Weekends: </h6>
      <FormProvider {...methods}>
        <Switch name="weekend" />
      </FormProvider>
    </div>
  );
};

export default WorkspaceHeader;
