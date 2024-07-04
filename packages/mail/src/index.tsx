/* eslint-disable @typescript-eslint/ban-ts-comment */
import { nanoid } from "nanoid";

import { env } from "../env";
import { resend } from "./resend";
import LoginTemp from "./templates/login";
import ThanksTemp from "./templates/thanks";
import VerificationTemp from "./templates/verification";

export interface SendWelcomeEmailProps {
  toMail: string;
  userName: string;
}

export interface SendMagicAuthEmailProps {
  toMail: string;
  verificationUrl: string;
}

export interface SendVerificationEmailProps extends SendWelcomeEmailProps {
  verificationUrl: string;
}

export const sendWelcomeEmail = async ({
  toMail,
  userName,
}: SendWelcomeEmailProps) => {
  const subject = "Thanks for using 2day.report!";
  const temp = ThanksTemp({ userName });

  // @ts-ignore
  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: toMail,
    subject: subject,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
    react: temp,
  });
};

export const sendVerificationEmail = async ({
  toMail,
  verificationUrl,
  userName,
}: SendVerificationEmailProps) => {
  const subject = "Email Verification for 2day.report";
  const temp = VerificationTemp({ userName, verificationUrl });

  // @ts-ignore
  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: toMail,
    subject: subject,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
    react: temp,
  });
};

export const sendMagicAuthEmail = async ({
  toMail,
  verificationUrl,
}: SendMagicAuthEmailProps) => {
  const subject = "Login Link for 2day.report";
  const temp = LoginTemp({ verificationUrl });

  // @ts-ignore
  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: toMail,
    subject: subject,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
    react: temp,
  });
};
