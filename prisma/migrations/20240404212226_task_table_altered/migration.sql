-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `Tasks_assigned_By_fkey`;

-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `status` ENUM('OPEN', 'ON_PROCESS', 'CLOSE') NOT NULL DEFAULT 'OPEN',
    MODIFY `taskname` TEXT NULL,
    MODIFY `assigned_By` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_assigned_By_fkey` FOREIGN KEY (`assigned_By`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
