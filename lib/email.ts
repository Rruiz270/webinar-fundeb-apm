import nodemailer from "nodemailer";

export const MEET_LINK = "{{GOOGLE_MEET_LINK}}";
export const MEET_PHONE = "+55 11 XXXX-XXXX";
export const MEET_PIN = "XXX XXX XXX#";

export const CALENDAR_LINK =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: "Webinar FUNDEB 2026 — APM + Instituto i10",
    dates: "20260518T180000Z/20260518T190000Z",
    details: `Webinar gratuito: Como captar recursos do FUNDEB para educação do seu município.\n\nPalestrantes: Luciane Biancardi e Felipe Miguel\n\nLink do Google Meet: ${MEET_LINK}`,
    location: `Google Meet — ${MEET_LINK}`,
  }).toString();

export function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export function wrapEmailLayout(bodyHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f7fa;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">

    <!-- Header -->
    <div style="background:#0A5C5F;border-radius:16px 16px 0 0;padding:24px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td><img src="https://apm-fundeb-sp.vercel.app/fundeb-sp/apm-logo-pill-web.png" alt="APM" height="40" style="display:block;"></td>
          <td style="text-align:right;">
            <span style="color:#00E5A0;font-weight:800;font-size:20px;">i10</span>
            <br><span style="color:rgba(255,255,255,0.5);font-size:10px;letter-spacing:1px;">Instituto</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;padding:32px 24px;border-left:1px solid #DDE3EB;border-right:1px solid #DDE3EB;">
      ${bodyHtml}
    </div>

    <!-- Footer -->
    <div style="background:#084547;border-radius:0 0 16px 16px;padding:20px 24px;text-align:center;">
      <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0 0 4px;font-style:italic;">
        Captando recursos para a educação pública
      </p>
      <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;">
        &copy; 2026 APM + Instituto i10. Todos os direitos reservados.
      </p>
    </div>

  </div>
</body>
</html>`.trim();
}

export async function sendConfirmationEmail(to: string, nome: string) {
  const transporter = createTransporter();
  const user = process.env.GMAIL_USER;

  if (!transporter || !user) {
    console.warn("GMAIL_USER or GMAIL_APP_PASSWORD not set — skipping email");
    return { success: false, error: "Email service not configured" };
  }

  const bodyHtml = `
      <h2 style="color:#0A5C5F;font-size:22px;margin:0 0 8px;">Inscrição confirmada!</h2>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 24px;">
        Olá, <strong>${nome}</strong>! Sua vaga no webinar <strong>FUNDEB 2026 — Como captar recursos para a educação do seu município</strong> está garantida.
      </p>

      <!-- Event Details Card -->
      <div style="background:#F4F7FA;border:1px solid #DDE3EB;border-radius:12px;padding:20px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#718096;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:110px;">Data</td>
            <td style="padding:6px 0;color:#1A202C;font-size:14px;font-weight:600;">Segunda-feira, 18 de Maio de 2026</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#718096;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Horário</td>
            <td style="padding:6px 0;color:#1A202C;font-size:14px;font-weight:600;">15:00 – 16:00 (horário de Brasília)</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#718096;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Duração</td>
            <td style="padding:6px 0;color:#1A202C;font-size:14px;font-weight:600;">1 hora</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#718096;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Formato</td>
            <td style="padding:6px 0;color:#1A202C;font-size:14px;font-weight:600;">Google Meet (ao vivo)</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#718096;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Palestrantes</td>
            <td style="padding:6px 0;color:#1A202C;font-size:14px;font-weight:600;">Luciane Biancardi & Felipe Miguel</td>
          </tr>
        </table>
      </div>

      <!-- Urgency Alert -->
      <div style="background:rgba(212,85,58,0.08);border:1px solid rgba(212,85,58,0.3);border-radius:8px;padding:16px;margin-bottom:24px;">
        <p style="color:#D4553A;font-size:14px;margin:0;font-weight:600;">
          LEMBRETE: O Censo Escolar fecha em 27 de Maio. Cada dia sem ação é recurso perdido para seu município.
        </p>
      </div>

      <!-- Topics Preview -->
      <h3 style="color:#0A5C5F;font-size:16px;margin:0 0 12px;">O que você vai aprender:</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:8px 12px;background:#0A5C5F08;border-radius:6px;">
            <span style="color:#0D7377;font-weight:700;font-size:13px;">FUNDEB & CENSO</span>
            <span style="color:#718096;font-size:12px;"> — 20 min</span><br>
            <span style="color:#4A5568;font-size:13px;">Captação de recursos e prazo crítico do Censo</span>
          </td>
        </tr>
        <tr><td style="height:4px;"></td></tr>
        <tr>
          <td style="padding:8px 12px;background:#0A5C5F08;border-radius:6px;">
            <span style="color:#0D7377;font-weight:700;font-size:13px;">BNCC COMPUTAÇÃO</span>
            <span style="color:#718096;font-size:12px;"> — 15 min</span><br>
            <span style="color:#4A5568;font-size:13px;">Exigências legais e impacto nos recursos</span>
          </td>
        </tr>
        <tr><td style="height:4px;"></td></tr>
        <tr>
          <td style="padding:8px 12px;background:#0A5C5F08;border-radius:6px;">
            <span style="color:#0D7377;font-weight:700;font-size:13px;">PERGUNTAS & RESPOSTAS</span>
            <span style="color:#718096;font-size:12px;"> — 10 min</span><br>
            <span style="color:#4A5568;font-size:13px;">Tire suas dúvidas ao vivo com os palestrantes</span>
          </td>
        </tr>
      </table>

      <!-- Calendar Button -->
      <div style="text-align:center;margin-bottom:24px;">
        <a href="${CALENDAR_LINK}" style="display:inline-block;background:#00E5A0;color:#084547;font-weight:700;font-size:16px;padding:14px 32px;border-radius:8px;text-decoration:none;">
          Adicionar a Minha Agenda
        </a>
      </div>

      <p style="color:#718096;font-size:13px;line-height:1.5;margin:0;">
        Guarde este e-mail — enviaremos o link do Google Meet antes do evento. Recomendamos entrar 5 minutos antes do início.
      </p>`;

  try {
    await transporter.sendMail({
      from: `APM + Instituto i10 <${user}>`,
      to,
      subject: "Inscrição Confirmada — Webinar FUNDEB 2026 | APM + Instituto i10",
      html: wrapEmailLayout(bodyHtml),
    });

    return { success: true };
  } catch (err) {
    console.error("Email send error:", err);
    return { success: false, error: "Falha ao enviar e-mail de confirmação" };
  }
}
