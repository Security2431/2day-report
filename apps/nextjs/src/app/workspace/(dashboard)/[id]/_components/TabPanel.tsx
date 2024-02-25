import type { UseFieldArrayReturn } from "react-hook-form";
import { useId } from "react";
import clsx from "clsx";
import { Emoji } from "emoji-picker-react";
import { useFormContext } from "react-hook-form";
import { BsTrash } from "react-icons/bs";

import type { FormData } from "./modal/FilldayModal";
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

/* Local constants & types
============================================================================= */
const MOOD_LIST = [
  { title: "calm", unified: "1f60c" },
  { title: "happy", unified: "1f642" },
  { title: "excited", unified: "1f917" },
  { title: "celebratory", unified: "1f929" },
  { title: "joyful", unified: "1f602" },
  { title: "confident", unified: "1f60e" },
  { title: "focused", unified: "1f9d0" },
  { title: "goofy", unified: "1f92a" },
  { title: "nerdy", unified: "1f913" },
  { title: "thoughtful", unified: "1f914" },
  { title: "meh", unified: "1f610" },
  { title: "confused", unified: "1f615" },
  { title: "frustrated", unified: "1f633" },
  { title: "surprised", unified: "1f632" },
  { title: "tired", unified: "1f634" },
  { title: "disappointed", unified: "1f641" },
  { title: "worried", unified: "1f627" },
  { title: "annoyed", unified: "1f644" },
  { title: "stressed", unified: "1f92f" },
  { title: "angry", unified: "1f620" },
  { title: "sick", unified: "1f912" },
];

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
  const watchMood = watch("mood");

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

              <fieldset className="flex flex-wrap gap-2">
                <legend className="w-full">How are you feeling?</legend>
                {MOOD_LIST.map(({ title, unified }, index) => (
                  <label
                    className={clsx(
                      "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/10",
                      {
                        "bg-white/30": watchMood === unified,
                      },
                    )}
                    title={title}
                    key={index}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      value={unified}
                      {...register("mood")}
                    />
                    <Emoji unified={unified} size={22} />
                  </label>
                ))}
              </fieldset>
            </TabPanel>
          ),
        )}
      </TabPanels>
    </Tabs>
  );
};

export default ComposedTabs;
