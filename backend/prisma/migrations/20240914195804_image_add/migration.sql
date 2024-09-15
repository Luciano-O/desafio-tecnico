/*
  Warnings:

  - Added the required column `image` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Player` ADD COLUMN `image` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Team` ADD COLUMN `image` VARCHAR(255) NOT NULL;
