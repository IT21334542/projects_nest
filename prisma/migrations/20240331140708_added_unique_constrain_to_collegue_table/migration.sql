/*
  Warnings:

  - A unique constraint covering the columns `[email,spaceid]` on the table `colleague` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Team_spaceId_fkey` ON `team`;

-- CreateIndex
CREATE UNIQUE INDEX `colleague_email_spaceid_key` ON `colleague`(`email`, `spaceid`);
