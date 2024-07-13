// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import type { EmailConfig } from "@auth/core/providers/email";
// import { nanoid } from "nanoid";

// import { env } from "../env";
// import { resend } from "./resend";
// import { LoginEmail } from "./templates/login-email";
// import { ThanksEmail } from "./templates/thanks-email";
// import { VerificationEmail } from "./templates/verification-email";

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

// export const sendWelcomeEmail = async ({
//   toMail,
//   userName,
// }: SendWelcomeEmailProps) => {
//   const subject = "Thanks for using 2day.report!";
//   const temp = ThanksEmail({ userName });

//   // @ts-ignore
//   await resend.emails.send({
//     from: env.EMAIL_FROM,
//     to: toMail,
//     subject: subject,
//     headers: {
//       "X-Entity-Ref-ID": nanoid(),
//     },
//     react: temp,
//   });
// };

// export const sendVerificationEmail = async ({
//   toMail,
//   verificationUrl,
//   userName,
// }: SendVerificationEmailProps) => {
//   const subject = "Email Verification for 2day.report";
//   const temp = VerificationEmail({ userName, verificationUrl });

//   // @ts-ignore
//   await resend.emails.send({
//     from: env.EMAIL_FROM,
//     to: toMail,
//     subject: subject,
//     headers: {
//       "X-Entity-Ref-ID": nanoid(),
//     },
//     react: temp,
//   });
// };

// export const sendMagicAuthEmail = async ({
//   toMail,
//   verificationUrl,
// }: SendMagicAuthEmailProps): Promise<ReturnType<typeof resend.emails.send>> => {
//   const subject = "Login Link for 2day.report";
//   const temp = LoginEmail({ verificationUrl });

//   // @ts-ignore
//   return resend.emails.send({
//     from: "2day.report<noreply@2day.report>",
//     to: env.NODE_ENV === "development" ? "delivered@resend.dev" : toMail,
//     subject: subject,
//     headers: {
//       "X-Entity-Ref-ID": nanoid(),
//     },
//     // react: temp,
//     text: "Your login link is: \n\n" + verificationUrl,
//   });
// };

// export const sendVerificationRequest: EmailConfig["sendVerificationRequest"] =
//   async ({ identifier, url, provider }) => {
//     const subject = "Login Link for 2day.report";
//     const temp = LoginEmail({ verificationUrl: url });

//     try {
//       // @ts-ignore
//       const { data, error } = await resend.emails.send({
//         from: provider.from,
//         to:
//           env.NODE_ENV === "development" ? "delivered@resend.dev" : identifier,
//         subject: subject,
//         headers: {
//           "X-Entity-Ref-ID": nanoid(),
//         },
//         react: temp,
//       });

//       if (error || !data) {
//         throw new Error(error?.message);
//       }
//     } catch (error) {
//       throw new Error("Failed to send verification email.");
//     }
//   };
