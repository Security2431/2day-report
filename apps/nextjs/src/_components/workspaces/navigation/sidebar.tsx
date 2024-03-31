"use client";

import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";

import { Button } from "@acme/ui/button";
import { Icons } from "@acme/ui/icons";

import type { NavigationType } from "./nav-item";
import routes from "~/_utils/routes";
import { Navigation } from ".";

export function Sidebar() {
  const params = useParams<{ id: string }>();

  const topNav = useMemo<NavigationType[]>(
    () => [
      {
        icon: Icons.FileText,
        text: "Overview",
        href: routes.workspace(params.id),
        sub: [
          {
            icon: Icons.FileText,
            text: "Teams Overview",
            href: routes.workspace(params.id),
          },
          {
            icon: Icons.MapPin,
            text: "Time Zones",
            href: routes.timeZones,
          },
          {
            icon: Icons.CalendarDays,
            text: "My Availability",
            href: routes.home,
          },
        ],
      },
      {
        icon: Icons.BarChart2,
        text: "Analytics",
        href: routes.workspaceAnalitics(params.id),
        sub: [
          {
            icon: Icons.AreaChart,
            text: "Productivity",
            href: routes.home,
          },
        ],
      },
      {
        icon: Icons.Settings,
        text: "Manage",
        href: routes.workspaceSettings(params.id),
        sub: [
          {
            icon: Icons.Users,
            text: "Members",
            href: routes.workspaceMembers(params.id),
          },
          {
            icon: Icons.LayoutDashboard,
            text: "Teams",
            href: routes.workspaceTeams(params.id),
          },
          {
            icon: Icons.FolderClosed,
            text: "Projects",
            href: routes.workspaceProjects(params.id),
          },
          {
            icon: Icons.Layers3,
            text: "Integrations",
            href: routes.workspaceIntegrations(params.id),
          },
          {
            icon: Icons.Settings,
            text: "Settings",
            href: routes.workspaceSettings(params.id),
          },
        ],
      },
      {
        icon: Icons.Bell,
        text: "Notifications",
        href: routes.home,
        tooltip: "Notifications",
      },
      {
        icon: Icons.LogOut,
        text: "Logout",
        href: routes.home,
        tooltip: "Logout",
      },
    ],
    [params.id],
  );

  const bottomNav = useMemo<NavigationType[]>(
    () => [
      {
        icon: Icons.LifeBuoy,
        text: "Help",
        href: routes.home,
        tooltip: "Help",
      },
      {
        icon: Icons.SquareUser,
        text: "Account",
        href: routes.account,
        tooltip: "Account",
      },
    ],
    [],
  );

  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Icons.Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <Navigation links={topNav} />
      <Navigation className="mt-auto p-2" links={bottomNav} />
    </aside>
  );
}
