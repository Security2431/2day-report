import type { UseFieldArrayReturn } from "react-hook-form";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import type { Prisma } from "@acme/db";

import type { FormData } from "./modal/FilldayModal";
import Button from "~/app/_components/button";
import Input from "~/app/_components/form/Input";
import Heading from "~/app/_components/heading";
import { initialFormValues } from "./modal/FilldayModal";

/* Props - <Projects />
============================================================================= */
interface Props {
  fieldArrays: {
    reports: UseFieldArrayReturn<FormData>;
  };
  projects: Pick<Prisma.ProjectCreateInput, "id" | "name">[];
  className?: string;
}

/* <Projects />
============================================================================= */
export const Projects: React.FC<Props> = ({
  fieldArrays,
  projects,
  className,
}) => {
  const { register } = useFormContext<FormData>();
  const { prepend, fields } = fieldArrays.reports;
  // Should filter all projects that are contained in the fieldArrays()
  const filteredProjects = projects.filter((project) =>
    fields.every((field) => field.projectId !== project.id),
  );

  return (
    <aside
      className={clsx(
        "flex w-36 flex-none flex-col gap-4 overflow-y-scroll",
        className,
      )}
    >
      <Heading as="h6">All projects:</Heading>
      <Input
        className="hidden rounded border border-white bg-transparent px-5 py-2"
        type="search"
        placeholder="Start typing..."
        {...register("search")}
      />

      {filteredProjects.map(({ id, name }) => (
        <Button
          key={id}
          type="button"
          onClick={() =>
            prepend({
              description: initialFormValues.description,
              hours: initialFormValues.workingHours,
              projectId: id!,
              projectName: name,
              reportId: initialFormValues.reportId,
            })
          }
        >
          <span className="truncate" title={name}>
            {name}
          </span>
        </Button>
      ))}
    </aside>
  );
};
