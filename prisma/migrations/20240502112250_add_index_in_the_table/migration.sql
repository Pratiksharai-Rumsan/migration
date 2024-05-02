-- DropIndex
DROP INDEX "tbl_donors_name_idx";

-- DropIndex
DROP INDEX "tbl_events_name_idx";

-- DropIndex
DROP INDEX "tbl_organizations_name_idx";

-- DropIndex
DROP INDEX "tbl_organizers_name_idx";

-- CreateIndex
CREATE INDEX "tbl_donors_name_donorMongoId_idx" ON "tbl_donors"("name", "donorMongoId");

-- CreateIndex
CREATE INDEX "tbl_events_name_eventMongoId_idx" ON "tbl_events"("name", "eventMongoId");

-- CreateIndex
CREATE INDEX "tbl_organizations_name_orgMongoId_idx" ON "tbl_organizations"("name", "orgMongoId");

-- CreateIndex
CREATE INDEX "tbl_organizers_name_teamMongoId_idx" ON "tbl_organizers"("name", "teamMongoId");
