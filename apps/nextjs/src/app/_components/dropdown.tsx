"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";
import { BiChevronRight } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import useOutsideClick from "~/app/_hooks/useOutsideClick";
import styles from "./dropdown.module.scss";

/* Props - <Dropdown />
============================================================================= */
type Props = {
  children?: ReactNode;
  title?: string;
  label: string | ReactNode;
  isOpen?: boolean;
  disabled?: boolean;
  className?: string;
};

/* <Dropdown />
============================================================================= */
const Dropdown: React.FC<Props> = ({
  label,
  children,
  isOpen: isDropdownOpened = false,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(isDropdownOpened);
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div ref={ref} className={twMerge("relative z-[50]", className)}>
      <button
        className={clsx(
          "relative z-[1] w-full overflow-hidden truncate text-ellipsis whitespace-nowrap rounded-md border bg-purple-500 p-2 text-sm font-bold uppercase",
          { "rounded-b-none": isOpen },
        )}
        onClick={() => setIsOpen((prevState) => !prevState)}
        title={typeof label === "string" ? label : ""}
        {...props}
      >
        {label}

        <BiChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-lg transition-transform" />
      </button>

      <ul
        className={twMerge(
          "absolute left-0 right-0 top-0 m-0 list-none overflow-hidden rounded-md border p-0 pt-10 text-left text-sm backdrop-blur",
          clsx({ hidden: !isOpen }),
        )}
      >
        {React.Children.map(
          children,
          (child, index) =>
            child && (
              <li
                className="m-0 flex flex-col border-t border-white transition-colors hover:bg-white hover:text-purple-500"
                key={`dropdown-menu-item-${index}`}
                onClick={() => setIsOpen(false)}
              >
                {child}
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
