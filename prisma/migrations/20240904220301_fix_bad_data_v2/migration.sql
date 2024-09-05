/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Comprador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comprador_codigo_key" ON "Comprador"("codigo");
