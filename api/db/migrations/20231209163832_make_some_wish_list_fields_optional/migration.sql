-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_eventId_fkey";

-- AlterTable
ALTER TABLE "WishList" ALTER COLUMN "order" DROP NOT NULL,
ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
