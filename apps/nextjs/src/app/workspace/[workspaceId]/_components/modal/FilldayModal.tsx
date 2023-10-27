"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

import type { Prisma } from "@acme/db";

import Button from "~/app/_components/button";
import Modal from "~/app/_components/modal/Modal";
import useConfirm from "~/app/_hooks/useConfirm";
import WorkTypes from "../form/WorkTypes/WorkTypes";
import Projects from "../Projects";
import ComposedTabs from "../TabPanel";
import TomorrowsDescription from "../TomorrowsDescription";

/* Local constants & types
============================================================================= */
export type FormData = z.infer<typeof schemaValidation>;

const schemaValidation = z.object({
  workType: z.string({ invalid_type_error: "Please select a payment tier." }),
  search: z.string(),
  // .refine((val) => Tiers.map((tier) => tier.id).includes(val)),
  tomorrowsPlan: z.string(),
  reports: z.array(
    z.object({
      projectId: z.string(),
      projectName: z.string(),
      description: z.string(),
      hours: z.string(),
      // tomorrowsDescription: z.string(),
    }),
  ),
});

/* Props - <FilldayModal />
============================================================================= */
interface Props {
  projects: Pick<Prisma.ProjectCreateInput, "id" | "name">[];
}

/* <FilldayModal />
============================================================================= */
const FilldayModal: React.FC<Props> = ({ projects }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(schemaValidation),
    defaultValues: {
      tomorrowsPlan: "do it",
      reports: [
        {
          projectId: "652e78cfe5d72ca950a93b42",
          description: "Hello",
          hours: "8",
          projectName: "reserv.me",
        },
        {
          projectId: "652e7861e286a8b1dc3615a9",
          projectName: "webjs unbillable",

          description: "Wow",
          hours: "12",
        },
      ],
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

  const handleConfirmBtnClick = () => {
    hideModal();
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
        toast.success("Your data saved successfully!");
      }, 3000);
    });
  };

  return (
    <>
      <button type="button" onClick={showModal}>
        Open modal
      </button>

      <Modal
        isVisible={modalVisible}
        heading={
          <>
            Fill Your Day{" "}
            <time className="text-sm" dateTime="2023-10-17">
              (Tuesday Oct 17, 2023)
            </time>
          </>
        }
        onClickCloseBtn={hideModal}
        onPressEscKey={hideModal}
        onClickBackdrop={hideModal}
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
              <Button type="submit" onClick={handleConfirmBtnClick}>
                Save
              </Button>
            </footer>
            <Dialog />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default FilldayModal;
