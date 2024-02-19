import type { LabelHTMLAttributes } from "react";
import React, { forwardRef } from "react";
import clsx from "clsx";

/* Local constants & types
============================================================================= */
export type Ref = HTMLLabelElement;

/* Props - <Label />
============================================================================= */
type Props = LabelHTMLAttributes<HTMLLabelElement>;

/* <Input />
============================================================================= */
const Label = forwardRef<Ref, Props>(
  ({ className, htmlFor, ...props }, ref) => (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={clsx(
        "mb-1 text-left text-sm font-semibold uppercase",
        className,
      )}
      {...props}
    />
  ),
);

Label.displayName = "Label";

export default Label;
