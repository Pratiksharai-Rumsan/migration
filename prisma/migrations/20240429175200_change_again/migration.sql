/*
  Warnings:

  - The `endDate` column on the `tbl_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tbl_events" DROP COLUMN "endDate",
ADD COLUMN     "endDate" TIMESTAMP(3),
ALTER COLUMN "endTime" SET DATA TYPE TEXT;
