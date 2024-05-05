"use client";

import { useParams } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@acme/ui/alert-dialog";
import { Button } from "@acme/ui/button";
import { Icons } from "@acme/ui/icons";
import { toast } from "@acme/ui/toast";

import { api } from "~/trpc/react";
import { CreateProjectModal } from "../modals";
import TaskPage from "../tables/projects-table";

export function ProjectsTab() {
  const params = useParams<{ id: string }>();
  const { data: projects } = api.project.byWorkspaceId.useQuery({
    id: params.id,
  });

  return <TaskPage />;

  return (
    <div className="flex flex-col space-y-6">
      <CreateProjectModal className="ml-auto" />
      {projects?.length ? (
        <>
          <div className="flex items-center border-y">
            <span className="mr-2 font-bold">#</span>
            <p className="font-bold">Name</p>
            <p className="ml-auto font-bold">Delete</p>
          </div>

          {projects?.map((project, index) => {
            return (
              <div className="flex items-center  border-b" key={project.id}>
                <span className="mr-2">{index + 1}.</span>
                <p>{project.name}</p>
              </div>
            );
          })}
        </>
      ) : (
        <p>No projects yet..</p>
      )}
    </div>
  );
}
