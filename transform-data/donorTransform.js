function transformName(name) {
  return name;
}

function transformLocation(location) {
  return location;
}

function transformDate(date) {
  return new Date(date);
}

function transformBeneficiary(beneficiary) {
  return beneficiary.toString();
}

function transformCreateAt(createdat) {
  return new DataTransfer(createdat);
}

function transformUpdateAt(updatedat) {
  return new DataTransfer(updatedat);
}

function transformId(id) {
  return id.toString();
}

function transformEventData(document) {
  return {
    uuid: transformId(document._id),
    name: transformName(document.name),
    location: transformLocation(document.location),

    date: transformDate(document.date),
    organizationId: transformBeneficiary(document.beneficiary),
    createdAt: transformCreateAt(document.created_at),
    updatedAt: transformUpdateAt(document.updated_at),
  };
}

module.exports = {
  transformEventData,
};
