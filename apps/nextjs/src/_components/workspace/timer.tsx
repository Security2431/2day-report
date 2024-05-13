/**
 * v0 by Vercel.
 * @see https://v0.dev/t/D7AWenFUOg4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@acme/ui/button";
import { Calendar } from "@acme/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import { Icons } from "@acme/ui/icons";
import { Input } from "@acme/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";

export default function Timer() {
  return (
    <>
      <div className="flex-1">
        <Input
          className="w-full rounded-md border-none px-4 py-2 text-base dark:text-gray-50"
          placeholder="What are you working on?"
          type="text"
          autoFocus
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <Icons.Folder className="h-5 w-5" />
            <span className="sr-only">Projects</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>Projects</DropdownMenuLabel> */}
          <div className="border-b dark:border-gray-800">
            <Input placeholder="Search projects..." type="text" />
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Work</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Personal</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Shopping</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Travel</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="text-lg font-bold" variant="ghost">
            <span>12</span>
            <span>:</span>
            <span>34</span>
            <span>:</span>
            <span>56</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span>-</span>
            </div>
            <Calendar initialFocus mode="single" />
          </div>
        </PopoverContent>
      </Popover>
      <Button size="icon" variant="primary">
        <Icons.Play className="size-5" />
        <span className="sr-only">Start/Stop timer</span>
      </Button>
    </>
  );
}
