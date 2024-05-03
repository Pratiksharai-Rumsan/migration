const { PrismaClient } = require("@prisma/client");
const { MongoClient } = require("mongodb");

const {
  transformDonationData,
} = require("../transform-data/donationTransform");
const prisma = new PrismaClient();

const mongoUrl = "mongodb://localhost:27017";

const mongoDbName = "donation-migration";
const mongoCollectionName = "consents";

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

async function migrateData() {
  const mongoCollection = await connectMongoDB();
  const mongoData = await exportData(mongoCollection);
  //let skippedEventCount = 0;
  //let skippedDonorCount = 0;
  let skippedCount = 0;

  try {
    for (const document of mongoData) {
      const transformedData = await transformDonationData(document);

      // if (
      //   transformedData.eventId === undefined ||
      //   transformedData.eventId === null
      // ) {
      //   skippedEventCount++;
      //   continue;
      // }

      // if (
      //   transformedData.donorId === undefined ||
      //   transformedData.donorId === null
      // ) {
      //   skippedDonorCount++;
      //   continue;
      // }

      // await prisma.donation.create({
      //   data: transformedData,
      // });

      if (
        transformedData.eventId === undefined ||
        transformedData.eventId === null ||
        transformedData.donorId === undefined ||
        transformedData.donorId === null
      ) {
        skippedCount++;

        await prisma.notFound.create({
          data: transformedData,
        });
      } else {
        await prisma.donation.create({
          data: transformedData,
        });
      }
    }
  } finally {
    await prisma.$disconnect();
  }

  console.log("Migration completed");
  console.log(`Skipped ${skippedCount} record`);
}

migrateData().catch(console.error);

//@@unique([donorId, eventId], name: "donorEventIdentifier")
//@@unique([bloodBagId, eventId], name: "eventBloodbagIdentifier")
