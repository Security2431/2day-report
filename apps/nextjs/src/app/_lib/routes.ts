const routes = {
  home: "/",
  login: "/sign-in",
  // forgotPassword: "/forgot-password",
  // confirmEmail: "/confirm-email",
  // recoverEmail: "/recover-email",
  // verifyEmail: "/verify-email",
  workspaces: "/workspaces",
  settings: "/settings",
  404: "/404",
  500: "/500",
  thankYou: "/thank-you",
  workspace: (id: string) => `/workspace/${id}`,
};

export default routes;
