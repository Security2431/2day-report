"use client";

import type { Row } from "@tanstack/react-table";
import * as React from "react";

import { RouterOutputs } from "@acme/api";
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

interface DeleteProjectsDialogProps<TData>
  extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  projects: Row<TData>[];
  onSuccess?: () => void;
  showTrigger?: boolean;
}

export function DeleteProjectsDialog<TData>({
  projects,
  onSuccess,
  showTrigger = true,
  ...props
}: DeleteProjectsDialogProps<TData>) {
  const utils = api.useUtils();

  const deleteProjects = api.project.deleteSome.useMutation({
    async onSuccess() {
      toast.success(
        `Your ${projects.length} projects was deleted successfully!`,
      );

      await utils.project.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete projects"
          : "Failed to delete project",
      );
    },
  });

  return (
    <AlertDialog {...props}>
      {showTrigger ? (
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Icons.TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({projects.length})
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-bold text-foreground underline">
              {projects.length}&nbsp;
              {projects.length === 1 ? "project" : "projects"}
            </span>{" "}
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:space-x-0">
          <AlertDialogCancel asChild>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              onClick={() => {
                const ids = projects.map((project) => project.original.id);

                deleteProjects.mutate(ids);
              }}
              disabled={deleteProjects.isPaused}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
