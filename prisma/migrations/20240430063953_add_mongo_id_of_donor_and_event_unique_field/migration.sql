/*
  Warnings:

  - A unique constraint covering the columns `[donorMongoId]` on the table `tbl_donors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventMongoId]` on the table `tbl_events` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tbl_donors_donorMongoId_key" ON "tbl_donors"("donorMongoId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_events_eventMongoId_key" ON "tbl_events"("eventMongoId");
