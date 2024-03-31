-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `Tasks_assigned_To_fkey`;

-- AlterTable
ALTER TABLE `tasks` MODIFY `assigned_To` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_assigned_By_fkey` FOREIGN KEY (`assigned_By`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_assigned_To_fkey` FOREIGN KEY (`assigned_To`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
