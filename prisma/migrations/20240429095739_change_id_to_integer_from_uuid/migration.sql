/*
  Warnings:

  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Organization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `latitude` on the `tbl_events` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `tbl_events` table. All the data in the column will be lost.
  - Added the required column `geoLocation` to the `tbl_events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tbl_events" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "geoLocation" JSONB NOT NULL;
