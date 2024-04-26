"use client";

import type * as z from "zod";
import React from "react";
import { useParams } from "next/navigation";

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
import { CreateProjectSchema } from "@acme/validators";

import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE } from "~/_utils/constants";
import { api } from "~/trpc/react";

/* Props - <CreateProjectModal />
============================================================================= */
interface Props {
  className?: string;
}

/* <CreateProjectModal />
============================================================================= */
export function CreateProjectModal({ className }: Props) {
  const params = useParams<{ id: string }>();
  const form = useForm({
    schema: CreateProjectSchema,
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const utils = api.useUtils();
  const createProject = api.project.create.useMutation({
    async onSuccess() {
      toast.success("Your project has been created!");

      await utils.project.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to create project"
          : "Failed to create project",
      );
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateProjectSchema>) => {
    await createProject.mutate({ workspaceId: params.id, ...data });
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
        <Button
          size="sm"
          className={cn(className)}
          disabled={createProject.isPending}
        >
          {createProject.isPending ? (
            <Icons.LoaderCircle className="mr-2 size-4 animate-spin" />
          ) : (
            <Icons.Plus className="mr-2 size-4" />
          )}{" "}
          Create
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
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
              <Button type="submit" disabled={createProject.isPending}>
                Create project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
