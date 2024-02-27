import React, { useId } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import type { FormData } from "../../modal/FilldayModal";
import { DayTypes, getDayType } from "../../../_lib/days";
import styles from "./WorkTypes.module.scss";

/* Props - <WorkTypes />
============================================================================= */
interface Props {
  workType?: keyof typeof DayTypes;
  className?: string;
}

/* <WorkTypes />
============================================================================= */
const WorkTypes: React.FC<Props> = ({ workType, className }) => {
  const id = useId();
  const { register } = useFormContext<FormData>(); // retrieve all hook methods

  return (
    <section className={clsx("mb-4 grid grid-cols-4 gap-4", className)}>
      {(Object.keys(DayTypes) as (keyof typeof DayTypes)[]).map(
        (daytype, index) => {
          const Icon = getDayType(DayTypes[daytype])?.icon;

          return (
            <fieldset className="text-center" key={daytype}>
              <input
                className={clsx("visually-hidden", styles.radio)}
                id={`${id}-work-types-${index}`}
                type="radio"
                defaultChecked={daytype === workType}
                value={daytype}
                {...register("type", { required: true })}
              />
              <label
                htmlFor={`${id}-work-types-${index}`}
                className={styles.label}
              >
                {Icon && <Icon className="text-xl" />}
                {DayTypes[daytype]}
              </label>
            </fieldset>
          );
        },
      )}
    </section>
  );
};

export default WorkTypes;
