/*
  Warnings:

  - You are about to drop the column `inventory` on the `ShopItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShopItem" DROP COLUMN "inventory";

-- AlterTable
ALTER TABLE "ShopItemPrice" ADD COLUMN     "inventory" INTEGER;
