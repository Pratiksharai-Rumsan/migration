/*
  Warnings:

  - A unique constraint covering the columns `[orgMongoId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Organization_orgMongoId_key" ON "Organization"("orgMongoId");
