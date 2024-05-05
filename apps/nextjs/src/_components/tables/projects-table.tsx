import type { Metadata } from "next";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { RouterOutputs } from "@acme/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import { toast } from "@acme/ui/toast";

import { api } from "~/trpc/react";
import { getColumns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import ProjectForm from "./_components/project-form";

export const metadata: Metadata = {
  title: "Settings - Projects",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function TaskPage() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<
    RouterOutputs["project"]["byWorkspaceId"][number] | null
  >(null);
  const utils = api.useUtils();

  const params = useParams<{ id: string }>();
  const { data: projects = [], isFetching } =
    api.project.byWorkspaceId.useQuery({
      id: params.id,
    });

  const deleteProject = api.project.delete.useMutation({
    async onSuccess({ name }) {
      toast.success(`Your project ${name} was deleted successfully!`);

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

  const onDelete = useCallback(
    (project: RouterOutputs["project"]["byWorkspaceId"][number]) => {
      deleteProject.mutate(project.id);
    },
    [],
  );

  const onEdit = useCallback(
    (project: RouterOutputs["project"]["byWorkspaceId"][number]) => {
      setSelectedProject(project);
      setIsDialogOpen(true);
    },
    [],
  );

  const columns = useMemo(() => getColumns({ onEdit, onDelete }), []);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            Here&apos;s a list of your projects!
          </CardDescription>
        </div>
        <ProjectForm
          isOpen={isDialogOpen}
          project={selectedProject}
          onOpenChange={(value) => {
            setIsDialogOpen(value);

            if (!value) {
              setSelectedProject(null);
            }
          }}
        />
      </CardHeader>
      <CardContent>
        {isFetching && <span>Loading...</span>}
        {!isFetching && <DataTable data={projects} columns={columns} />}
      </CardContent>
    </Card>
  );
}
