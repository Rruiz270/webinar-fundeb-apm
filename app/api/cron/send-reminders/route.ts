import { NextResponse } from "next/server";
import { getCurrentReminder } from "@/lib/email-reminders";
import { sendReminderToAll } from "@/lib/email-sender";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { success: false, error: "Nao autorizado" },
      { status: 401 }
    );
  }

  const reminder = getCurrentReminder();

  if (!reminder) {
    return NextResponse.json({
      success: true,
      message: "Nenhum lembrete agendado para este horario",
    });
  }

  try {
    const result = await sendReminderToAll(reminder);

    if (result.alreadySent) {
      return NextResponse.json({
        success: true,
        message: `Lembrete "${reminder.id}" ja foi enviado anteriormente`,
        result,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Lembrete "${reminder.id}" enviado`,
      result,
    });
  } catch (err) {
    console.error("Cron send-reminders error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Erro interno",
      },
      { status: 500 }
    );
  }
}
