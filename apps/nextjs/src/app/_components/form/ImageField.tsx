import { useEffect, useId, useRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import classNames from "classnames";
import type AvatarEditor from "react-avatar-editor";
import { ErrorCode, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

import Button from "../button";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

/* Props - <ImageField />
============================================================================= */
type Props = {
  label: string;
  name: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

/* <ImageField />
============================================================================= */
const ImageField: React.FC<Props> = ({ label, className, ...props }) => {
  const avatarEditorRef = useRef<AvatarEditor>(null);
  const [scale, setScale] = useState<number>(1.2);
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <figure className={classNames(className)}>
      <Label htmlFor={`image-field-${id}`} className="block">
        {label}
      </Label>

      <div
        className={classNames(
          "border-olive-green m-auto flex h-64 w-64 flex-col items-center justify-center rounded-full border-2 border-dashed text-center",
        )}
      >
        <input
          className="visibility-hidden"
          type="file"
          accept="image/*"
          {...getInputProps()}
        />
      </div>

      <ErrorMessage error={errors[props.name]} />
    </figure>
  );
};

export default ImageField;
