import type { ButtonHTMLAttributes } from "react";
import React, { forwardRef } from "react";
import classNames from "classnames";

import Spinner from "./spinner/Spinner";

/* Local constants & types
============================================================================= */
type Ref = HTMLButtonElement;

/* <Button />
============================================================================= */
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "link" | "base";
  isAnimating?: boolean;
};

/* <Button />
============================================================================= */
const Button = forwardRef<Ref, Props>(
  (
    {
      onClick,
      className,
      type,
      children,
      variant = "primary",
      isAnimating = false,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={classNames(
        "inline-flex cursor-pointer select-none items-center justify-center rounded text-center align-middle font-sans font-semibold uppercase transition-colors disabled:pointer-events-none disabled:opacity-70",
        {
          "border border-white bg-transparent px-4 py-2 text-white no-underline hover:border-transparent hover:bg-white  hover:text-purple-500":
            variant === "primary",
          "p-0 text-white  hover:underline": variant === "link",
        },
        className,
      )}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
      {isAnimating ? <Spinner /> : null}
    </button>
  ),
);

Button.displayName = "Button";

export default Button;
