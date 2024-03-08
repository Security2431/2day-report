"use client";

import { createContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { FaBoxArchive, FaChartSimple, FaGear, FaUser } from "react-icons/fa6";
import { HiChevronDoubleLeft, HiOutlineCalendar } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

import Button from "~/app/_components/button";
import Dropdown from "~/app/_components/dropdown";
import routes from "~/app/_lib/routes";
import { NavigationScope } from "./navigation-scope";

/* Local constants & types
============================================================================= */
export const CollapsedContext = createContext<boolean>(false);

/* Props - <Navigation />
============================================================================= */
type Props = {
  className?: string;
};

/* <Navigation />
============================================================================= */
export function Navigation({ className }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <CollapsedContext.Provider value={isCollapsed}>
      <div
        className={clsx("relative flex-[13rem] flex-shrink-0 flex-grow-0", {
          "flex-[3rem]": isCollapsed,
        })}
      >
        <aside
          className={twMerge(
            "z-100 fixed left-0 top-0 flex h-full flex-col overflow-y-auto border-r",
            className,
            clsx({
              "w-12 p-2": isCollapsed,
              "md:w-42 px-4 py-2 xl:w-52": !isCollapsed,
            }),
          )}
        >
          <section className="mb-2">
            <Dropdown
              label={
                <figure className="flex items-center gap-2">
                  <Image width={24} height={24} src="/logo.svg" alt="home" />
                  {!isCollapsed && <figcaption>WebJS.tech</figcaption>}
                </figure>
              }
            >
              <Button className="p-2" variant="base" onClick={undefined}>
                Profile
              </Button>
            </Dropdown>
          </section>

          <NavigationScope
            title={{
              icon: FaBoxArchive,
              text: "Overview",
              href: routes.home,
            }}
            navigation={[
              {
                icon: HiOutlineCalendar,
                text: "Teams Overview",
                href: routes.home,
              },
              {
                icon: HiOutlineCalendar,
                text: "Time Zones",
                href: routes.home,
              },
              {
                icon: HiOutlineCalendar,
                text: "My Availability",
                href: routes.home,
              },
            ]}
          />

          <NavigationScope
            title={{
              icon: FaChartSimple,
              text: "Analytics",
              href: routes.home,
            }}
            navigation={[
              { icon: HiOutlineCalendar, text: "Reports", href: routes.home },
            ]}
          />

          <NavigationScope
            title={{
              icon: FaGear,
              text: "Manage",
              href: routes.home,
            }}
            navigation={[
              { icon: HiOutlineCalendar, text: "Members", href: routes.home },
              { icon: HiOutlineCalendar, text: "Teams", href: routes.home },
              { icon: HiOutlineCalendar, text: "Projects", href: routes.home },
              {
                icon: HiOutlineCalendar,
                text: "Integrations",
                href: routes.home,
              },
              { icon: HiOutlineCalendar, text: "Settings", href: routes.home },
            ]}
          />

          <NavigationScope
            title={{
              icon: FaUser,
              text: "Account",
              href: routes.home,
            }}
            navigation={[
              {
                icon: HiOutlineCalendar,
                text: "Notifications",
                href: routes.home,
              },
              { icon: FaSignOutAlt, text: "Sign Out", href: routes.home },
            ]}
          />

          <footer className="mt-auto leading-none">
            {isCollapsed ? (
              <Link
                className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-white hover:text-purple-500"
                href={routes.home}
              >
                <Image width={16} height={16} src="/logo.svg" alt="Account" />
              </Link>
            ) : (
              <Link
                className="mb-2 block"
                href={routes.home}
                title="My profile"
              >
                <figure className="flex items-center gap-2">
                  {/* // Avatar */}
                  <Image width={32} height={32} src="/logo.svg" alt="Account" />
                  <figcaption className="text-sm">
                    <p className="m-0 truncate" title="Artem Shcherbakov">
                      Artem Shcherbakov
                    </p>
                    <p
                      className="m-0 truncate text-xs"
                      title="Frontend Engineer"
                    >
                      (Frontend Engineer)
                    </p>
                  </figcaption>
                </figure>
              </Link>
            )}

            {isCollapsed ? (
              <Button
                variant="base"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-white hover:text-purple-500"
              >
                <BsFillPatchQuestionFill className="text-lg" />
              </Button>
            ) : (
              <p className="mb-0 text-xs text-white/80">
                <small>Copyright © 2023 2day.report</small>
                <br />
                <small>Version: 0.0.1</small>
              </p>
            )}
          </footer>
        </aside>

        <Button
          className="absolute left-full top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 p-2 backdrop-blur"
          onClick={() => setIsCollapsed((prevState) => !prevState)}
        >
          <HiChevronDoubleLeft
            className={clsx("transition-transform", {
              "rotate-180": isCollapsed,
            })}
          />
        </Button>
      </div>
    </CollapsedContext.Provider>
  );
}
