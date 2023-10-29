"use client";

import { useId } from "react";
import classNames from "classnames";

import styles from "./Switch.module.scss";

/* <Switch />
============================================================================= */
const Switch: React.FC<React.HTMLAttributes<HTMLInputElement>> = (props) => {
  const id = useId();

  return (
    <fieldset>
      <input
        type="checkbox"
        className={classNames(
          styles.ios8Switch,
          "visually-hidden",
          props.className,
        )}
        id={`${id}-checkbox`}
        {...props}
      />
      <label htmlFor={`${id}-checkbox`}>&nbsp;</label>
    </fieldset>
  );
};

export default Switch;
