// The original Modal repo https://github.com/michu2k/react-framer-motion-modal-example
import type { AnimationProps } from "framer-motion";
import type { PropsWithChildren } from "react";
import React, { useCallback, useEffect, useId } from "react";
import cn from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

import Heading from "../heading";
import styles from "./Modal.module.scss";
import Portal from "./Portal";
import { defaultModalAnimation, defaultModalBackdropAnimation } from "./utils";

/* Props - <Modal />
============================================================================= */
type ModalProps = PropsWithChildren<{
  isVisible: boolean; // Modal visibility
  heading: string | React.ReactNode; // Modal heading
  onClickCloseBtn: (e: React.MouseEvent) => void; // Callback when the close button is clicked
  onClickBackdrop?: (e: React.MouseEvent) => void; // Callback when the backdrop is clicked
  onPressEscKey?: (e: KeyboardEvent) => void; // Callback when the ESC key is clicked
  modalClassName?: string; // Additional class for the modal
  animation?: AnimationProps; // Alternative modal animation, type imported from framer-motion
  backdropAnimation?: AnimationProps; // Alternative backdrop animation, type imported from framer-motion
}>;

/* <Modal />
============================================================================= */
const Modal: React.FC<ModalProps> = ({
  isVisible,
  heading,
  onClickCloseBtn,
  onClickBackdrop = () => null,
  onPressEscKey = () => null,
  modalClassName,
  animation = defaultModalAnimation,
  backdropAnimation = defaultModalBackdropAnimation,
  children,
}) => {
  // A hook that returns `true` if the current device has Reduced Motion setting enabled
  const shouldReduceMotion = useReducedMotion();

  // Tip: Adding support for the Tab key is very welcome and user-friendly

  // headingId is used to set the "aria-labelledby" attribute of the modal dialog element
  const headingId = useId();

  // Combine the modal class names from the props and the default class names
  const modalMainClassName = cn(styles.modal, modalClassName);

  const modalAnimation = shouldReduceMotion ? {} : animation;
  const modalBackdropAnimation = shouldReduceMotion ? {} : backdropAnimation;

  // When the user press the ESC key, onPressEscKey will be called
  const handleWindowKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onPressEscKey(e);
      }
    },
    [onPressEscKey],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleWindowKeyDown);
    return () => window.removeEventListener("keydown", handleWindowKeyDown);
  }, [handleWindowKeyDown]);

  // A good practice is to render the Modal inside the React portal
  return (
    <Portal container="#modal">
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              key="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              {...modalAnimation}
              className={modalMainClassName}
            >
              <button
                type="button"
                className={styles.closeModalBtn}
                onClick={onClickCloseBtn}
              >
                <RxCross2 />
                <span className="sr-only">Close</span>
              </button>

              <div className={styles.modalHeader}>
                <Heading as="h4" id={headingId} className={styles.modalHeading}>
                  {heading}
                </Heading>
              </div>

              <div className={styles.modalContent}>{children}</div>
            </motion.div>

            <motion.div
              key="modal-backdrop"
              {...modalBackdropAnimation}
              onClick={onClickBackdrop}
              className={styles.modalBackdrop}
            />
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export type { ModalProps };

export default Modal;
