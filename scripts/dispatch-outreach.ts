import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local" });

import * as fs from "fs";
import * as path from "path";

const TENANT_ID = process.env.MSGRAPH_TENANT_ID!;
const CLIENT_ID = process.env.MSGRAPH_CLIENT_ID!;
const CLIENT_SECRET = process.env.MSGRAPH_CLIENT_SECRET!;
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

// Schedule config
const SCHEDULE: Record<string, { emailFile: string; subject: string }> = {
  "01": {
    emailFile: "01-urgencia-censo.html",
    subject: "URGENTE: Censo Escolar fecha dia 27 — Seu município está preparado? | APM",
  },
  "02": {
    emailFile: "02-conteudo-preview.html",
    subject: "Faltam 5 dias: Veja o que você vai aprender no webinar FUNDEB | APM",
  },
  "03": {
    emailFile: "03-dinheiro-na-mesa.html",
    subject: "ESTA SEMANA: Seu município está deixando dinheiro na mesa? | APM",
  },
  "04": {
    emailFile: "04-ultima-chance.html",
    subject: "Última chance de se inscrever — Webinar FUNDEB segunda | APM",
  },
};

async function main() {
  const emailId = process.argv[2];
  if (!emailId || !SCHEDULE[emailId]) {
    console.log("Uso: tsx scripts/dispatch-outreach.ts <01|02|03|04>");
    console.log("Emails disponíveis:", Object.keys(SCHEDULE).join(", "));
    process.exit(1);
  }

  const { emailFile, subject } = SCHEDULE[emailId];
  const html = fs.readFileSync(path.join("emails", emailFile), "utf-8");

  // Load outreach list
  const listPath = path.join("data", "outreach-list.tsv");
  const lines = fs.readFileSync(listPath, "utf-8").trim().split("\n");
  const contacts = lines.map((line) => {
    const [email, name] = line.split("\t");
    return { email: email.trim().toLowerCase(), name: (name || "").trim() };
  }).filter((c) => c.email.includes("@"));

  // Load inscritos (to exclude from outreach)
  // Anyone already registered on LP should NOT get outreach emails
  let inscritos: Set<string> = new Set();
  try {
    const dbRes = await fetch("https://webinar-fundeb-apm.vercel.app/api/admin/subscribers", {
      headers: { Authorization: "Bearer apm-fundeb-2026" },
    });
    const dbData = await dbRes.json();
    if (dbData.subscribers) {
      for (const s of dbData.subscribers) {
        inscritos.add(s.email.toLowerCase().trim());
      }
    }
  } catch {
    console.log("⚠️  Não conseguiu buscar inscritos do DB, enviando para todos");
  }

  let outreachList = contacts.filter((c) => !inscritos.has(c.email));

  const testEmail = process.env.TEST_EMAIL?.trim();
  if (testEmail) {
    outreachList = [{ email: testEmail.toLowerCase(), name: "" }];
    console.log(`\n🧪 MODO TESTE: enviando somente para ${testEmail}`);
  }

  console.log(`\n📧 Disparando email ${emailId}: "${subject}"`);
  console.log(`📋 Lista total: ${contacts.length} | Já inscritos: ${inscritos.size} | Outreach: ${outreachList.length}\n`);

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < outreachList.length; i += BATCH_SIZE) {
    const batch = outreachList.slice(i, i + BATCH_SIZE);

    for (const { email } of batch) {
      try {
        const ok = await sendEmail(email, subject, html);
        if (ok) {
          sent++;
          process.stdout.write(`✅ ${sent}/${outreachList.length} ${email}\n`);
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

    if (i + BATCH_SIZE < outreachList.length) {
      await sleep(DELAY_BETWEEN_BATCHES_MS);
    }
  }

  console.log(`\n✅ Concluído: ${sent} enviados, ${failed} falhas de ${outreachList.length} total`);
}

main().catch(console.error);
