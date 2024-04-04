-- DropForeignKey
ALTER TABLE `collabrators` DROP FOREIGN KEY `Collabrators_projectRoleId_fkey`;

-- AlterTable
ALTER TABLE `collabrators` MODIFY `projectRoleId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Collabrators` ADD CONSTRAINT `Collabrators_projectRoleId_fkey` FOREIGN KEY (`projectRoleId`) REFERENCES `ProjectRole`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
