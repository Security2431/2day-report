"use client";

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
import { Input } from "@acme/ui/input";
import { Slider } from "@acme/ui/slider";

/* Props - <Hours />
============================================================================= */
interface Props {
  index: number;
}

/* <Hours />
============================================================================= */
export function Hours({ index }: Props) {
  const form = useFormField();

  return (
    <FormField
      control={form.control}
      name={`reports[${index}].hours`}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-end gap-2">
            How long you work on this project?
          </FormLabel>
          <div className="flex gap-4">
            <FormControl>
              <Slider
                min={0}
                max={24}
                step={0.5}
                defaultValue={[field.value]}
                onValueChange={([value]) => field.onChange(value)}
              />
            </FormControl>
            <FormControl>
              <Input
                className="w-14 text-center"
                placeholder="How old are you?" // your defaultValue must be undefined
                inputMode="numeric" // display numeric keyboard on mobile
                {...field}
                value={field.value} // avoid errors of uncontrolled vs controlled
                pattern="[0-9]+[\.,]([0-9]{1,2}"
                onChange={
                  (e) =>
                    e.target.validity.valid && field.onChange([e.target.value]) // e.target.validity.valid is required for pattern to work
                }
                readOnly
              />
            </FormControl>
          </div>
          <FormDescription>Fill your time from 0.5h to 24h</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
