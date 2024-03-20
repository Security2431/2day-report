const routes = {
  home: "/",
  timeZones: "/timezones",
  login: "/sign-in",
  forgotPassword: "/forgot-password",
  confirmEmail: "/confirm-email",
  recoverEmail: "/recover-email",
  verifyEmail: "/verify-email",
  workspaces: "/workspaces",
  settings: "/settings",
  404: "/404",
  500: "/500",
  thankYou: "/thank-you",
  workspace: (workspaceId: string) => `${routes.workspaces}/${workspaceId}`,
  workspaceSettings: (workspaceId: string) =>
    `${routes.workspaces}/${workspaceId}/settings`,
  workspaceIntegrations: (workspaceId: string) =>
    `${routes.workspaces}/${workspaceId}/integrations`,
  workspaceProjects: (workspaceId: string) =>
    `${routes.workspaces}/${workspaceId}/projects`,
  workspaceTeams: (workspaceId: string) =>
    `${routes.workspaces}/${workspaceId}/teams`,
  workspaceMembers: (workspaceId: string) =>
    `${routes.workspaces}/${workspaceId}/members`,
  workspaceAnalitics: (workspaceId: string) => {
    return `${routes.workspaces}/${workspaceId}/analytics`;
  },
};

export default routes;
