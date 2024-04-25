import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";
import { Checkbox } from "@acme/ui/checkbox";
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
import { Textarea } from "@acme/ui/textarea";
import { toast } from "@acme/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";
import { CreateCommentSchema } from "@acme/validators";

import { api } from "~/trpc/react";

type Props = {
  userId: string;
  sprintId: string;
};

export const CommentsForm = ({ userId, sprintId }: Props) => {
  const form = useForm({
    schema: CreateCommentSchema,
    defaultValues: {
      message: "",
      private: false,
    },
  });

  const utils = api.useUtils();
  const createComment = api.comment.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.sprint.byDateRange.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to left comment"
          : "Failed to left comment",
      );
    },
  });

  return (
    <Form {...form}>
      <form
        className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        onSubmit={form.handleSubmit(async (data) => {
          createComment.mutate({ userId, sprintId, ...data });
        })}
      >
        {form.getValues("private") && (
          <Badge
            variant="destructive"
            className="absolute right-0 top-0 -translate-y-1/2 px-0.5 py-0 text-xs"
          >
            Private
          </Badge>
        )}

        <FormField
          control={form.control}
          name="message"
          // className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"

          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage className="px-3" />
            </FormItem>
          )}
        />
        <div className="flex items-center p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon">
                <Icons.Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon">
                <Icons.Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip>
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            <Icons.Send className="size-3.5" />
          </Button>
        </div>

        <FormField
          control={form.control}
          name="private"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 border-t p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Private notes</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
