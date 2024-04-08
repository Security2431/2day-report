"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

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
import { Icons } from "@acme/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";

import { getAvatarFallback } from "~/_utils/common";
import { PERMISSION_LIST } from "~/_utils/constants";
import { getPermission } from "~/_utils/permissions";
import { api } from "~/trpc/react";

export function MembersTab() {
  const [role, setRole] = useState<(typeof PERMISSION_LIST)[number]>();
  const params = useParams<{ id: string }>();
  const { data: permissions } = api.workspacesMembers.all.useQuery(params.id);

  const handleClick = (role: Role) => {
    const permission = getPermission(role);
    setRole(permission);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
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
                  {getPermission(permission)?.name}{" "}
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
                          className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                          onClick={() => handleClick(role)}
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
