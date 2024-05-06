const { PrismaClient } = require("@prisma/client");
const { MongoClient } = require("mongodb");

const { transformDonorData } = require("../transform-data/donorTransform");
const prisma = new PrismaClient();

const mongoUrl = "mongodb://localhost:27017";

const mongoDbName = "donation-migration";
const mongoCollectionName = "donors";

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

async function migrateDonorData() {
  const mongoCollection = await connectMongoDB();
  const mongoData = await exportData(mongoCollection);

  try {
    for (const document of mongoData) {
      const transformedData = transformDonorData(document);

      await prisma.donor.create({
        data: transformedData,
      });
    }
  } finally {
    await prisma.$disconnect();
  }

  console.log("Donor Migration completed");
}

//migrateDonorData().catch(console.error);

module.exports = {
  migrateDonorData,
};
