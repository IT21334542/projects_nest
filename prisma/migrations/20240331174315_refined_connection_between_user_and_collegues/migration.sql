-- AlterTable
ALTER TABLE `colleague` ADD COLUMN `userid` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `colleague` ADD CONSTRAINT `colleague_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
