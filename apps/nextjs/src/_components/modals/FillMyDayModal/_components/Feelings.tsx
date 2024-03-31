"use client";

import { Emoji } from "emoji-picker-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@acme/ui/form";
import { RadioGroup, RadioGroupItem } from "@acme/ui/radio-group";

import { MOOD_LIST } from "~/_utils/constants";

/* <Feelings />
============================================================================= */
export function Feelings() {
  const form = useFormField();
  // const watchMood = watch("mood");

  return (
    <FormField
      control={form.control}
      name="mood"
      render={({ field }) => (
        <FormItem className="mt-auto">
          <FormLabel>How are you feeling?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-wrap gap-2"
            >
              {MOOD_LIST.map(({ title, unified }, index) => {
                return (
                  <FormItem key={index} title={title}>
                    <FormControl>
                      <RadioGroupItem value={unified} className="peer hidden" />
                    </FormControl>
                    <FormLabel className="inline-flex cursor-pointer items-center justify-center rounded-full border border-transparent p-1 transition-colors hover:border-foreground/10 hover:bg-foreground/10 peer-aria-checked:border-primary peer-aria-checked:bg-foreground/10 peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                      <Emoji unified={unified} size={20} />
                    </FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
