"use client";

import type * as z from "zod";
import React, { useState } from "react";
import { format } from "date-fns";

import type { RouterOutputs } from "@acme/api";
import { DayType } from "@acme/db";
import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import { Form, useFieldArray, useForm } from "@acme/ui/form";
import { Separator } from "@acme/ui/separator";
import { toast } from "@acme/ui/toast";
import { CreateFillMyDaySchema } from "@acme/validators";

import { isObjectEmpty } from "~/_utils/common";
import { api } from "~/trpc/react";
import { Feelings } from "./_components/Feelings";
import { Projects } from "./_components/Projects";
import { ProjectTabs } from "./_components/ProjectTabs";
import { Status } from "./_components/Status";
import { Tomorrows } from "./_components/Tomorrows";

/* Local constants & types
============================================================================= */
export const INITIAL_FORM_VALUES = {
  type: DayType[DayType.WORKING],
  reports: {
    description: "",
    blockers: "",
    hours: 8,
  },
  tomorrowsDescription: "",
  mood: "",
};

/* Props - <FillMyDayModal />
============================================================================= */
interface Props {
  projects: RouterOutputs["project"]["byWorkspaceId"];
  date: Date;
  sprint?: RouterOutputs["sprint"]["byDateRange"][number];
  workspaceId: string;
  userId: string;
}

/* <FillMyDayModal />
============================================================================= */
export function FillMyDayModal({
  projects,
  date,
  sprint,
  workspaceId,
  userId,
}: Props) {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();

  const updateSprint = api.sprint.update.useMutation({
    async onSuccess() {
      toast.success("Your report day updated successfully!");

      await utils.sprint.invalidate();
      await utils.report.invalidate();
      setOpen(false);
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to update day report"
          : "Failed to update day report",
      );
    },
  });

  const createSprint = api.sprint.create.useMutation({
    async onSuccess() {
      toast.success("Your daily report successfully created!");

      await utils.sprint.invalidate();
      await utils.report.invalidate();
      setOpen(false);
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to create day report"
          : "Failed to create day report",
      );
    },
  });

  const deleteReports = api.report.deleteMany.useMutation({
    async onSuccess() {
      await utils.report.invalidate();
      setOpen(false);
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete day report"
          : "Failed to delete day report",
      );
    },
  });

  const form = useForm({
    schema: CreateFillMyDaySchema,
    defaultValues: {
      type: sprint?.type ?? INITIAL_FORM_VALUES.type,
      tomorrowsDescription:
        sprint?.tomorrowsDescription ??
        INITIAL_FORM_VALUES.tomorrowsDescription,
      reports:
        sprint?.reports?.map((report) => ({
          projectId: report.project.id,
          reportId: report.id,
          projectName: report.project.name,
          description:
            report.description ?? INITIAL_FORM_VALUES.reports.description,
          blockers: report.blockers ?? INITIAL_FORM_VALUES.reports.blockers,
          hours: report.hours ?? INITIAL_FORM_VALUES.reports.hours,
        })) ?? [],
      mood: sprint?.mood ?? INITIAL_FORM_VALUES.mood,
    },
  });

  const fieldReportArrays = useFieldArray({
    control: form.control,
    name: "reports",
  });

  const onSubmit = async (data: z.infer<typeof CreateFillMyDaySchema>) => {
    const reportIdsToBeDeleted =
      sprint?.reports
        .filter(
          (report) => !data.reports?.find((r) => r.reportId === report.id),
        )
        .map((report) => report.id) ?? [];

    if (reportIdsToBeDeleted.length) {
      deleteReports.mutate(reportIdsToBeDeleted);
    }

    try {
      if (isObjectEmpty(sprint)) {
        return createSprint.mutate({
          ...data,
          userId,
          workspaceId,
          date,
        });
      }

      updateSprint.mutate({
        ...data,
        id: sprint!.id,
        userId,
        workspaceId,
        date,
      });
    } catch (error) {
      // noop
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {isObjectEmpty(sprint) ? "Fill Day" : "Edit Day"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            <time dateTime={format(date, "yyyy-MM-dd")}>
              {format(date, "EEEE (MMM dd, yyyy)")}
            </time>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <Projects
                className="sticky top-0 self-start py-2"
                fieldReportArrays={fieldReportArrays}
                projects={projects}
              />
              <Separator
                className="h-auto bg-foreground"
                orientation="vertical"
              >
                &nbsp;
              </Separator>

              <div className="flex flex-1 flex-col">
                <Status />
                <ProjectTabs fieldReportArrays={fieldReportArrays} />
                <Feelings />
              </div>
            </div>

            <DialogFooter className="mt-6 sm:justify-start">
              <Tomorrows />

              <DialogClose asChild onClick={() => form.reset()}>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={
                  updateSprint.isPending ||
                  createSprint.isPending ||
                  deleteReports.isPending
                }
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
