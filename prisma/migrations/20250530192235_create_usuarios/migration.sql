-- CreateTable
CREATE TABLE "Medicamento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "dose" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Medicamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medicamento" ADD CONSTRAINT "Medicamento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
