/*
  Warnings:

  - Added the required column `createdby` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `createdby` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_createdby_fkey` FOREIGN KEY (`createdby`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
