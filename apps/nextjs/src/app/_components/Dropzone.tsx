import React, { useCallback, useState } from "react";
import classNames from "classnames";
import type { FileRejection } from "react-dropzone";
import { ErrorCode, useDropzone } from "react-dropzone";

import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE } from "../_lib/constants";
import {
  INVALID_IMAGE_MIME_TYPES,
  INVALID_IMAGE_SIZE,
} from "../_lib/validations";

/* Props - <Dropzone />
============================================================================= */
interface Props {
  className?: string;
  children: React.ReactNode;
}

/* <Dropzone />
============================================================================= */
const Dropzone: React.FC<Props> = ({ className, children }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[] | null>(null);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    // Customize errors message
    const err = fileRejections[0]?.errors.map((error) => {
      return (
        {
          [ErrorCode.FileInvalidType]: INVALID_IMAGE_MIME_TYPES,
          [ErrorCode.FileTooLarge]: INVALID_IMAGE_SIZE,
        }[error.code] || error.message
      );
    });

    setErrors(err);
  }, []);

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setErrors(null);
    setSelectedFile(acceptedFiles[0] ?? null);
  }, []);

  // FIXME: types seems to be broken
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // accept awaits object in format `{'image/*': []}`
    accept: ACCEPTED_MIME_TYPES.reduce(
      (mimes, type) => ({ ...mimes, [type]: [] }),
      {},
    ),
    onDropRejected,
    onDropAccepted,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Dropzone;
