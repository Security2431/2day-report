"use client";

import type { SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

import type { RouterOutputs } from "@acme/api";

import type { DayTypes } from "../../_lib/days";
import Button from "~/app/_components/button";
import Modal from "~/app/_components/modal/Modal";
import useConfirm from "~/app/_hooks/useConfirm";
import { api } from "~/trpc/react";
import { isObjectEmpty } from "../../_lib/common";
import WorkTypes from "../form/WorkTypes/WorkTypes";
import { Projects } from "../Projects";
import ComposedTabs from "../TabPanel";
import TomorrowsDescription from "../TomorrowsDescription";

/* Local constants & types
============================================================================= */
export type FormData = z.infer<typeof schemaValidation>;

const schemaValidation = z.object({
  search: z.string(),
  tomorrowsDescription: z.string(),
  type: z.enum([
    "WORKING",
    "HOME_OFFICE",
    "NOT_WORKING",
    "HALF_DAY_VACATION",
    "VACATION",
    "SICK_DAY",
    "ILLNESS",
    "TRAVELING",
  ]),
  reports: z.array(
    z.object({
      projectId: z.string(),
      projectName: z.string(),
      description: z.string(),
      hours: z.number(),
      reportId: z.string().optional(),
    }),
  ),
});

export const initialFormValues = {
  type: "WORKING" as keyof typeof DayTypes,
  tomorrowsDescription: `#### 🗓️ Features:
- `,
  workingHours: 8,
  description: `#### ✅ Done:
- 

#### 🚫 Blockers:
- NaN
`,
  reportId: "",
};

/* Props - <FilldayModal />
============================================================================= */
interface Props {
  projects: RouterOutputs["project"]["byWorkspaceId"];
  date: Date;
  sprint?: RouterOutputs["sprint"]["byDateRange"][number];
  workspaceId: string;
  userId: string;
}

/* <FilldayModal />
============================================================================= */
const FilldayModal: React.FC<Props> = ({
  projects,
  date,
  sprint,
  workspaceId,
  userId,
}) => {
  const utils = api.useUtils();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const updateSprint = api.sprint.update.useMutation({
    async onSuccess() {
      toast.success("Your report day updated successfully!");

      hideModal();
      await utils.sprint.invalidate();
      await utils.report.invalidate();
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
      toast.success("Your report day create successfully!");
      hideModal();

      await utils.sprint.invalidate();
      await utils.report.invalidate();
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
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete day report"
          : "Failed to delete day report",
      );
    },
  });

  const methods = useForm<FormData>({
    resolver: zodResolver(schemaValidation),
    defaultValues: {
      type: sprint?.type ?? initialFormValues.type,
      tomorrowsDescription:
        sprint?.tomorrowsDescription ?? initialFormValues.tomorrowsDescription,
      reports:
        sprint?.reports?.map((report) => ({
          projectId: report.project.id,
          projectName: report.project.name,
          hours: report.hours ?? initialFormValues.workingHours,
          description: report.description ?? initialFormValues.description,
          reportId: report.id ?? initialFormValues.reportId,
        })) ?? [],
    },
  });

  const [Dialog, confirmCancel] = useConfirm(
    "Are you sure?",
    "Surely you don't want to continue without saving?",
  );

  const fieldArraysMethods = useFieldArray({
    control: methods.control,
    name: "reports",
  });

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleCancelBtnClick = async () => {
    if (!methods.formState.isDirty) {
      hideModal();
      return;
    }

    const ans = await confirmCancel();

    if (!ans) {
      return;
    }

    hideModal();
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const reportIdsToBeDeleted =
      sprint?.reports
        .filter((report) => !data.reports.find((r) => r.reportId === report.id))
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
    } catch {
      // noop
    }
  };

  return (
    <>
      <Button className="w-full" onClick={showModal}>
        {isObjectEmpty(sprint) ? "Fill Day" : "Edit Day"}
      </Button>

      <Modal
        isVisible={modalVisible}
        heading={
          <>
            Fill Your Day{" "}
            <time className="text-sm" dateTime={format(date, "yyyy-MM-dd")}>
              {format(date, "EEEE MMM dd, yyyy")}
            </time>
          </>
        }
        onClickCloseBtn={handleCancelBtnClick}
        onPressEscKey={handleCancelBtnClick}
        onClickBackdrop={handleCancelBtnClick}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <WorkTypes workType={sprint?.type} />
            <hr className="mb-4 w-full bg-white" />
            <article className="mb-4 flex w-full gap-12">
              <Projects
                fieldArrays={{
                  reports: fieldArraysMethods,
                }}
                projects={projects}
              />
              <ComposedTabs
                fieldArrays={{
                  reports: fieldArraysMethods,
                }}
              />
            </article>
            <footer className="relative mt-auto flex flex-shrink justify-between gap-4 self-stretch">
              <TomorrowsDescription />
              <Button onClick={handleCancelBtnClick}>Cancel</Button>
              <Button type="submit">Save</Button>
            </footer>
            <Dialog />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default FilldayModal;
