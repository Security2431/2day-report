import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { getBaseUrl } from "../utils/base-url";

const baseUrl = getBaseUrl();

interface VerificationTemplateProps {
  verificationUrl: string;
}

export const LoginEmail = ({ verificationUrl }: VerificationTemplateProps) => (
  <Html>
    <Head />
    <Preview>Verify your email</Preview>
    <Tailwind>
      <Body className="bg-white">
        <Container className="mx-auto py-20">
          <Section className="mx-auto text-center">
            <Row>
              <Column align="right">
                <Img
                  src={`${baseUrl}/logo.svg`}
                  height="50"
                  alt="2day.report logo"
                  className="inline-block"
                />
              </Column>
              <Column align="left">
                <Text className="ml-2 text-lg font-bold">2day.report</Text>
              </Column>
            </Row>
          </Section>
          {/* <Text className="my-4 text-lg">Hi, {userName.split(" ")[0]}</Text> */}
          <Text className="text-center text-base font-semibold">
            Click the link below to login to your account.
          </Text>
          <Section className="mt-8 text-center">
            <Button
              className="bg-bg-white inline-block rounded-md bg-slate-900 px-6 py-3 text-base text-gray-100"
              href={verificationUrl}
            >
              Sign In
            </Button>
            <Text className="mt-2.5 text-sm">
              This link expires in 1 hour and can only be used once.
            </Text>
          </Section>
          <Text className="mt-8">
            Best,
            <br />
            2day.report team
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
