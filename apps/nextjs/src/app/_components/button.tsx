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
  variant?: "primary" | "secondary" | "link";
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
        "inline-flex cursor-pointer select-none items-center justify-center rounded px-4 py-2 text-center align-middle font-sans font-semibold uppercase text-white no-underline transition-colors disabled:pointer-events-none disabled:opacity-70",
        {
          "border border-white bg-transparent hover:border-transparent hover:bg-white hover:text-[#2e026d]":
            variant === "primary",
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
