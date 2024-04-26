const { BloodBagType } = require("@prisma/client");

function transformId(uuid) {
  return uuid.toString();
}
function transformBloodBagNum(bloodBagNum) {
  return bloodBagNum;
}

function transformTubeId(tubeId) {
  return tubeId;
}

function transformBagType(bloodBagType) {
  switch (bloodBagType) {
    case "single":
      return BloodBagType.SINGLE;
    case "double":
      return BloodBagType.DOUBLE;
    case "triple":
      return BloodBagType.TRIPLE;
  }
}

function transformDonorId(donorId) {
  return donorId.toString();
}
function transformEventId(eventId) {
  return eventId.toString();
}
function transformCreateAt(createdat) {
  return new DataTransfer(createdat);
}

function transformUpdateAt(updatedat) {
  return new DataTransfer(updatedat);
}
function transformDonationData(document) {
  return {
    uuid: transformId(document._id),
    bloodBagId: transformBloodBagNum(document.blood_info.bag_number),
    tubeId: transformTubeId(document.blood_info.tube_id),

    bloodBagType: transformBagType(document.blood_info.bag_type),
    donorId: transformDonorId(document.donor), //UUID
    //donorMongoId:
    eventId: transformEventId(document.event), //UUID
    //enventMongoId:
    createdAt: transformCreateAt(document.created_at),
    updatedAt: transformUpdateAt(document.updated_at),
  };
}

module.exports = {
  transformDonationData,
};
