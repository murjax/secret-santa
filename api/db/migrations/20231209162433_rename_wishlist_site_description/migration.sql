/*
  Warnings:

  - You are about to drop the column `SiteDescription` on the `WishList` table. All the data in the column will be lost.
  - Added the required column `siteDescription` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WishList" DROP COLUMN "SiteDescription",
ADD COLUMN     "siteDescription" TEXT NOT NULL;
