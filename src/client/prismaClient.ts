import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  console.log("Database connected");

  //   await prisma.test.create({
  //     data: {
  //       name: "John",
  //     },
  //   });

  const allTests = await prisma.test.findMany();

  console.log(allTests);
}

// main()
//   .then(async () => {
//     console.log("Disconnecting database");
//     await prisma.$disconnect();
//   })
//   .catch(async (err) => {
//     console.log(err);
//     await prisma.$disconnect();
//   });
