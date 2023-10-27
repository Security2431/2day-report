import type { InputHTMLAttributes } from "react";
import React, { forwardRef } from "react";
import classNames from "classnames";

type Props = InputHTMLAttributes<HTMLInputElement>;
export type Ref = HTMLInputElement;

/* <Input />
============================================================================= */
const Input = forwardRef<Ref, Props>(
  ({ onClick, className, type, ...props }, ref) => (
    <input
      className={classNames("", className)}
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
