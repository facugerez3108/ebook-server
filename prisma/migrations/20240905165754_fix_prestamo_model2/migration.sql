-- AlterTable
ALTER TABLE "Prestamo" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Prestamo" ALTER COLUMN "status" SET DATA TYPE "PrestamoType" USING status[1];
ALTER TABLE "Prestamo" ALTER COLUMN "status" SET NOT NULL;