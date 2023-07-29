/*
  Warnings:

  - Added the required column `order` to the `ShopItemImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShopItemImage" ADD COLUMN     "order" INTEGER NOT NULL;
