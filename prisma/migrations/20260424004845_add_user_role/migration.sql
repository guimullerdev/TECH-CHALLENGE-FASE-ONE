-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'ATENDENTE', 'MECANICO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'ATENDENTE';
