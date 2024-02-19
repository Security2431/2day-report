import React from "react";
import clsx from "clsx";

import styles from "./Spinner.module.scss";

/* Props - <Spinner />
============================================================================= */
interface Props {
  isFullScreen?: boolean;
  className?: string;
}

/* <Spinner />
============================================================================= */
const Spinner: React.FC<Props> = ({ isFullScreen, className }) => {
  return (
    <i
      className={clsx(styles.icon, className, {
        [styles.fullscreen!]: isFullScreen,
      })}
      aria-hidden="true"
    />
  );
};

export default Spinner;
