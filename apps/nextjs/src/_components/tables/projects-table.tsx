import type { Metadata } from "next";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { RouterOutputs } from "@acme/api";
import { toast } from "@acme/ui/toast";

import { api } from "~/trpc/react";
import { getColumns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export const metadata: Metadata = {
  title: "Projects",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function TaskPage() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState<
    RouterOutputs["project"]["byWorkspaceId"][number] | null
  >(null);
  const utils = api.useUtils();

  const params = useParams<{ id: string }>();
  const { data: projects = [] } = api.project.byWorkspaceId.useQuery({
    id: params.id,
  });

  const deleteProject = api.project.delete.useMutation({
    async onSuccess() {
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
      setSelectedBankAccount(project);
      setIsDialogOpen(true);
    },
    [],
  );

  const columns = useMemo(() => getColumns({ onEdit, onDelete }), []);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your projects for this month!
            </p>
          </div>
        </div>
        <DataTable data={projects} columns={columns} />
      </div>
    </>
  );
}
