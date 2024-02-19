import { useId } from "react";
import type { UseFieldArrayReturn } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { BsTrash } from "react-icons/bs";

import Button from "~/app/_components/button";
import Input from "~/app/_components/form/Input";
import TextArea from "~/app/_components/form/TextArea";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "~/app/_components/tabs";
import type { FormData } from "./modal/FilldayModal";

/* Props - <ComposedTabs />
============================================================================= */
interface Props {
  fieldArrays: {
    reports: UseFieldArrayReturn<FormData>;
  };
}

/* <ComposedTabs />
============================================================================= */
const ComposedTabs: React.FC<Props> = ({ fieldArrays }) => {
  const fieldId = useId();
  const { register, watch } = useFormContext<FormData>();
  const watchReports = watch("reports");

  const { fields, remove } = fieldArrays.reports;

  return (
    <Tabs className="w-full">
      <TabList>
        {fields.map(({ id, projectName }) => (
          <Tab key={id}>{projectName}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {fields.map(
          ({ id, projectId, description, hours, reportId }, index) => (
            <TabPanel key={id}>
              <Button
                variant="base"
                className="ml-auto text-red-500"
                type="button"
                onClick={() => remove(index)}
              >
                <BsTrash />
                Remove
              </Button>
              <Input
                type="hidden"
                defaultValue={projectId}
                {...register(`reports.${index}.projectId`)}
              />
              <Input
                type="hidden"
                defaultValue={reportId}
                {...register(`reports.${index}.reportId`)}
              />
              <fieldset className="mb-4 flex flex-col">
                <label htmlFor={`${fieldId}-description`} className="uppercase">
                  Description:
                </label>
                <TextArea
                  className="rounded border border-white bg-transparent p-2 backdrop-blur"
                  id={`${fieldId}-description`}
                  rows={5}
                  defaultValue={description}
                  {...register(`reports.${index}.description`)}
                />
              </fieldset>

              <fieldset className="relative mb-4 flex flex-col">
                <label htmlFor={`${fieldId}-hours`} className="uppercase">
                  Working hours:
                </label>
                <input
                  id={`${fieldId}-hours`}
                  type="range"
                  min="0"
                  max="24"
                  step="0.5"
                  defaultValue={hours}
                  {...register(`reports.${index}.hours`, {
                    valueAsNumber: true,
                  })}
                />
                <output
                  className="absolute -bottom-5 -translate-x-1/2"
                  style={{
                    left: `${(100 / 24) * watchReports[index]!.hours}%`,
                  }}
                >
                  {watchReports[index]?.hours.toString()}
                </output>
              </fieldset>
            </TabPanel>
          ),
        )}
      </TabPanels>
    </Tabs>
  );
};

export default ComposedTabs;
