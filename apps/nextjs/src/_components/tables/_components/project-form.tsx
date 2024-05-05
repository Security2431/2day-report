import { useEffect } from "react";
import { useParams } from "next/navigation";
import * as z from "zod";

import { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogClose,
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

type ProjectType = RouterOutputs["project"]["byWorkspaceId"][number];

interface ProjectFormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  project: ProjectType | null;
}

const ProjectForm = ({ isOpen, onOpenChange, project }: ProjectFormProps) => {
  const utils = api.useUtils();
  const params = useParams<{ id: string }>();

  const form = useForm({
    schema: CreateProjectSchema,
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const updateProject = api.project.update.useMutation({
    async onSuccess({ name }) {
      toast.success(`Your project "${name}" was updated!`);

      await utils.project.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to update project"
          : "Failed to update project",
      );
    },
  });

  const createProject = api.project.create.useMutation({
    async onSuccess({ name }) {
      toast.success(`Your project "${name}" has been created!`);

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

  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        image: project?.image!,
      });
    } else {
      form.reset();
    }
  }, [isOpen, project]);

  const onSubmit = async (data: z.infer<typeof CreateProjectSchema>) => {
    const createdDto = { ...data, workspaceId: params.id };

    if (!project) {
      await createProject.mutate(createdDto);
    } else {
      await updateProject.mutate({ ...createdDto, id: project.id });
    }
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Icons.CirclePlus size={16} className="mr-2" /> Add project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {project ? "Update the project" : "Create new project"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            onKeyDown={handleKeyDown}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your project name..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Picture:</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      size={MAX_FILE_SIZE}
                      accept={ACCEPTED_MIME_TYPES.join(",")}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                disabled={createProject.isPending || updateProject.isPending}
              >
                {(createProject.isPending || updateProject.isPending) && (
                  <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
