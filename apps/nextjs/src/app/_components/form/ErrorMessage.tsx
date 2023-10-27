import React from "react";
import type { FieldError, Merge } from "react-hook-form";

/* Props - <ErrorMessage />
============================================================================= */
interface Props {
  error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

/* <ErrorMessage />
============================================================================= */
const ErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <>
      {error && (
        <p className="mb-0 mt-3 text-sm text-red-500">{error.message}</p>
      )}
    </>
  );
};

export default ErrorMessage;
