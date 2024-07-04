import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const mocks: Prisma.UserCreateInput[] = [
  {
    id: "652ce878e5f41a254306180e",
    name: "Eduard Prystupa",
    image: "https://avatars.githubusercontent.com/u/129734981?v=4",
    email: "eduard.prystupa@gmail.com",
    createdAt: "2023-10-18T12:35:41+00:00",
    updatedAt: "2023-10-18T12:35:41+00:00",
  },
  {
    id: "652ce878e5f41a254306180f",
    name: "Artem",
    image: "https://avatars.githubusercontent.com/u/11134693?v=4",
    email: "severusv88@gmail.com",
    createdAt: "2023-10-18T12:35:41+00:00",
    updatedAt: "2023-10-18T12:35:41+00:00",
  },
];

function main() {
  return (
    Promise.all(mocks.map((user) => prisma.user.create({ data: user })))
      .then(() => console.info("[SEED] Successfully create user records"))
      .catch((e) => console.error("[SEED] Failed to create user records", e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(async () => {
        await prisma.$disconnect();
      })
  );
}

export default main;
