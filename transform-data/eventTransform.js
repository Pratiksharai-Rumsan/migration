const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function transformDate(date) {
  return new Date(date);
}

function parseTimeString(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
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

async function lookupOrganizerId(teamMongoId) {
  const organizer = await prisma.organizer.findUnique({
    where: { teamMongoId },
  });
  if (!organizer) {
    //throw new Error(`Organization with OrgMongoId ${orgMongoId} not found`);
    console.warn(`Event with teamMongoId ${teamMongoId} not found`);
  }
  return organizer.uuid;
}

async function transformEventData(document) {
  const convertOrganizationId = document.beneficiary.toString();
  const convertOrganizerId = document.team.toString();

  const organizationId = await lookupOrganizationId(convertOrganizationId);
  const organizerId = await lookupOrganizerId(convertOrganizerId);

  console.log(organizationId, "organizationId from eventtransform");
  return {
    eventMongoId: transformId(document._id),
    name: document.name,
    location: document.location,
    contactInfo: {
      phone: document.phone,

      name: document.contactname,
    },
    target: transformTarget(document.target),

    date: transformDate(document.date),

    startTime: document.startTime ? parseTimeString(document.startTime) : null,

    endTime: document.endTime ? parseTimeString(document.endTime) : null,

    description: document.description,

    //organizer <-- teamid from mongo team table
    organizerId: organizerId,

    //organizationId: organizationId, //Hlb Org UUID
    organizationId: organizationId,
    //orgMongoId: transformBeneficiary(document.beneficiary),
    isClosed: document.is_closed,
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
