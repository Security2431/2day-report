"use client";

import { useParams, useRouter } from "next/navigation";

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

import routes from "~/_utils/routes";
import { api } from "~/trpc/react";

export function SettingsTab() {
  const params = useParams<{ id: string }>();
  const { data: workspace } = api.workspace.byId.useQuery({
    id: params.id,
  });

  if (!workspace) {
    return <p>No workspaces yet..</p>;
  }

  return (
    <>
      <p className="mb-4 text-foreground">
        Do you really want to delete{" "}
        <span className="font-bold uppercase">{workspace.name}</span> workspace?
      </p>

      <DeleteWorkspace id={workspace.id} name={workspace.name} />
    </>
  );
}

/* <DeleteProject />
============================================================================= */
export const DeleteWorkspace = ({ id, name }: { id: string; name: string }) => {
  const utils = api.useUtils();
  const router = useRouter();
  const deleteWorkspace = api.workspace.delete.useMutation({
    async onSuccess() {
      toast.success(`Your workspace ${name} successfully deleted!`);

      await utils.workspace.invalidate();
      router.replace(routes.workspaces);
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete workspace"
          : "Failed to delete workspace",
      );
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Icons.Trash2 className="mr-2 size-4" />
          Delete workspace
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete &quot;
            <span className="font-bold text-foreground underline">{name}</span>
            &quot; workspace and remove all related data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteWorkspace.mutate(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
