-- DropForeignKey
ALTER TABLE "ShopItemImage" DROP CONSTRAINT "ShopItemImage_shopItemId_fkey";

-- DropForeignKey
ALTER TABLE "ShopItemPrice" DROP CONSTRAINT "ShopItemPrice_shopItemId_fkey";

-- AddForeignKey
ALTER TABLE "ShopItemPrice" ADD CONSTRAINT "ShopItemPrice_shopItemId_fkey" FOREIGN KEY ("shopItemId") REFERENCES "ShopItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopItemImage" ADD CONSTRAINT "ShopItemImage_shopItemId_fkey" FOREIGN KEY ("shopItemId") REFERENCES "ShopItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
