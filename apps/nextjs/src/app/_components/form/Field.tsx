import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import ErrorMessage from "./ErrorMessage";
import Input from "./Input";
import Label from "./Label";

/* Props - <Field />
============================================================================= */
type Props = {
  label: string;
  name: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

/* <Field />
============================================================================= */
const Field: React.FC<Props> = ({ label, className, ...props }) => {
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <figure className={clsx(className)}>
      <Label htmlFor={`input-field-${id}`} className="block">
        {label}
      </Label>
      <Input
        id={`input-field-${id}`}
        {...props}
        {...register(props.name, { required: true })}
      />

      <ErrorMessage error={errors[props.name]} />
    </figure>
  );
};

export default Field;
