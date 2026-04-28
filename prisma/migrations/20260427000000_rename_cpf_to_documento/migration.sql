-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('CPF', 'CNPJ');

-- AlterTable: add documento and tipo_documento copying data from cpf
ALTER TABLE "clientes"
  ADD COLUMN "documento" TEXT,
  ADD COLUMN "tipo_documento" "TipoDocumento";

-- Migrate existing data
UPDATE "clientes"
SET
  "documento" = "cpf",
  "tipo_documento" = CASE
    WHEN length(regexp_replace("cpf", '\D', '', 'g')) = 14 THEN 'CNPJ'::"TipoDocumento"
    ELSE 'CPF'::"TipoDocumento"
  END;

-- Make columns NOT NULL after data migration
ALTER TABLE "clientes"
  ALTER COLUMN "documento" SET NOT NULL,
  ALTER COLUMN "tipo_documento" SET NOT NULL;

-- Drop old cpf column
ALTER TABLE "clientes" DROP COLUMN "cpf";

-- CreateIndex
CREATE UNIQUE INDEX "clientes_documento_key" ON "clientes"("documento");
