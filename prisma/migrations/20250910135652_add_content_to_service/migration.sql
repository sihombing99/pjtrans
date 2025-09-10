/*
  Warnings:

  - You are about to drop the column `content` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Car" ADD COLUMN     "content" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."Service" DROP COLUMN "content";
