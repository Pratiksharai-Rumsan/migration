-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'DONT_KNOW');

-- CreateEnum
CREATE TYPE "BloodBagType" AS ENUM ('SINGLE', 'DOUBLE', 'TRIPLE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'UNKNOWN');

-- CreateTable
CREATE TABLE "tbl_events" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "contactEmail" TEXT,
    "contactName" TEXT,
    "location" TEXT NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "bloodBank" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_donors" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "dop" TIMESTAMP(3) NOT NULL,
    "dopNp" TIMESTAMP(3),
    "gender" "Gender" NOT NULL,
    "bloodGroup" "BloodGroup" NOT NULL DEFAULT 'DONT_KNOW',
    "location" TEXT NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "lastDonated" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT,

    CONSTRAINT "tbl_donors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_donations" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
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

    CONSTRAINT "tbl_donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_volunteers" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "role" TEXT,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "tbl_volunteers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_events_uuid_key" ON "tbl_events"("uuid");

-- CreateIndex
CREATE INDEX "tbl_events_name_idx" ON "tbl_events"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_donors_uuid_key" ON "tbl_donors"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_donors_phone_key" ON "tbl_donors"("phone");

-- CreateIndex
CREATE INDEX "tbl_donors_name_idx" ON "tbl_donors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_donations_uuid_key" ON "tbl_donations"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_donations_donorId_eventId_key" ON "tbl_donations"("donorId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_donations_bloodBagId_eventId_key" ON "tbl_donations"("bloodBagId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_volunteers_uuid_key" ON "tbl_volunteers"("uuid");

-- AddForeignKey
ALTER TABLE "tbl_events" ADD CONSTRAINT "tbl_events_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_donors" ADD CONSTRAINT "tbl_donors_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "tbl_events"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_donations" ADD CONSTRAINT "tbl_donations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "tbl_events"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_donations" ADD CONSTRAINT "tbl_donations_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "tbl_donors"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_volunteers" ADD CONSTRAINT "tbl_volunteers_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "tbl_events"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
