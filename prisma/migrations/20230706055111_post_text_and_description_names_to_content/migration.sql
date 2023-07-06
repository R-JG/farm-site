/*
  Warnings:

  - You are about to drop the column `text` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `HomePost` table. All the data in the column will be lost.
  - Added the required column `content` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `HomePost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "text",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HomePost" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL;
