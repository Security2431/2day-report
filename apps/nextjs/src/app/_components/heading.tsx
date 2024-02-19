import React from "react";
import clsx from "clsx";

/* Props - <Heading />
============================================================================= */
type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLOrSVGElement>;

/* <Heading />
============================================================================= */
const Heading: React.FC<Props> = ({ as = "h2", className, children }) => {
  const As = as;

  return (
    <As
      className={clsx(
        "text-center uppercase",
        {
          "text-4xl": as === "h1",
          "text-3xl": as === "h2",
          "text-2xl": as === "h3",
          "text-xl": as === "h4",
          "text-lg": as === "h5",
          "text-md": as === "h6",
        },
        className,
      )}
    >
      {children}
    </As>
  );
};

export default Heading;
