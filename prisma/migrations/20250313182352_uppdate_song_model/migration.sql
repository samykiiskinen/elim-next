/*
  Warnings:

  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Song";

-- CreateTable
CREATE TABLE "songs" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,
    "songKey" VARCHAR(10) NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);
