/*
  Warnings:

  - Added the required column `orgMongoId` to the `tbl_events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_events" ADD COLUMN     "orgMongoId" TEXT NOT NULL,
ALTER COLUMN "geoLocation" DROP NOT NULL;
