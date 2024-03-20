"use client";

import { DayType } from "@acme/db";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@acme/ui/form";
import { RadioGroup, RadioGroupItem } from "@acme/ui/radio-group";

import { getDayType } from "~/_utils/days";

/* <Status />
============================================================================= */
export function Status() {
  const form = useFormField();

  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-8 gap-4"
            >
              {(Object.keys(DayType) as (keyof typeof DayType)[]).map(
                (daytype, index) => {
                  const { icon: Icon, name } = getDayType(DayType[daytype]);

                  return (
                    <FormItem key={index}>
                      <FormControl>
                        <RadioGroupItem
                          value={daytype}
                          className="peer hidden"
                        />
                      </FormControl>
                      <FormLabel className="border-foregound text-foregound flex cursor-pointer flex-col items-center justify-center gap-2 rounded border px-3 py-2 text-[0.5rem] uppercase peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                        {Icon && <Icon className="text-xl" size={18} />}
                        {name}
                      </FormLabel>
                    </FormItem>
                  );
                },
              )}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
