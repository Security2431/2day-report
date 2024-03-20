"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import { Icons } from "@acme/ui/icons";
import { Title } from "@acme/ui/title";
import { toast } from "@acme/ui/toast";

import routes from "~/_utils/routes";
import { api } from "~/trpc/react";

export function Settings(props: {
  workspace: Promise<RouterOutputs["workspace"]["byId"]>;
  id: string;
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const initialData = use(props.workspace);
  const { data: workspace } = api.workspace.byId.useQuery(
    { id: props.id },
    {
      initialData,
    },
  );
  const deletePost = api.workspace.delete.useMutation({
    onSuccess: async () => {
      toast.success("Your workspace has been deleted!");
      await utils.workspace.invalidate();

      router.replace(routes.workspaces);
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete a post"
          : "Failed to delete workspace",
      );
    },
  });

  console.log("workspace", workspace);
  return (
    <div className="container">
      <Title asChild variant="h1">
        <h1>Settings</h1>
      </Title>

      <p className="text-foreground">
        Do you really want to delete{" "}
        <span className="font-bold uppercase">{workspace?.name}</span>{" "}
        workspace?
      </p>

      <Button
        variant="destructive"
        className="gap-2"
        onClick={() => deletePost.mutate(props.id)}
      >
        <Icons.Trash /> Delete workspace
      </Button>
    </div>
  );
}
