"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { cn } from "@acme/ui";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@acme/ui/breadcrumb";
import { Button } from "@acme/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@acme/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";

import { useMediaQuery } from "~/_hooks/useMediaQuery";
import routes from "~/_utils/routes";

interface BreadCrumbType {
  label: string;
  href?: string;
}

interface Props {
  items: BreadCrumbType[];
}

const ITEMS_TO_DISPLAY = 3;

export function BreadcrumbWithDropdown({ items }: Props) {
  const params = useParams<{ id: string }>();
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={routes.workspace(params.id)}>
            Teams Overview
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {items.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {items.slice(1, -2).map((item, index) => (
                      <DropdownMenuItem key={index}>
                        <Link href={item.href ? item.href : "#"}>
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle Menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {items.slice(1, -2).map((item, index) => (
                        <Link
                          key={index}
                          href={item.href ? item.href : "#"}
                          className="py-1 text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}
        {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <>
                <BreadcrumbLink
                  asChild
                  className="max-w-20 truncate md:max-w-none"
                >
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                {item.label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );

  // return (
  //   <Breadcrumb>
  //     <BreadcrumbList>
  //       <BreadcrumbItem>
  //         <BreadcrumbLink href={routes.workspace(params.id)}>
  //           Teams Overview
  //         </BreadcrumbLink>
  //       </BreadcrumbItem>

  //       {items?.map((item: BreadCrumbType, index: number) => (
  //         <React.Fragment key={item.title}>
  //           <BreadcrumbSeparator />
  //           <Link
  //             href={item.link}
  //             className={cn(
  //               "font-medium",
  //               index === items.length - 1
  //                 ? "pointer-events-none text-foreground"
  //                 : "text-muted-foreground",
  //             )}
  //           >
  //             {item.title}
  //           </Link>
  //         </React.Fragment>
  //       ))}
  //       {/*
  //       <BreadcrumbItem>
  //         <BreadcrumbLink href="/">Home</BreadcrumbLink>
  //       </BreadcrumbItem>
  //       <BreadcrumbSeparator>
  //         <SlashIcon />
  //       </BreadcrumbSeparator>
  //       <BreadcrumbItem>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger className="flex items-center gap-1">
  //             Components
  //             <ChevronDownIcon />
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="start">
  //             <DropdownMenuItem>Documentation</DropdownMenuItem>
  //             <DropdownMenuItem>Themes</DropdownMenuItem>
  //             <DropdownMenuItem>GitHub</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </BreadcrumbItem>
  //       <BreadcrumbSeparator>
  //         <SlashIcon />
  //       </BreadcrumbSeparator>
  //       <BreadcrumbItem>
  //         <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
  //       </BreadcrumbItem> */}
  //     </BreadcrumbList>
  //   </Breadcrumb>
  // );
}
