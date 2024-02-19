"use client";

import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import styles from "./Switch.module.scss";

/* Props - <Switch />
============================================================================= */
type Props = {
  name: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

/* <Switch />
============================================================================= */
const Switch: React.FC<Props> = ({ className, ...props }) => {
  const id = useId();
  const { register } = useFormContext();

  return (
    <figure className={clsx(className)}>
      <input
        id={`input-field-${id}`}
        type="checkbox"
        className={clsx(styles.ios8Switch, "visually-hidden", className)}
        {...props}
        {...register(props.name, { required: true })}
      />

      <label htmlFor={`input-field-${id}`}>&nbsp;</label>
    </figure>
  );
};

export default Switch;
