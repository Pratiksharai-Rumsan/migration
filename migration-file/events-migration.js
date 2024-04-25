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

// function transformData(document) {
//   return {
//     id: document._id.toString(),
//   };
// }

async function migrateData() {
  const mongoCollection = await connectMongoDB();
  const mongoData = await exportData(mongoCollection);

  try {
    for (const document of mongoData) {
      const transformedData = transformEventData(document);

      await prisma.events.create({
        data: transformedData,
      });
    }
  } finally {
    await prisma.$disconnect();
  }

  console.log("Migration completed");
}

migrateData().catch(console.error);