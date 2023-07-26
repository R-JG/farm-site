/*
  Warnings:

  - The primary key for the `ShopItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ShopItemImage" DROP CONSTRAINT "ShopItemImage_shopItemId_fkey";

-- AlterTable
ALTER TABLE "ShopItem" DROP CONSTRAINT "ShopItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShopItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShopItem_id_seq";

-- AlterTable
ALTER TABLE "ShopItemImage" ALTER COLUMN "shopItemId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ShopItemImage" ADD CONSTRAINT "ShopItemImage_shopItemId_fkey" FOREIGN KEY ("shopItemId") REFERENCES "ShopItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
