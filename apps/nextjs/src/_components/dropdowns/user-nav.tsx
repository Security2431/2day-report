import Link from "next/link";

import type { Session } from "@acme/auth";
import { signOut } from "@acme/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";

import { getAvatarFallback } from "~/_utils/common";

/* Props - <UserNav />
============================================================================= */
interface Props {
  user: Session["user"];
}

/* <UserNav />
============================================================================= */
export const UserNav = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image!} alt={user.name!} />
            <AvatarFallback>{getAvatarFallback(user.name!)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild disabled>
            <Link href={"/"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild disabled>
            <Link href={"/"}>Billing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild disabled>
            <Link href={"/"}>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild disabled>
            <Link href={"/"}>Support</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form>
          <DropdownMenuItem asChild>
            <button
              className="w-full"
              type="submit"
              formAction={async () => {
                "use server";
                await signOut();
              }}
            >
              Logout
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
