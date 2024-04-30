/*
  Warnings:

  - The `isActive` column on the `tbl_donors` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tbl_donors" DROP COLUMN "isActive",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;
