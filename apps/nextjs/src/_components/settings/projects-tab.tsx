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
                <DeleteProject id={project.id} name={project.name} />
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

/* <DeleteProject />
============================================================================= */
export const DeleteProject = ({ id, name }: { id: string; name: string }) => {
  const utils = api.useUtils();
  const deleteProject = api.project.delete.useMutation({
    async onSuccess() {
      toast.success(`Your project ${name} successfully deleted!`);

      await utils.project.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete project"
          : "Failed to delete project",
      );
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto size-8 text-red-500 hover:text-red-500"
        >
          <Icons.Trash2 className="size-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete &quot;
            <span className="font-bold text-foreground underline">{name}</span>
            &quot; project and remove all related data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteProject.mutate(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
