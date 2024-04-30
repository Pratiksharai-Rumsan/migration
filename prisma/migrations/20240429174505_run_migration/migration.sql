/*
  Warnings:

  - You are about to drop the column `orgMongoId` on the `tbl_events` table. All the data in the column will be lost.
  - The `startTime` column on the `tbl_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endTime` column on the `tbl_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tbl_events" DROP COLUMN "orgMongoId",
ALTER COLUMN "bloodBank" DROP NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3),
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP(3);
