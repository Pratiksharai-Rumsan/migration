/*
  Warnings:

  - You are about to drop the column `organizationId` on the `tbl_events` table. All the data in the column will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tbl_events" DROP CONSTRAINT "tbl_events_organizationId_fkey";

-- AlterTable
ALTER TABLE "tbl_events" DROP COLUMN "organizationId",
ADD COLUMN     "organizerId" TEXT;

-- DropTable
DROP TABLE "Organization";

-- CreateTable
CREATE TABLE "tbl_beneficiaries" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "orgMongoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "isBloodBank" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_beneficiaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizer" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "teamMongoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_beneficiaries_uuid_key" ON "tbl_beneficiaries"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_beneficiaries_orgMongoId_key" ON "tbl_beneficiaries"("orgMongoId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_beneficiaries_name_key" ON "tbl_beneficiaries"("name");

-- CreateIndex
CREATE INDEX "tbl_beneficiaries_name_idx" ON "tbl_beneficiaries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_uuid_key" ON "Organizer"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_teamMongoId_key" ON "Organizer"("teamMongoId");

-- AddForeignKey
ALTER TABLE "tbl_events" ADD CONSTRAINT "tbl_events_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "tbl_beneficiaries"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_events" ADD CONSTRAINT "tbl_events_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
