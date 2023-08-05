/*
  Warnings:

  - You are about to drop the column `price` on the `ShopItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShopItem" DROP COLUMN "price";

-- CreateTable
CREATE TABLE "ShopItemPrice" (
    "id" SERIAL NOT NULL,
    "stripeId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "shopItemId" TEXT NOT NULL,

    CONSTRAINT "ShopItemPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShopItemPrice_stripeId_key" ON "ShopItemPrice"("stripeId");

-- AddForeignKey
ALTER TABLE "ShopItemPrice" ADD CONSTRAINT "ShopItemPrice_shopItemId_fkey" FOREIGN KEY ("shopItemId") REFERENCES "ShopItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
