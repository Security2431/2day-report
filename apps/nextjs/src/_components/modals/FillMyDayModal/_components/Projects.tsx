import type { UseFieldArrayReturn } from "react-hook-form";
import type * as z from "zod";
import { useMemo, useState } from "react";

import type { Prisma } from "@acme/db";
import type { CreateFillMyDaySchema } from "@acme/validators";
import { cn } from "@acme/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { ScrollArea } from "@acme/ui/scroll-area";
import { Title } from "@acme/ui/title";

import { getAvatarFallback } from "~/_utils/common";
import { INITIAL_FORM_VALUES } from "../FillMyDayModal";

/* Props - <Projects />
============================================================================= */
interface Props {
  fieldReportArrays: UseFieldArrayReturn<z.infer<typeof CreateFillMyDaySchema>>;
  projects: Pick<Prisma.ProjectCreateInput, "id" | "name" | "image">[];
  className?: string;
}

/* <Projects />
============================================================================= */
export function Projects({ projects, className, fieldReportArrays }: Props) {
  const [projectFilter, setProjectFilter] = useState("");
  const { prepend, fields } = fieldReportArrays;

  // Should filter all projects that are contained in the fieldArrays()
  const filteredProjects = useMemo(
    () =>
      projects
        .filter((project) =>
          fields.every((field) => field.projectId !== project.id),
        )
        .filter((project) =>
          project.name.toLowerCase().includes(projectFilter.toLowerCase()),
        ),
    [projectFilter, projects, fields],
  );

  return (
    <aside
      className={cn(
        "flex min-h-[20rem] w-36 flex-none flex-col gap-2 overflow-y-scroll",
        className,
      )}
    >
      <Title variant="h6" asChild>
        <h6>All projects:</h6>
      </Title>
      <Input
        placeholder="Filter projects..."
        value={projectFilter}
        onChange={(event) => setProjectFilter(event.target.value)}
      />

      <ScrollArea>
        {!filteredProjects.length ? (
          <p className="text-sm">No projects found..</p>
        ) : (
          filteredProjects.map(({ id, name, image }) => (
            <Button
              key={name}
              variant="ghost"
              className="h-auto w-full justify-start gap-1 px-2 py-1.5 text-sm lowercase"
              type="button"
              onClick={() => {
                prepend({
                  projectId: id!,
                  projectName: name,
                  ...INITIAL_FORM_VALUES.reports,
                });
              }}
            >
              <Avatar className="size-5 text-[0.5rem]">
                <AvatarImage src={image!} />
                <AvatarFallback>{getAvatarFallback(name)}</AvatarFallback>
              </Avatar>
              <span className="truncate" title={name}>
                {name}
              </span>
            </Button>
          ))
        )}
      </ScrollArea>
    </aside>
  );
}
