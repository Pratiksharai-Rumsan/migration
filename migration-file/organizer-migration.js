const { PrismaClient } = require("@prisma/client");
const { MongoClient } = require("mongodb");

const {
  transformOrganizerData,
} = require("../transform-data/organizerTransfrom");

const prisma = new PrismaClient();

const mongoUrl = "mongodb://localhost:27017";

const mongoDbName = "donation-migration";
const mongoCollectionName = "teams";
const processedOrganizationIds = new Set();

async function connectMongoDB() {
  const mongoClient = new MongoClient(mongoUrl);
  await mongoClient.connect();

  return mongoClient.db(mongoDbName).collection(mongoCollectionName);
}

async function exportData(mongoCollection) {
  const mongoData = await mongoCollection.find().toArray();
  console.log(`Exported ${mongoData.length} documents from MongoDB`);
  return mongoData;
}

async function migrateOrganizerData() {
  const mongoCollection = await connectMongoDB();

  const mongoData = await exportData(mongoCollection);

  try {
    for (const document of mongoData) {
      //const organizationId = document._id.toString();

      //   if (processedOrganizationIds.has(organizationId)) {
      //     console.log(`Skipping duplicate event with Id:${organizationId}`);
      //     continue;
      //   }
      const transformedDocument = transformOrganizerData(document);
      await prisma.organizer.create({
        data: transformedDocument,
      });
      //processedOrganizationIds.add(organizationId);
    }
  } finally {
    await prisma.$disconnect();
  }

  console.log(" Organizer Migration completed");
}

//migrateOrganizerData().catch(console.error);
module.exports = {
  migrateOrganizerData,
};
