import type { SelectHTMLAttributes } from "react";
import React, { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Select.module.scss";

/* Props - <Select />
============================================================================= */
type Props = { placeholder: string } & SelectHTMLAttributes<HTMLSelectElement>;
export type Ref = HTMLSelectElement;

/* <Select />
============================================================================= */
const Select = forwardRef<Ref, Props>(
  ({ onClick, className, placeholder, children, ...props }, ref) => (
    <select
      className={clsx(styles.selectDropdown, className)}
      ref={ref}
      onClick={onClick}
      {...props}
    >
      {React.Children.count(children) > 0 ? (
        <>
          <option value="" disabled selected>
            {placeholder}
          </option>

          {children}
        </>
      ) : (
        <option value="" disabled>
          No options available
        </option>
      )}
    </select>
  ),
);

Select.displayName = "Select";

export default Select;
