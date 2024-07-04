/* eslint-disable no-restricted-properties */
import { env } from "../../env";

export const getBaseUrl = (): string => {
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
};
