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
  return gender;
}

function transfromPhone(phone) {
  return phone;
}

function transformEmail(email) {
  return email;
}

function transformBloodGroup(bloodGroup) {
  return bloodGroup;
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
