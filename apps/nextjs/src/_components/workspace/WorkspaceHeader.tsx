"use client";

import { useEffect, useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@acme/ui/form";
import { Switch } from "@acme/ui/switch";

const FormSchema = z.object({
  weekend: z.boolean(),
});

/* <WorkspaceHeader />
============================================================================= */
const WorkspaceHeader = () => {
  const id = useId();
  const form = useForm<{ weekend: boolean }>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      weekend: false,
    },
  });

  useEffect(() => {
    const weekendCookie = JSON.parse(Cookies.get("weekend") ?? null);

    form.setValue("weekend", weekendCookie);
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((value) =>
      Cookies.set("weekend", value.weekend!.toString(), {
        expires: 365,
      }),
    );

    return () => subscription.unsubscribe();
  });
  return (
    <div className="inline-flex items-center gap-2">
      <Form {...form}>
        <FormLabel className="text-md uppercase">Weekends: </FormLabel>
        <FormField
          control={form.control}
          name="weekend"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  id={`switch-${id}`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};

export default WorkspaceHeader;
