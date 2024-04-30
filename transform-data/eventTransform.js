const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function transformName(name) {
  return name;
}

function transformLocation(location) {
  return location;
}

function transformDate(date) {
  return new Date(date);
}

function transformStartTime(startTime) {
  return startTime;
}

function transformEndTime(endTime) {
  return endTime;
}

function transformBeneficiary(beneficiary) {
  return beneficiary.toString();
}

function transformCreateAt(createdat) {
  return new Date(createdat);
}

function transformUpdateAt(updatedat) {
  return new Date(updatedat);
}
function transformTarget(target) {
  return Number(target);
}

function transformId(id) {
  return id.toString();
}

async function lookupOrganizationId(orgMongoId) {
  const organization = await prisma.organization.findUnique({
    where: { orgMongoId },
  });
  if (!organization) {
    throw new Error(`Organization with OrgMongoId ${orgMongoId} not found`);
  }
  return organization.uuid;
}

async function transformEventData(document) {
  const convertOrgId = transformBeneficiary(document.beneficiary);
  const organizationId = await lookupOrganizationId(convertOrgId);
  console.log(organizationId, "organizationId from eventtransform");
  return {
    eventMongoId: transformId(document._id),
    name: transformName(document.name),
    location: transformLocation(document.location),
    contactInfo: {
      phone: document.phone,

      name: document.contactname,
    },
    target: transformTarget(document.target),

    date: transformDate(document.date),
    startTime: document.startTime,

    endTime: document.endTime,

    organizationId: organizationId, //Hlb Org UUID
    //orgMongoId: transformBeneficiary(document.beneficiary),
    isClosed: document.is_closed,
    //beneficiaryId: transformBeneficiary(document.team),
    createdAt: transformCreateAt(document.created_at),
    updatedAt: transformUpdateAt(document.updated_at),
  };
}

module.exports = {
  transformEventData,
};

//beneficiaryId: transformBeneficiary(document.beneficiary), UUID
//contactInfo: {name, phone, email}

//eventMongoId transformId(document._id),
