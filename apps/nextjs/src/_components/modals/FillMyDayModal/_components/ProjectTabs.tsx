"use client";

import type { UseFieldArrayReturn } from "react-hook-form";
import type * as z from "zod";

import type { CreateFillMyDaySchema } from "@acme/validators";
import { Button } from "@acme/ui/button";
import { Icons } from "@acme/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui/tabs";

import { Blockers } from "./Blockers";
import { Description } from "./Description";
import { Hours } from "./Hours";

/* Props - <ProjectTabs />
============================================================================= */
interface Props {
  fieldReportArrays: UseFieldArrayReturn<z.infer<typeof CreateFillMyDaySchema>>;
}

/* <ProjectTabs />
============================================================================= */
export function ProjectTabs({ fieldReportArrays }: Props) {
  const { fields } = fieldReportArrays;

  if (!fields.length) {
    return <div className="py-4">Select project first...</div>;
  }

  return (
    <Tabs defaultValue={fields[0].projectName} className="py-4">
      <TabsList className="w-full justify-start">
        {fields.map((field) => (
          <TabsTrigger value={field.projectName} key={field.projectName}>
            {field.projectName}
          </TabsTrigger>
        ))}
      </TabsList>
      {fields.map((field, index) => (
        <TabsContent value={field.projectName} key={field.projectName}>
          <header className="flex justify-end">
            <Button
              className="gap-2"
              variant="ghost"
              onClick={() => fieldReportArrays.remove(index)}
            >
              <Icons.Trash className="size-4 text-red-500" size={18} /> Remove
              project
            </Button>
          </header>
          <div className="flex flex-col gap-6">
            <div className="flex justify-stretch gap-4">
              <Description index={index} />
              <Blockers index={index} />
            </div>
            <Hours index={index} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
