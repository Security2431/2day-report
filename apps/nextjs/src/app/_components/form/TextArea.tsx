import type { TextareaHTMLAttributes } from "react";
import React, { forwardRef } from "react";
import classNames from "classnames";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;
export type Ref = HTMLTextAreaElement;

/* <TextArea />
============================================================================= */
const TextArea = forwardRef<Ref, Props>(
  ({ onClick, className, ...props }, ref) => (
    <textarea
      className={classNames(
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
