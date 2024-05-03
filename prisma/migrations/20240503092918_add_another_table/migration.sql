/*
  Warnings:

  - Made the column `eventId` on table `tbl_donations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `donorId` on table `tbl_donations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tbl_donations" DROP CONSTRAINT "tbl_donations_donorId_fkey";

-- DropForeignKey
ALTER TABLE "tbl_donations" DROP CONSTRAINT "tbl_donations_eventId_fkey";

-- AlterTable
ALTER TABLE "tbl_donations" ALTER COLUMN "eventId" SET NOT NULL,
ALTER COLUMN "donorId" SET NOT NULL;

-- CreateTable
CREATE TABLE "tbl_notFounds" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "donationId" TEXT NOT NULL,
    "bloodBagType" "BloodBagType" DEFAULT 'SINGLE',
    "bloodBagId" TEXT,
    "tubeId" TEXT,
    "consentUrl" TEXT,
    "rejectReason" JSONB,
    "note" TEXT,
    "extras" JSONB,
    "custom" TEXT,
    "eventId" TEXT,
    "donorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_notFounds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_notFounds_uuid_key" ON "tbl_notFounds"("uuid");

-- AddForeignKey
ALTER TABLE "tbl_donations" ADD CONSTRAINT "tbl_donations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "tbl_events"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_donations" ADD CONSTRAINT "tbl_donations_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "tbl_donors"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
