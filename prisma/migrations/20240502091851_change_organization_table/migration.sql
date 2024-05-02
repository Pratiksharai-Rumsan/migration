/*
  Warnings:

  - You are about to drop the column `beneficiaryId` on the `tbl_events` table. All the data in the column will be lost.
  - You are about to drop the `tbl_beneficiaries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tbl_events" DROP CONSTRAINT "tbl_events_beneficiaryId_fkey";

-- AlterTable
ALTER TABLE "tbl_events" DROP COLUMN "beneficiaryId",
ADD COLUMN     "organizationId" TEXT;

-- DropTable
DROP TABLE "tbl_beneficiaries";

-- CreateTable
CREATE TABLE "tbl_organizations" (
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

    CONSTRAINT "tbl_organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_organizations_uuid_key" ON "tbl_organizations"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_organizations_orgMongoId_key" ON "tbl_organizations"("orgMongoId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_organizations_name_key" ON "tbl_organizations"("name");

-- CreateIndex
CREATE INDEX "tbl_organizations_name_idx" ON "tbl_organizations"("name");

-- AddForeignKey
ALTER TABLE "tbl_events" ADD CONSTRAINT "tbl_events_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "tbl_organizations"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
