import type { InputHTMLAttributes } from "react";
import React, { forwardRef } from "react";
import classNames from "classnames";

/* Local constants & types
============================================================================= */
export type Ref = HTMLInputElement;

/* Props - <Input />
============================================================================= */
type Props = InputHTMLAttributes<HTMLInputElement>;

/* <Input />
============================================================================= */
const Input = forwardRef<Ref, Props>(
  ({ onClick, className, type = "text", ...props }, ref) => (
    <input
      className={classNames(
        "mb-0 block w-full appearance-none rounded border border-white bg-transparent bg-clip-padding px-3 py-2 text-sm text-white backdrop-blur transition placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-white disabled:opacity-50",
        className,
      )}
      ref={ref}
      type={type}
      onClick={onClick}
      autoComplete="off"
      {...props}
    />
  ),
);

Input.displayName = "Input";

export default Input;
