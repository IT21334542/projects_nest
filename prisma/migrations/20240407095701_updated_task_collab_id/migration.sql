-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `Tasks_assigned_To_fkey`;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_assigned_To_fkey` FOREIGN KEY (`assigned_To`) REFERENCES `Collabrators`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
