import { NextResponse } from "next/server";
import { subscriptionSchema } from "@/lib/validation";
import { submitSubscription } from "@/lib/subscription";
import { sendConfirmationEmail } from "@/lib/email";
import { registrarInscrito } from "@/lib/rdstation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = subscriptionSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const result = await submitSubscription(parsed.data);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    const [emailResult, rdResult] = await Promise.all([
      sendConfirmationEmail(parsed.data.email, parsed.data.nome),
      registrarInscrito({
        nome: parsed.data.nome,
        email: parsed.data.email,
        telefone: parsed.data.telefone,
        municipio: parsed.data.municipio,
        cargo: parsed.data.cargo,
      }),
    ]);

    if (!emailResult.success) {
      console.error("Email send failed:", emailResult.error);
    }
    if (!rdResult.success) {
      console.error("RD Station sync failed:", rdResult.error);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
