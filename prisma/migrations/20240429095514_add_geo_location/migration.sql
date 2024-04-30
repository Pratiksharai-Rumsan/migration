/*
  Warnings:

  - You are about to drop the column `bloodGroup` on the `tbl_donors` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `tbl_donors` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `tbl_donors` table. All the data in the column will be lost.
  - You are about to drop the column `contactEmail` on the `tbl_events` table. All the data in the column will be lost.
  - You are about to drop the column `contactName` on the `tbl_events` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `tbl_events` table. All the data in the column will be lost.
  - Added the required column `orgMongoId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodInfo` to the `tbl_donors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donorMongoId` to the `tbl_donors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geoLocation` to the `tbl_donors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `tbl_donors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `tbl_donors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactInfo` to the `tbl_events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventMongoId` to the `tbl_events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "orgMongoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tbl_donors" DROP COLUMN "bloodGroup",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "bloodInfo" JSONB NOT NULL,
ADD COLUMN     "donationLegacy" TIMESTAMP(3)[],
ADD COLUMN     "donorMongoId" TEXT NOT NULL,
ADD COLUMN     "geoLocation" JSONB NOT NULL,
ADD COLUMN     "isActive" JSONB NOT NULL,
ADD COLUMN     "source" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "tbl_events" DROP COLUMN "contactEmail",
DROP COLUMN "contactName",
DROP COLUMN "contactPhone",
ADD COLUMN     "beneficiaryId" TEXT,
ADD COLUMN     "contactInfo" JSONB NOT NULL,
ADD COLUMN     "eventMongoId" TEXT NOT NULL;
