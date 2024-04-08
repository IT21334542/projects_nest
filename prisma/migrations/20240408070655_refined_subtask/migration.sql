-- DropForeignKey
ALTER TABLE `subtask` DROP FOREIGN KEY `subtask_subtaskId_fkey`;

-- AlterTable
ALTER TABLE `subtask` MODIFY `subtaskId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `subtask` ADD CONSTRAINT `subtask_subtaskId_fkey` FOREIGN KEY (`subtaskId`) REFERENCES `subtask`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
