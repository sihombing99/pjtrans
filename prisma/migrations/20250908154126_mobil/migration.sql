/*
  Warnings:

  - You are about to drop the `mobil` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."mobil";

-- CreateTable
CREATE TABLE "public"."Car" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
