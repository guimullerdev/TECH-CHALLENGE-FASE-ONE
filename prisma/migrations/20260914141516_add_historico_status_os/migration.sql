-- CreateTable
CREATE TABLE "historico_status_os" (
    "id" TEXT NOT NULL,
    "os_id" TEXT NOT NULL,
    "status_anterior" "StatusOS",
    "status_novo" "StatusOS" NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historico_status_os_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "historico_status_os_os_id_data_idx" ON "historico_status_os"("os_id", "data");

-- AddForeignKey
ALTER TABLE "historico_status_os" ADD CONSTRAINT "historico_status_os_os_id_fkey" FOREIGN KEY ("os_id") REFERENCES "ordens_de_servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
