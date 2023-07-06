/*
  Warnings:

  - You are about to drop the `InfoPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "InfoPost";

-- CreateTable
CREATE TABLE "HomePost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomePost_pkey" PRIMARY KEY ("id")
);
