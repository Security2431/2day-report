"use client";

import type { SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { FormProvider, useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import * as z from "zod";

import Button from "~/app/_components/button";
import Field from "~/app/_components/form/Field";
import Modal from "~/app/_components/modal/Modal";
import { api } from "~/trpc/react";

/* Local constants & types
============================================================================= */
export type FormData = z.infer<typeof schemaValidation>;

const schemaValidation = z.object({
  name: z.string(),
  image: z.string(),
});

/* Props - <WorkspaceModal />
============================================================================= */
interface Props {
  className?: string;
}

/* <WorkspaceModal />
============================================================================= */
const WorkspaceModal: React.FC<Props> = ({ className }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const utils = api.useUtils();
  const createWorkspace = api.workspace.create.useMutation({
    async onSuccess() {
      toast.success("Your workspace has been created!");

      hideModal();
      await utils.workspace.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to create workspace"
          : "Failed to create workspace",
      );
    },
  });

  const methods = useForm<FormData>({
    resolver: zodResolver(schemaValidation),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    createWorkspace.mutate({
      name: data.name,
      image: data.image,
    });
  };

  return (
    <>
      <Button className={classNames(className)} onClick={showModal}>
        <HiPlus className="mr-2" /> Add new workspace
      </Button>

      <Modal
        isVisible={modalVisible}
        heading={<>Create new workspace</>}
        onClickCloseBtn={hideModal}
        onPressEscKey={hideModal}
        onClickBackdrop={hideModal}
      >
        <FormProvider {...methods}>
          <form
            className="flex w-full max-w-md flex-col gap-4"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Field label="Workspace name:" name="name" />
            {/* <ImageField label="Workspace image (optional):" name="image" /> */}

            <Button type="submit">Create workspace</Button>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default WorkspaceModal;
