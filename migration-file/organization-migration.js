const { PrismaClient } = require("@prisma/client");
const { MongoClient } = require("mongodb");
const {
  transformOrganizationData,
} = require("../transform-data/organizationTransform");

const prisma = new PrismaClient();

const mongoUrl = "mongodb://localhost:27017";

const mongoDbName = "donation-migration";
const mongoCollectionName = "organizations";
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

async function migrateData(batchSize) {
  const mongoCollection = await connectMongoDB();
  let offset = 0;

  try {
    while (true) {
      const mongoData = await exportData(mongoCollection, batchSize);

      if (mongoData.length === 0) {
        break;
      }

      for (const document of mongoData) {
        const eventId = document._id.toString();

        if (processedOrganizationIds.has(eventId)) {
          console.log(`Skipping duplicate event with ID: ${eventId}`);
          continue;
        }

        const transformedData = transformOrganizationData(document);

        await prisma.organization.create({
          data: transformedData,
        });

        processedOrganizationIds.add(eventId);
      }

      offset += batchSize;
    }
  } finally {
    await prisma.$disconnect();
  }

  console.log("Migration completed");
}

const batchSize = 10;

migrateData(batchSize).catch(console.error);
