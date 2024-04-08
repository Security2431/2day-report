import { Role } from "@acme/db";

import { PERMISSION_LIST } from "./constants";

export const getPermission = (role?: Role) => {
  return PERMISSION_LIST.find((permission) => permission.role === role);
};
