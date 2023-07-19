/*
  Warnings:

  - You are about to drop the column `images` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `NewsPost` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `ShopItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "NewsPost" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "ShopItem" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "ShopItemImage" (
    "id" TEXT NOT NULL,
    "shopItemId" INTEGER NOT NULL,

    CONSTRAINT "ShopItemImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsPostImage" (
    "id" TEXT NOT NULL,
    "newsPostId" INTEGER NOT NULL,

    CONSTRAINT "NewsPostImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPostImage" (
    "id" TEXT NOT NULL,
    "blogPostId" INTEGER NOT NULL,

    CONSTRAINT "BlogPostImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShopItemImage" ADD CONSTRAINT "ShopItemImage_shopItemId_fkey" FOREIGN KEY ("shopItemId") REFERENCES "ShopItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsPostImage" ADD CONSTRAINT "NewsPostImage_newsPostId_fkey" FOREIGN KEY ("newsPostId") REFERENCES "NewsPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPostImage" ADD CONSTRAINT "BlogPostImage_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
