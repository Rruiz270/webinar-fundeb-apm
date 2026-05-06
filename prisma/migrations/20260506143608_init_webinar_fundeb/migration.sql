-- CreateTable
CREATE TABLE "inscricoes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "municipio" TEXT,
    "cargo" TEXT,
    "aceita_atualizacoes" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inscricoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_lembretes" (
    "id" SERIAL NOT NULL,
    "reminder_id" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_sent" INTEGER NOT NULL DEFAULT 0,
    "total_failed" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'completed',

    CONSTRAINT "email_lembretes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_lembretes_reminder_id_key" ON "email_lembretes"("reminder_id");
