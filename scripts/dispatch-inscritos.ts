import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local" });

import * as fs from "fs";
import * as path from "path";

const TENANT_ID = process.env.MSGRAPH_TENANT_ID!;
const CLIENT_ID = process.env.MSGRAPH_CLIENT_ID!;
const CLIENT_SECRET = process.env.MSGRAPH_CLIENT_SECRET!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const SENDER = "apaulista@apaulista.org.br";

const BATCH_SIZE = 4;
const DELAY_BETWEEN_EMAILS_MS = 1500;
const DELAY_BETWEEN_BATCHES_MS = 5000;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60000) {
    return cachedToken.token;
  }
  const res = await fetch(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        scope: "https://graph.microsoft.com/.default",
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    }
  );
  const data = await res.json();
  cachedToken = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const token = await getToken();
  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${SENDER}/sendMail`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        subject,
        body: { contentType: "HTML", content: html },
        toRecipients: [{ emailAddress: { address: to } }],
      },
      saveToSentItems: false,
    }),
  });
  return res.ok || res.status === 202;
}

async function fetchInscritos(): Promise<string[]> {
  const res = await fetch("https://webinar-fundeb-apm.vercel.app/api/admin/subscribers", {
    headers: { Authorization: `Bearer ${ADMIN_PASSWORD}` },
  });
  if (!res.ok) {
    throw new Error(`Falha ao buscar inscritos: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  if (!data.subscribers) throw new Error("Resposta sem campo 'subscribers'");
  const seen = new Set<string>();
  const emails: string[] = [];
  for (const s of data.subscribers) {
    const e = String(s.email || "").toLowerCase().trim();
    if (e.includes("@") && !seen.has(e)) {
      seen.add(e);
      emails.push(e);
    }
  }
  return emails;
}

async function main() {
  const emailFile = process.argv[2];
  const subject = process.argv[3];

  if (!emailFile || !subject) {
    console.log('Uso: tsx scripts/dispatch-inscritos.ts <arquivo.html> "<assunto>"');
    console.log('Ex.:  tsx scripts/dispatch-inscritos.ts 12-preview-conteudo.html "Faltam 5 dias..."');
    console.log("Env opcional: TEST_EMAIL=foo@bar.com (envia somente para esse endereço)");
    process.exit(1);
  }

  const htmlPath = path.join("emails", emailFile);
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ Template não encontrado: ${htmlPath}`);
    process.exit(1);
  }
  const html = fs.readFileSync(htmlPath, "utf-8");

  const testEmail = process.env.TEST_EMAIL?.trim();
  let recipients: string[];

  if (testEmail) {
    recipients = [testEmail.toLowerCase()];
    console.log(`\n🧪 MODO TESTE: enviando somente para ${testEmail}`);
  } else {
    recipients = await fetchInscritos();
  }

  console.log(`\n📧 Disparo inscritos: "${subject}"`);
  console.log(`📄 Template: ${emailFile}`);
  console.log(`📋 Destinatários: ${recipients.length}\n`);

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);

    for (const email of batch) {
      try {
        const ok = await sendEmail(email, subject, html);
        if (ok) {
          sent++;
          process.stdout.write(`✅ ${sent}/${recipients.length} ${email}\n`);
        } else {
          failed++;
          process.stdout.write(`❌ FALHOU ${email}\n`);
        }
      } catch (err) {
        failed++;
        process.stdout.write(`❌ ERRO ${email}: ${err}\n`);
      }
      await sleep(DELAY_BETWEEN_EMAILS_MS);
    }

    if (i + BATCH_SIZE < recipients.length) {
      await sleep(DELAY_BETWEEN_BATCHES_MS);
    }
  }

  console.log(`\n✅ Concluído: ${sent} enviados, ${failed} falhas de ${recipients.length} total`);
}

main().catch((err) => {
  console.error("ERRO FATAL:", err);
  process.exit(1);
});
