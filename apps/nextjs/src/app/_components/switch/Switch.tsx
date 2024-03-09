"use client";

import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@acme/ui";

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
    <figure className={cn(className)}>
      <input
        id={`input-field-${id}`}
        type="checkbox"
        className={cn(styles.ios8Switch, "sr-only", className)}
        {...props}
        {...register(props.name, { required: true })}
      />

      <label htmlFor={`input-field-${id}`}>&nbsp;</label>
    </figure>
  );
};

export default Switch;
