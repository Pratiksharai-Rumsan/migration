const {
  migrateOrganizationData,
} = require("./migration-file/organization-migration");
const {
  migrateOrganizerData,
} = require("./migration-file/organizer-migration");
const { migrateEventData } = require("./migration-file/events-migration");
const { migrateDonorData } = require("./migration-file/donor-migration");
const { migrateDonationData } = require("./migration-file/donation-migration");

async function runMigrations() {
  try {
    await migrateOrganizationData();
    await migrateOrganizerData();
    await migrateEventData();
    await migrateDonorData();
    await migrateDonationData();
    console.log("all migration completed sucessfully");
  } catch (error) {
    console.error("Error during migration:", error);
  }
}

runMigrations();
