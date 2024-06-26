"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import * as z from "zod";

import { Role } from "@acme/db";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@acme/ui/command";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@acme/ui/form";
import { Icons } from "@acme/ui/icons";
import { MultiSelect } from "@acme/ui/multiselect";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui/tabs";
import { toast } from "@acme/ui/toast";
import { CreateMembersSchema } from "@acme/validators";

import { getAvatarFallback } from "~/_utils/common";
import { PERMISSION_LIST } from "~/_utils/constants";
import { getPermission } from "~/_utils/permissions";
import { api } from "~/trpc/react";

export function MembersTab() {
  const utils = api.useUtils();
  const params = useParams<{ id: string }>();
  const { data: permissions } = api.workspacesMembers.all.useQuery(params.id);

  const form = useForm({
    schema: CreateMembersSchema,
    defaultValues: {
      emails: [],
    },
  });

  const updatePermission = api.workspacesMembers.update.useMutation({
    async onSuccess() {
      toast.success("Your workspace permissions updated successfully!");

      await utils.workspacesMembers.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to update workspace permissions"
          : "Failed to update day report",
      );
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateMembersSchema>) => {};

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Invite your team members to collaborate.
          </CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="ml-auto h-7 gap-1">
              <Icons.PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Invite Members
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle className="text-center">Invite members</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="publicLink">
              <TabsList>
                <TabsTrigger value="publicLink">Public link</TabsTrigger>
                <TabsTrigger value="personalEmail">Personal email</TabsTrigger>
              </TabsList>

              <TabsContent value="publicLink">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="emails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Frameworks</FormLabel>
                          <MultiSelect
                            selected={field.value}
                            options={[
                              {
                                value: "next.js",
                                label: "Next.js",
                              },
                              {
                                value: "sveltekit",
                                label: "SvelteKit",
                              },
                              {
                                value: "nuxt.js",
                                label: "Nuxt.js",
                              },
                              {
                                value: "remix",
                                label: "Remix",
                              },
                              {
                                value: "astro",
                                label: "Astro",
                              },
                              {
                                value: "wordpress",
                                label: "WordPress",
                              },
                              {
                                value: "express.js",
                                label: "Express.js",
                              },
                            ]}
                            {...field}
                            className="sm:w-[510px]"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter className="mt-6 sm:justify-start">
                      <Button
                        type="submit"
                        // disabled={
                        //   updateSprint.isPending ||
                        //   createSprint.isPending ||
                        //   deleteReports.isPending
                        // }
                      >
                        Save
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="personalEmail"></TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="grid gap-6">
        {permissions?.map(({ id, user, permission }) => (
          <div className="flex items-center justify-between space-x-4" key={id}>
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image!} alt={user?.name!} />
                <AvatarFallback>{getAvatarFallback(user?.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                  {updatePermission.isPending ? (
                    <Icons.LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    getPermission(permission)?.name
                  )}{" "}
                  <Icons.ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
                <Command>
                  <CommandInput placeholder="Select new role..." />
                  <CommandList>
                    <CommandEmpty>No roles found.</CommandEmpty>
                    <CommandGroup>
                      {PERMISSION_LIST.map(({ role, name, description }) => (
                        <CommandItem
                          key={role}
                          value={role}
                          className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                          onSelect={() =>
                            updatePermission.mutate({ id, permission: role })
                          }
                          disabled={updatePermission.isPending}
                        >
                          <p>{name}</p>
                          <p className="text-sm text-muted-foreground">
                            {description}
                          </p>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
