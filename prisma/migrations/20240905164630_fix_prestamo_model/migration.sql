/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Prestamo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prestamo_codigo_key" ON "Prestamo"("codigo");
