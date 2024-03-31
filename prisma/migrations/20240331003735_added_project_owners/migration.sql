/*
  Warnings:

  - You are about to drop the column `createdby` on the `project` table. All the data in the column will be lost.
  - Added the required column `Ownerid` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_createdby_fkey`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `createdby`,
    ADD COLUMN `Ownerid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_Ownerid_fkey` FOREIGN KEY (`Ownerid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
