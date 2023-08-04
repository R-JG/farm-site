/*
  Warnings:

  - The primary key for the `ShopItemPrice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stripeId` on the `ShopItemPrice` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ShopItemPrice_stripeId_key";

-- AlterTable
ALTER TABLE "ShopItemPrice" DROP CONSTRAINT "ShopItemPrice_pkey",
DROP COLUMN "stripeId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShopItemPrice_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShopItemPrice_id_seq";
