import type { TextareaHTMLAttributes } from "react";
import React, { forwardRef } from "react";
import clsx from "clsx";

/* Local constants & types
============================================================================= */
export type Ref = HTMLTextAreaElement;

/* Props - <TextArea />
============================================================================= */
type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

/* <TextArea />
============================================================================= */
const TextArea = forwardRef<Ref, Props>(
  ({ onClick, className, ...props }, ref) => (
    <textarea
      className={clsx(
        `rounded border border-white bg-transparent p-2 backdrop-blur`,
        className,
      )}
      ref={ref}
      onClick={onClick}
      autoComplete="off"
      {...props}
    />
  ),
);

TextArea.displayName = "TextArea";

export default TextArea;
