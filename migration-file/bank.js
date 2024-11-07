const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function insertBanks() {
  const banks = ["Global NPR", "Citizen NPR", "HBL NPR", "Nabil NPR"];

  for (const name of banks) {
    // const existingBank = await prisma.account.findUnique({
    //   where: { name },
    // });

    // Insert if it doesn't exist

    await prisma.account.create({
      data: { name },
    });
  }

  console.log("bank seeding completed.");
}

insertBanks()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
