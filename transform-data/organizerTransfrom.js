function transformCreateAt(createdat) {
  return new Date(createdat);
}

function transformUpdateAt(updatedat) {
  return new Date(updatedat);
}

function transformOrganizerData(document) {
  return {
    teamMongoId: document._id.toString(),
    name: document.name,
    address: document.address ? document.address : null,
    email: document.email,
    phone: document.phone,

    createdAt: transformCreateAt(document.created_at),
    updatedAt: transformUpdateAt(document.updated_at),
  };
}

module.exports = {
  transformOrganizerData,
};
