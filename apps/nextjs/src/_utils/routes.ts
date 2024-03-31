const routes = {
  home: "/",
  timeZones: "/timezones",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  confirmEmail: "/confirm-email",
  recoverEmail: "/recover-email",
  verifyEmail: "/verify-email",
  workspaces: "/workspaces",
  settings: "/settings",
  account: "/account",
  404: "/404",
  500: "/500",
  thankYou: "/thank-you",
  workspace: (workspaceId: string) => `${routes.workspaces}/${workspaceId}`,
  workspaceManage: (workspaceId: string) =>
    `${routes.workspaces}/${workspaceId}/manage`,
  workspaceIntegrations: (workspaceId: string) =>
    `${routes.workspaces}/${workspaceId}/manage/integrations`,
  workspaceProjects: (workspaceId: string) =>
    `${routes.workspaces}/${workspaceId}/manage/projects`,
  workspaceTeams: (workspaceId: string) =>
    `${routes.workspaces}/${workspaceId}/manage/teams`,
  workspaceMembers: (workspaceId: string) =>
    `${routes.workspaces}/${workspaceId}/manage/members`,
  workspaceSettings: (workspaceId: string) =>
    `${routes.workspaces}/${workspaceId}/manage/settings`,
  workspaceAnalitics: (workspaceId: string) => {
    return `${routes.workspaces}/${workspaceId}/analytics`;
  },
};

export default routes;
