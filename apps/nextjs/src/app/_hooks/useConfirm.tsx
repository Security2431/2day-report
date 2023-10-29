import { useState } from "react";

import Button from "../_components/button";
import Heading from "../_components/heading";

const useConfirm = (title: string, message: string) => {
  // TODO: add types to useState
  const [promise, setPromise] = useState(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };
  // You could replace the Dialog with your library's version
  const ConfirmationDialog = () =>
    promise !== null ? (
      <section className="fixed left-0 top-0 z-[999] h-full w-full bg-gray-500 p-8  text-center text-white backdrop-blur">
        <Heading as="h3">{title}</Heading>
        <div>
          <p>{message}</p>
        </div>
        <footer className="flex justify-center gap-2">
          <Button onClick={handleConfirm}>Yes</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </footer>
      </section>
    ) : null;
  return [ConfirmationDialog, confirm] as const;
};

export default useConfirm;
