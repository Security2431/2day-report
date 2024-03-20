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

/* Props - <Description />
============================================================================= */
interface Props {
  index: number;
}

/* <Description />
============================================================================= */
export function Description({ index }: Props) {
  const form = useFormField();

  return (
    <FormField
      control={form.control}
      name={`reports[${index}].description`}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="flex items-end gap-2">
            <Icons.SquareCheckBig className="text-green-500" size={18} /> What
            did you do today?
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder="Add a short summary..."
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
