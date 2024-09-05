-- CreateEnum
CREATE TYPE "PrestamoType" AS ENUM ('DEVUELTO', 'PENDIENTE');

-- CreateTable
CREATE TABLE "Prestamo" (
    "id" SERIAL NOT NULL,
    "compradorId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "fechaPrestamo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaDevolucion" TIMESTAMP(3) NOT NULL,
    "codigo" TEXT NOT NULL,
    "status" "PrestamoType"[],

    CONSTRAINT "Prestamo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prestamo_compradorId_key" ON "Prestamo"("compradorId");

-- CreateIndex
CREATE UNIQUE INDEX "Prestamo_bookId_key" ON "Prestamo"("bookId");

-- AddForeignKey
ALTER TABLE "Prestamo" ADD CONSTRAINT "Prestamo_compradorId_fkey" FOREIGN KEY ("compradorId") REFERENCES "Comprador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestamo" ADD CONSTRAINT "Prestamo_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
