const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function insertDepartments() {
  const departments = [
    "Tech",
    "CSR-Esatya",
    "CSR-HLB",
    "Rahat BAU",
    "Rahat GSMA",
    "Admin",
    "HR",
  ];

  for (const name of departments) {
    // Check if the department already exists
    const existingDepartment = await prisma.department.findUnique({
      where: { name },
    });

    // Insert if it doesn't exist
    if (!existingDepartment) {
      await prisma.department.create({
        data: { name },
      });
      console.log(`Inserted department: ${name}`);
    } else {
      console.log(`Department "${name}" already exists.`);
    }
  }

  console.log("Department seeding completed.");
}

insertDepartments()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
