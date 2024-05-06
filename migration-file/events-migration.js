const { PrismaClient } = require("@prisma/client");
const { MongoClient } = require("mongodb");
const { transformEventData } = require("../transform-data/eventTransform");

const prisma = new PrismaClient();

const mongoUrl = "mongodb://localhost:27017";

const mongoDbName = "donation-migration";
const mongoCollectionName = "events";

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

async function migrateEventData() {
  const mongoCollection = await connectMongoDB();
  const mongoData = await exportData(mongoCollection);

  try {
    for (const document of mongoData) {
      const transformedData = await transformEventData(document);

      await prisma.event.create({
        data: transformedData,
      });
    }
  } finally {
    await prisma.$disconnect();
  }

  console.log("Event Migration completed");
}

//migrateEventData().catch(console.error);
module.exports = {
  migrateEventData,
};
