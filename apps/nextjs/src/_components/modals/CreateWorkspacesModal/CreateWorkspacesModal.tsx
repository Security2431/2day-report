"use client";

import type * as z from "zod";
import React, { useCallback } from "react";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@acme/ui/form";
import { Icons } from "@acme/ui/icons";
import { Input } from "@acme/ui/input";
import { toast } from "@acme/ui/toast";
import { CreateWorkspaceSchema } from "@acme/validators";

import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE } from "~/_utils/constants";
import { api } from "~/trpc/react";

/* Props - <CreateWorkspacesModal />
============================================================================= */
interface Props {
  className?: string;
}

/* <CreateWorkspacesModal />
============================================================================= */
export function CreateWorkspacesModal({ className }: Props) {
  const form = useForm({
    schema: CreateWorkspaceSchema,
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const utils = api.useUtils();
  const createWorkspace = api.workspace.create.useMutation({
    async onSuccess() {
      toast.success("Your workspace has been created!");

      await utils.workspace.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to create workspace"
          : "Failed to create workspace",
      );
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateWorkspaceSchema>) => {
    createWorkspace.mutate(data);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      const isValid = await form.trigger();

      if (isValid) {
        await form.handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(className)}>
          <Icons.CirclePlus size={16} className="mr-2" /> Add new workspace
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new workspace</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onKeyDown={handleKeyDown}
            className="flex w-full max-w-md flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Picture:</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      size={MAX_FILE_SIZE}
                      accept={ACCEPTED_MIME_TYPES.join(",")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-start">
              <Button type="submit" disabled={createWorkspace.isPending}>
                Create workspace
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
