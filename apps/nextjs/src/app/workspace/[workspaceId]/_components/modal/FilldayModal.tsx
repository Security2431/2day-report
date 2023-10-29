"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

import type { RouterOutputs } from "@acme/api";

import Button from "~/app/_components/button";
import Modal from "~/app/_components/modal/Modal";
import useConfirm from "~/app/_hooks/useConfirm";
import { api } from "~/utils/api";
import { isObjectEmpty } from "../../_lib/common";
import type { DayTypes } from "../../_lib/days";
import WorkTypes from "../form/WorkTypes/WorkTypes";
import Projects from "../Projects";
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
  tomorrowsDescription: "",
  workingHours: 8,
  description: "",
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
  const context = api.useContext();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { mutateAsync: updateSprint, error: updateSprintError } =
    api.sprint.update.useMutation({
      async onSuccess() {
        toast.success("Your report day updated successfully!");

        hideModal();
        await context.sprint.all.invalidate();
        await context.report.all.invalidate();
      },
      onError() {
        console.error(updateSprintError);
        // toast.error(error);
      },
    });

  const { mutateAsync: createSprint, error: createSprintError } =
    api.sprint.create.useMutation({
      async onSuccess() {
        toast.success("Your report day create successfully!");
        hideModal();

        await context.sprint.all.invalidate();
        await context.report.all.invalidate();
      },
      onError() {
        console.error(createSprintError);
        // toast.error(error);
      },
    });

  const { mutateAsync: deleteReports, error: deleteReportsError } =
    api.report.deleteMany.useMutation({
      async onSuccess() {
        await context.report.all.invalidate();
      },
      onError() {
        console.error(deleteReportsError);
        // toast.error(error);
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

    await deleteReports(reportIdsToBeDeleted);

    try {
      if (isObjectEmpty(sprint)) {
        return await createSprint({
          ...data,
          userId,
          workspaceId,
          date,
        });
      }

      await updateSprint({
        ...data,
        id: sprint!.id,
        userId,
        workspaceId,
        date,
      });
    } catch {
      // noop
    }

    // if (isObjectEmpty(sprint)) {
    //   return await createSprint({
    //     ...data,
    //     userId,
    //     workspaceId,
    //     date,
    //   });
    // }

    // await updateSprint({
    //   ...data,
    //   userId,
    //   workspaceId,
    //   date,
    // });

    // hideModal();
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
            <WorkTypes workType="WORKING" />
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
