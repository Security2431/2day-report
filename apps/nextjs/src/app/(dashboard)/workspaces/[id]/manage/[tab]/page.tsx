"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui/tabs";

import { MembersTab } from "~/_components/settings/members-tab";
import { ProjectsTab } from "~/_components/settings/projects-tab";
import { SettingsTab } from "~/_components/settings/settings-tab";
import routes from "~/_utils/routes";

export default function Projects() {
  const params = useParams<{ id: string; tab: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(params.tab || "members");

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    router.replace(`${routes.workspaceManage(params.id)}/${params.tab}`);
  };

  useEffect(() => {
    setActiveTab(params.tab);
  }, [params.tab]);

  return (
    <section className="p-4">
      <Tabs
        value={activeTab}
        defaultValue={"members"}
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <MembersTab />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectsTab />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
