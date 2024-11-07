const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function insertCategoris() {
  const categories = [
    "Travel",
    "Salary",
    "Purchase",
    "Electricity",
    "water",
    "Communication",
    "Office Expenses",
    "Food",
    "Stationary",
    "Tax",
    "Petty Cash",
    "Repair and Maintainance",
    "Flight ",
    "HLB Salary Donation",
    "Yearly Bonus",

    "Employee Insurance",
    "Investment Returned",
    "Rahat Distribution Cash",
    "Mobilizer Payment",
    "Hotel and Accommodation",
    "Employee Loan",
    "Rent",
    "Contruction",
    "Payment Consultant",
    "Internet Payment",
  ];

  for (const name of categories) {
    // Check if the department already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    // Insert if it doesn't exist
    if (!existingCategory) {
      await prisma.category.create({
        data: { name },
      });
      console.log(`Inserted category: ${name}`);
    } else {
      console.log(`category "${name}" already exists.`);
    }
  }

  console.log("category seeding completed.");
}

insertCategoris()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
