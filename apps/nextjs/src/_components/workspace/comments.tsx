import { format, formatDistanceToNowStrict } from "date-fns";

import { RouterOutputs } from "@acme/api";
import { cn } from "@acme/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@acme/ui/collapsible";
import { Icons } from "@acme/ui/icons";
import { Separator } from "@acme/ui/separator";
import { toast } from "@acme/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";

import { getAvatarFallback } from "~/_utils/common";
import { api } from "~/trpc/react";
import { CommentsForm } from "./comments-form";

type Props = {
  userId: string;
  sprintId: string;
  comments: RouterOutputs["sprint"]["byDateRange"][number]["comments"];
  children: React.ReactNode;
};

export const Comments = ({ userId, sprintId, comments, children }: Props) => {
  const utils = api.useUtils();
  const deleteComment = api.comment.delete.useMutation({
    onSuccess: async () => {
      await utils.sprint.byDateRange.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete a comment"
          : "Failed to delete comment",
      );
    },
  });

  return (
    <Collapsible>
      <div className="flex items-start gap-1.5">
        <CollapsibleTrigger asChild>
          <Button
            className="mr-auto h-auto rounded-full px-2 py-1"
            variant="outline"
            size="icon"
          >
            <Icons.MessageSquarePlus className="size-3.5" />
          </Button>
        </CollapsibleTrigger>
        {children}
      </div>

      <CollapsibleContent className="mt-4">
        <CommentsForm userId={userId} sprintId={sprintId} />
      </CollapsibleContent>

      <section className="mt-4 space-y-2">
        {comments.map(({ id, message, updatedAt, user, private: isPrivate }) =>
          isPrivate && userId !== user.id ? null : (
            <>
              <Separator />
              <div key={id} className="flex gap-4">
                <div className="relative">
                  {isPrivate && (
                    <Icons.ShieldCheck className="absolute right-0 top-0 z-[1] size-4 text-destructive" />
                  )}
                  <Avatar
                    className={cn("hidden size-9 overflow-hidden sm:flex", {
                      "border-2 border-destructive": isPrivate,
                    })}
                  >
                    <AvatarImage src={user.image} alt="Avatar" />
                    <AvatarFallback>
                      {getAvatarFallback(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid w-full gap-1">
                  <p className="flex items-center gap-2 text-sm font-medium leading-none">
                    <span className="truncate">{user.name}</span>{" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <time
                          className="flex-none text-xs text-muted-foreground"
                          dateTime={format(
                            updatedAt,
                            "yyyy-MM-dd'T'HH:mm:ss.SSS",
                          )}
                        >
                          ({formatDistanceToNowStrict(updatedAt)})
                        </time>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {format(updatedAt, "PPPpp")}
                      </TooltipContent>
                    </Tooltip>
                    {userId === user.id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto size-6 flex-none text-red-500 hover:text-red-500"
                        onClick={() => deleteComment.mutate(id)}
                      >
                        <Icons.Trash className="size-1/2" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{message}</p>
                </div>
              </div>
            </>
          ),
        )}
      </section>
    </Collapsible>
  );
};
