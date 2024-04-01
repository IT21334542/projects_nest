/*
  Warnings:

  - You are about to drop the column `userId` on the `collabrators` table. All the data in the column will be lost.
  - Added the required column `email` to the `Collabrators` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `collabrators` DROP FOREIGN KEY `Collabrators_userId_fkey`;

-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `Team_spaceId_fkey`;

-- AlterTable
ALTER TABLE `collabrators` DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `colleague` (
    `id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `invite` ENUM('ACCEPTED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `roleid` VARCHAR(191) NOT NULL,
    `spaceid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `colleague` ADD CONSTRAINT `colleague_roleid_fkey` FOREIGN KEY (`roleid`) REFERENCES `SpaceRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `colleague` ADD CONSTRAINT `colleague_spaceid_fkey` FOREIGN KEY (`spaceid`) REFERENCES `Space`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
