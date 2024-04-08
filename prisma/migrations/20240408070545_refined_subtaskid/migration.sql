/*
  Warnings:

  - You are about to drop the column `parent_sub_task_id` on the `subtask` table. All the data in the column will be lost.
  - Added the required column `subtaskId` to the `subtask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subtask` DROP COLUMN `parent_sub_task_id`,
    ADD COLUMN `subtaskId` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `subtask` ADD CONSTRAINT `subtask_subtaskId_fkey` FOREIGN KEY (`subtaskId`) REFERENCES `subtask`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
