/*
  Warnings:

  - You are about to drop the column `email` on the `collabrators` table. All the data in the column will be lost.
  - Added the required column `userid` to the `Collabrators` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collabrators` DROP COLUMN `email`,
    ADD COLUMN `userid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Collabrators` ADD CONSTRAINT `Collabrators_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
