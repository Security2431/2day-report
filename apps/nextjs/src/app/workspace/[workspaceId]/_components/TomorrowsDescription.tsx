import { useId, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { GiPencil } from "react-icons/gi";

import Button from "~/app/_components/button";
import TextArea from "~/app/_components/form/TextArea";
import useConfirm from "~/app/_hooks/useConfirm";
import type { FormData } from "./modal/FilldayModal";

const TomorrowsDescription = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const {
    register,
    getValues,
    resetField,
    formState: { dirtyFields },
  } = useFormContext<FormData>();
  const [open, setOpen] = useState(false);
  const [Dialog, confirmDelete] = useConfirm(
    "Are you sure?",
    "Surely you don't want to continue without saving?",
  );

  const dialogHandleOpen = () => {
    setOpen(true);
  };

  const dialogHandleClose = () => {
    ref.current?.close();

    setOpen(false);
  };

  const handleCancel = async () => {
    if (!dirtyFields.tomorrowsPlan) {
      resetField("tomorrowsPlan");
      dialogHandleClose();
      return;
    }

    const ans = await confirmDelete();

    if (!ans) {
      return;
    }

    resetField("tomorrowsPlan");
    dialogHandleClose();
  };

  const handleSave = () => {
    dialogHandleClose();
  };

  return (
    <>
      <Dialog />

      {open && (
        <dialog
          ref={ref}
          className="-mt-3 ml-0 flex w-4/5 -translate-y-full flex-col rounded border bg-purple-500  text-white backdrop-blur"
        >
          <fieldset className="mb-4 flex flex-col">
            <label htmlFor={`${id}-tomorrows-plan`} className="uppercase">
              Tomorrows plan:
            </label>
            <TextArea
              className="rounded border border-white bg-transparent p-2 backdrop-blur"
              id={`${id}-tomorrows-plan`}
              rows={5}
              defaultValue={getValues("tomorrowsPlan")}
              {...register(`tomorrowsPlan`)}
            />
          </fieldset>
          <footer className="flex justify-end gap-2">
            <Button type="button" onClick={handleCancel}>
              Reset
            </Button>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </footer>
        </dialog>
      )}
      <Button
        onClick={dialogHandleOpen}
        type="button"
        variant="link"
        className="mr-auto gap-2"
      >
        {!getValues("tomorrowsPlan") ? (
          <>
            <AiOutlinePlus />
            Add
          </>
        ) : (
          <>
            <GiPencil />
            Edit
          </>
        )}{" "}
        plan for tomorrow
      </Button>
    </>
  );
};

export default TomorrowsDescription;
