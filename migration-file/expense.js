const { GoogleSpreadsheet } = require("google-spreadsheet");
const { PrismaClient } = require("@prisma/client");
const { JWT } = require("google-auth-library");
const { parse } = require("date-fns");

// Initialize Prisma Client
const prisma = new PrismaClient();

// Google Sheets setup
const SPREADSHEET_ID = "1SilEfeEbezZmkDUCQtT1EZZH1MgaveXfpDfBIzZtvs8";

const credentials = require("../config/google-sheets-credentials.json");
const serviceAccountAuth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Map existing departments, categories, and accounts to their IDs
const getIdMap = async () => {
  const departments = await prisma.department.findMany();
  const categories = await prisma.category.findMany();
  //console.log(categories);
  const accounts = await prisma.account.findMany();

  return {
    departments: departments.reduce(
      (acc, d) => ({ ...acc, [d.name]: d.id }),
      {}
    ),
    categories: categories.reduce((acc, c) => {
      return { ...acc, [c.name]: c.id }; // Logging each category during mapping
    }, {}),
    accounts: accounts.reduce((acc, a) => ({ ...acc, [a.name]: a.cuid }), {}),
  };
};

(async function importExpenses() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

  await doc.loadInfo();

  // Load the specific sheet
  const sheet = doc.sheetsByIndex[0]; // Use the first sheet, change index if needed
  //console.log(sheet.title);

  const rows = await sheet.getRows();
  //console.log(rows);

  const idMap = await getIdMap();

  // Iterate over each row in the Google Sheet
  for (const row of rows) {
    try {
      // Extract and map values
      const dateStr = row._rawData[0]; // Date
      const title = row._rawData[1]; // Title (Particulars)
      const amount = parseFloat(row._rawData[2].replace(",", "")); // Amount (remove commas if necessary)
      const accountName = row._rawData[4];

      const remarks = row._rawData[5] || ""; // Remarks (optional)

      const categoryName = row._rawData[6]; // Category
      //console.log(categoryName);

      const departmentName = row._rawData[7]; // Department

      // Parse the date (assuming "dd/MM/yyyy" format)
      const recordedDate = parse(dateStr, "M/d/yyyy", new Date());

      // Map dropdown values to their respective IDs
      const categoryId = idMap.categories[categoryName];
      //console.log(`Mapped category ID for '${categoryName}': ${categoryId}`);
      const departmentId = idMap.departments[departmentName];
      //console.log(departmentId);

      const accountId = idMap.accounts[accountName];

      // Insert data into the expense table
      await prisma.expense.create({
        data: {
          title,
          amount,
          categoryId,
          departmentId,
          accountId,
          source: "Google Sheet Import", // Static value; change if needed
          remarks,
          recordedDate,
        },
      });

      //console.log(`Inserted expense: ${title}, Date: ${dateStr}`);
    } catch (error) {
      console.error(`Failed to insert row: ${row["Particulars"]}`, error);
    }
  }

  // Close Prisma Client
  await prisma.$disconnect();
})();
