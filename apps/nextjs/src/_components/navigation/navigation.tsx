"use client";

import { createContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BsCalendarWeekFill, BsFillPatchQuestionFill } from "react-icons/bs";
import { FaLayerGroup, FaSignOutAlt } from "react-icons/fa";
import { FaChartArea, FaFileLines, FaGear, FaUsers } from "react-icons/fa6";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { IoIosFolder, IoMdNotifications } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiMapPinTimeFill } from "react-icons/ri";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Icons } from "@acme/ui/icons";

import routes from "~/_utils/routes";
// import Dropdown from "~/app/_components/dropdown";
import { NavigationScope } from "./navigation-scope";

/* Local constants & types
============================================================================= */
export const CollapsedContext = createContext<boolean>(false);

/* Props - <Navigation />
============================================================================= */
interface Props {
  className?: string;
}

/* <Navigation />
============================================================================= */
export function Navigation({ className }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const params = useParams<{ id: string }>();

  return (
    <CollapsedContext.Provider value={isCollapsed}>
      <div
        className={cn("relative flex-[13rem] flex-shrink-0 flex-grow-0", {
          "flex-[3rem]": isCollapsed,
        })}
      >
        <aside
          className={cn(
            "z-100 fixed left-0 top-0 flex h-full flex-col overflow-y-auto border-r",
            className,
            cn({
              "w-12 p-2": isCollapsed,
              "md:w-42 px-4 py-2 xl:w-52": !isCollapsed,
            }),
          )}
        >
          <section className="mb-2">
            {/* <Dropdown
              label={
                <figure className="flex items-center gap-2">
                  <Image width={24} height={24} src="/logo.svg" alt="home" />
                  {!isCollapsed && <figcaption>WebJS.tech</figcaption>}
                </figure>
              }
            >
              <Button className="p-2" variant="outline" onClick={undefined}>
                Profile
              </Button>
            </Dropdown> */}
          </section>

          <NavigationScope
            title={{
              icon: Icons.FileText,
              text: "Overview",
              href: routes.workspace(params.id),
            }}
            navigation={[
              {
                icon: FaFileLines,
                text: "Teams Overview",
                href: routes.home,
              },
              {
                icon: RiMapPinTimeFill,
                text: "Time Zones",
                href: routes.home,
              },
              {
                icon: BsCalendarWeekFill,
                text: "My Availability",
                href: routes.home,
              },
            ]}
          />

          <NavigationScope
            title={{
              icon: Icons.BarChart2,
              text: "Analytics",
              href: routes.home,
            }}
            navigation={[
              { icon: FaChartArea, text: "Productivity", href: routes.home },
            ]}
          />

          <NavigationScope
            title={{
              icon: Icons.Settings,
              text: "Manage",
              href: routes.workspaceSettings(params.id),
            }}
            navigation={[
              {
                icon: FaUsers,
                text: "Members",
                href: routes.workspaceMembers(params.id),
              },
              {
                icon: MdSpaceDashboard,
                text: "Teams",
                href: routes.workspaceTeams(params.id),
              },
              {
                icon: IoIosFolder,
                text: "Projects",
                href: routes.workspaceProjects(params.id),
              },
              {
                icon: FaLayerGroup,
                text: "Integrations",
                href: routes.workspaceIntegrations(params.id),
              },
              {
                icon: FaGear,
                text: "Settings",
                href: routes.workspaceSettings(params.id),
              },
            ]}
          />

          <NavigationScope
            title={{
              icon: Icons.UserRound,
              text: "Account",
              href: routes.home,
            }}
            navigation={[
              {
                icon: IoMdNotifications,
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
                variant="outline"
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
          className={cn(
            "fixed top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 p-2 backdrop-blur",
            isCollapsed ? "left-[3rem]" : "left-[13rem]",
          )}
          onClick={() => setIsCollapsed((prevState) => !prevState)}
        >
          <HiChevronDoubleLeft
            className={cn("transition-transform", {
              "rotate-180": isCollapsed,
            })}
          />
        </Button>
      </div>
    </CollapsedContext.Provider>
  );
}
