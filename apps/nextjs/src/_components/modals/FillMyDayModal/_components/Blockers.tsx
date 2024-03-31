"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@acme/ui/form";
import { Icons } from "@acme/ui/icons";
import { Textarea } from "@acme/ui/textarea";

/* Props - <Blockers />
============================================================================= */
interface Props {
  index: number;
}

/* <Blockers />
============================================================================= */
export function Blockers({ index }: Props) {
  const form = useFormField();

  return (
    <FormField
      control={form.control}
      name={`reports[${index}].blockers`}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="flex items-end gap-2">
            <Icons.Ban className="text-red-500" size={18} />
            Are you blocked by anything?
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder="Leave this blank unless you need a help..."
              className="resize-none"
              rows={5}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
