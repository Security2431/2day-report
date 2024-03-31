import { useState } from "react";

import { Button } from "@acme/ui/button";
import { Title } from "@acme/ui/title";

const useConfirm = (title: string, message: string) => {
  // TODO: add types to useState
  // eslint-disable-next-line
  const [promise, setPromise] = useState<any>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    // eslint-disable-next-line
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    // eslint-disable-next-line
    promise?.resolve(false);
    handleClose();
  };
  // You could replace the Dialog with your library's version
  const ConfirmationDialog = () =>
    promise !== null ? (
      <section className="fixed left-0 top-0 z-[999] h-full w-full bg-gray-500 p-8  text-center text-white backdrop-blur">
        <Title asChild variant="h3">
          <h3>{title}</h3>
        </Title>
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
