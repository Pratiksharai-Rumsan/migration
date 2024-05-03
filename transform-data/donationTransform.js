const { BloodBagType } = require("@prisma/client");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function transformBagType(bloodBagType) {
  switch (bloodBagType) {
    case "single":
      return BloodBagType.SINGLE;
    case "double":
      return BloodBagType.DOUBLE;
    case "triple":
      return BloodBagType.TRIPLE;
    default:
      return BloodBagType.SINGLE;
  }
}

function transformCreateAt(createdat) {
  return new Date(createdat);
}

function transformUpdateAt(updatedat) {
  return new Date(updatedat);
}

async function lookupDonorId(donorMongoId) {
  const donor = await prisma.donor.findUnique({
    where: { donorMongoId },
  });

  if (!donor) {
    //throw new Error(`Donor with DonorMongoId ${donorMongoId} not found`);
    console.warn(`Donor with DonorMongoId ${donorMongoId} not found`);
  }
  return donor?.uuid;
}

async function lookupEventId(eventMongoId) {
  const event = await prisma.event.findUnique({
    where: { eventMongoId },
  });
  if (!event) {
    //throw new Error(`Events with EventsMongoId ${eventMongoId} not found`);
    console.warn(`Event with eventMongoId ${eventMongoId} not found`);
  }
  return event?.uuid;
}

async function transformDonationData(document) {
  const convertDonorId = document.donor.toString();
  const convertEventId = document.event.toString();

  const donorNewId = await lookupDonorId(convertDonorId);
  const eventNewId = await lookupEventId(convertEventId);

  return {
    bloodBagId: document.blood_info ? document.blood_info.bag_number : null,

    tubeId: document.blood_info?.tube_id ?? null,

    bloodBagType: transformBagType(document.blood_info?.bag_type ?? null),
    rejectReason: {
      high_pressure: document.reject_reason
        ? document.reject_reason.high_pressure
        : null,
      low_pressure: document.reject_reason
        ? document.reject_reason.low_pressure
        : null,
      hb_low: document.reject_reason ? document.reject_reason.hb_low : null,
      medicine_use: document.reject_reason
        ? document.reject_reason.medicine_use
        : null,
      period_running: document.reject_reason
        ? document.reject_reason.period_running
        : null,
      other: document.reject_reason ? document.reject_reason.other : null,
    },
    donorId: donorNewId,

    eventId: eventNewId,
    createdAt: transformCreateAt(document.created_at),
    updatedAt: transformUpdateAt(document.updated_at),
  };
}

module.exports = {
  transformDonationData,
};
