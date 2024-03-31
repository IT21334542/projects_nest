/*
  Warnings:

  - You are about to drop the column `Ownerid` on the `project` table. All the data in the column will be lost.
  - Added the required column `OwnerId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_Ownerid_fkey`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `Ownerid`,
    ADD COLUMN `OwnerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_OwnerId_fkey` FOREIGN KEY (`OwnerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
