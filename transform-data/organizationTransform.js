function transformName(name) {
  return name;
}

function transformLocation(location) {
  return location;
}

function transformDate(phone) {
  return phone;
}

function transformCreateAt(createdat) {
  return new Date(createdat);
}

function transformUpdateAt(updatedat) {
  return new Date(updatedat);
}

function transformId(id) {
  return id.toString();
}

function transformOrganizationData(document) {
  return {
    uuid: transformId(document._id),
    name: transformName(document.name),
    address: transformLocation(document.address),

    phone: transformDate(document.phone),
    isBloodBank: true,

    createdAt: transformCreateAt(document.created_at),
    updatedAt: transformUpdateAt(document.updated_at),

    //orgMongoId transformId(document._id),
  };
}

module.exports = {
  transformOrganizationData,
};
