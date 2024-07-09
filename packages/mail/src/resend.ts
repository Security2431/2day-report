import { Resend } from "resend";

import { env } from "../env";

export const resend = new Resend(env.AUTH_RESEND_KEY);
