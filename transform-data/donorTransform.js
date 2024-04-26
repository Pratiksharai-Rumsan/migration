const { Gender } = require("@prisma/client");
const { BloodGroup } = require("@prisma/client");

function transformId(id) {
  return id.toString();
}

function transformName(name) {
  return name;
}

function transformLocation(location) {
  return location;
}

function transformBirthDate(birthDate) {
  return new Date(birthDate);
}
function transformNepaliBirthDate(nepaliBirthDate) {
  return new Date(nepaliBirthDate);
}
function transformLastDonatedDate(lastDonatedDate) {
  return new Date(lastDonatedDate);
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

function transfromPhone(phone) {
  return phone;
}

function transformEmail(email) {
  return email;
}

function transformBloodGroup(bloodGroup) {
  switch (bloodGroup) {
    case "A+":
      return BloodGroup.A_POSITIVE;
    case "A-":
      return BloodGroup.A_NEGATIVE;
    case "B+":
      return BloodGroup.B_POSITIVE;
    case "B-":
      return BloodGroup.B_NEGATIVE;
    case "AB+":
      return BloodGroup.AB_POSITIVE;
    case "AB-":
      return BloodGroup.AB_NEGATIVE;
    case "O+":
      return BloodGroup.O_POSITIVE;
    case "O-":
      return BloodGroup.O_NEGATIVE;
    default:
      return BloodGroup.DONT_KNOW;
  }
}

function transformCreateAt(createdat) {
  return new DataTransfer(createdat);
}

function transformUpdateAt(updatedat) {
  return new DataTransfer(updatedat);
}

function transformDonorData(document) {
  return {
    uuid: transformId(document._id), //create new
    name: transformName(document.name),
    phone: transfromPhone(document.phone),
    email: transformEmail(document.email),
    gender: transformGender(document.gender),
    dop: transformBirthDate(document.dob),
    dopNp: transformNepaliBirthDate(document.dob_np),
    location: transformLocation(document.address),
    bloodGroup: transformBloodGroup(document.blood_group),
    lastDonated: transformLastDonatedDate(document.last_donated_date),

    createdAt: transformCreateAt(document.created_at),
    updatedAt: transformUpdateAt(document.updated_at),

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
  };
}

module.exports = {
  transformDonorData,
};
