/*
  Warnings:

  - You are about to alter the column `type` on the `files` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `files` MODIFY `type` VARCHAR(191) NOT NULL DEFAULT ' any ';
