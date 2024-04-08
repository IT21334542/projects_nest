/*
  Warnings:

  - You are about to drop the column `assigned_By` on the `subtask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `subtask` DROP FOREIGN KEY `subtask_assigned_To_fkey`;

-- AlterTable
ALTER TABLE `files` ADD COLUMN `tasksId` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `subtask` DROP COLUMN `assigned_By`,
    MODIFY `assigned_To` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `subtask` ADD CONSTRAINT `subtask_assigned_To_fkey` FOREIGN KEY (`assigned_To`) REFERENCES `Collabrators`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Files` ADD CONSTRAINT `Files_tasksId_fkey` FOREIGN KEY (`tasksId`) REFERENCES `Tasks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
