const { Gender } = require("@prisma/client");
const { BloodGroup } = require("@prisma/client");

function transformId(id) {
  return id.toString();
}

function transformGender(gender) {
  if (gender === "M") {
    return Gender.MALE;
  } else if (gender === "F") {
    return Gender.FEMALE;
  } else {
    return Gender.UNKNOWN;
  }
}

function transformBloodGroup(bloodGroup, rhFactor) {
  switch (bloodGroup) {
    case "A":
      return rhFactor === "+" ? "A_POSITIVE" : "A_NEGATIVE";
    case "B":
      return rhFactor === "+" ? "B_POSITIVE" : "B_NEGATIVE";
    case "AB":
      return rhFactor === "+" ? "AB_POSITIVE" : "AB_NEGATIVE";
    case "O":
      return rhFactor === "+" ? "O_POSITIVE" : "O_NEGATIVE";
    default:
      return "DONT_KNOW";
  }
}

function transformCreateAt(createdat) {
  return new Date(createdat);
}

function transformUpdateAt(updatedat) {
  return new Date(updatedat);
}

function transformDonorData(document) {
  return {
    donorMongoId: transformId(document._id),
    name: document.name,
    phone: document.phone,
    email: document.email,
    gender: transformGender(document.gender),

    dop:
      document.dob && !isNaN(new Date(document.dob))
        ? new Date(document.dob)
        : null,
    dopNp:
      document.dob_np && !isNaN(new Date(document.dob_np))
        ? new Date(document.dob_np)
        : null,

    location: document.address ? document.address : "",
    isActive: document.is_active,

    bloodInfo: {
      group:
        document.blood_info &&
        document.blood_info.group &&
        document.blood_info.rh_factor
          ? transformBloodGroup(
              document.blood_info.group,
              document.blood_info.rh_factor
            )
          : "DONT_KNOW",
      rh_factor: document.blood_info ? document.blood_info.rh_factor : null,
      verified_date:
        document.blood_info &&
        document.blood_info.verified_date &&
        !isNaN(new Date(document.blood_info.verified_date))
          ? new Date(document.blood_info.verified_date)
          : null,
    },
    source: {
      name: document.source ? document.source.name : "",
      id: document.source ? document.source.id : "",
    },

    geoLocation: {
      longitude: document.geo_location ? document.geo_location.longitude : null,
      latitude:
        document.geo_location && document.geo_location.latitude
          ? document.geo_location.latitude
          : null,
    },

    donationLegacy: document.donations_legacy
      ? document.donations_legacy.map((date) => new Date(date))
      : [],

    lastDonated: document.lastDonated ? new Date(document.lastDonated) : null,
    createdAt: transformCreateAt(document.created_at),
    updatedAt: transformUpdateAt(document.updated_at),
  };
}

module.exports = {
  transformDonorData,
};

// blood_info: {
//   group: { type: String, enum: ["A", "B", "O", "AB", ""] },
//   rh_factor: { type: String, enum: ["+", "-"] },
//   is_verified: { type: Boolean, required: true, default: false },
//   verified_date: { type: Date },
//   verified_by: { type: ObjectId, ref: "Organization" }
// },

//    donations_legacy: [{ type: Date }],

// geo_location: {
//   longitude: Number,
//   latitude: Number
// },

// source: {
//   name: String,
//   id: String
// },

//Research this field
//is_active: { type: Boolean, default: true },

// doNotCall Boolean (False)

//donorMongoId transformId(document._id),
