"use client";

import { Button } from "@acme/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@acme/ui/form";
import { Icons } from "@acme/ui/icons";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@acme/ui/popover";
import { Textarea } from "@acme/ui/textarea";

/* <Tomorrows />
============================================================================= */
export function Tomorrows() {
  const form = useFormField();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant="link" className="mr-auto gap-2">
            {!form.getValues("tomorrowsDescription") ? (
              <>
                <Icons.Plus size={18} />
                Add
              </>
            ) : (
              <>
                <Icons.Pen size={18} />
                Edit
              </>
            )}{" "}
            plan for tomorrow
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <FormField
            control={form.control}
            name="tomorrowsDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tomorrows plan:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us your plans for tomorrow"
                    className="resize-none"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <footer className="flex justify-end gap-2">
            <PopoverClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.resetField("tomorrowsDescription")}
              >
                Cancel
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button type="submit">Save</Button>
            </PopoverClose>
          </footer>
        </PopoverContent>
      </Popover>
    </>
  );
}
