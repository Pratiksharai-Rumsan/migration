/*
  Warnings:

  - You are about to drop the `Organizer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tbl_events" DROP CONSTRAINT "tbl_events_organizerId_fkey";

-- DropTable
DROP TABLE "Organizer";

-- CreateTable
CREATE TABLE "tbl_organizers" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "teamMongoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "tbl_organizers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_organizers_uuid_key" ON "tbl_organizers"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_organizers_teamMongoId_key" ON "tbl_organizers"("teamMongoId");

-- CreateIndex
CREATE INDEX "tbl_organizers_name_idx" ON "tbl_organizers"("name");

-- AddForeignKey
ALTER TABLE "tbl_events" ADD CONSTRAINT "tbl_events_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "tbl_organizers"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
