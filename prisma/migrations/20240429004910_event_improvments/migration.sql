-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_tag_id_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "finishTime" INTEGER,
ADD COLUMN     "startTime" INTEGER,
ALTER COLUMN "tag_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
