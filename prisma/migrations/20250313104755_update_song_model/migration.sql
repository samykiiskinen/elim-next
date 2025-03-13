/*
  Warnings:

  - Added the required column `songKey` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "songKey" VARBIT(10) NOT NULL;
