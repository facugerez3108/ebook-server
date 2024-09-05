/*
  Warnings:

  - You are about to drop the column `Apellido` on the `Comprador` table. All the data in the column will be lost.
  - Added the required column `apellido` to the `Comprador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comprador" DROP COLUMN "Apellido",
ADD COLUMN     "apellido" TEXT NOT NULL;
