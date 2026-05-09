const API_KEY = process.env.RDSTATION_API_KEY || "";
const BASE_URL = "https://api.rd.services/platform";
const SENDER_EMAIL = "apaulista@apaulista.org.br";
const SENDER_NAME = "APM — Associação Paulista de Municípios";

interface ConversionPayload {
  conversion_identifier: string;
  email: string;
  name: string;
  personal_phone?: string;
  city?: string;
  job_title?: string;
  tags?: string[];
  cf_municipio?: string;
  cf_cargo?: string;
}

export async function sendConversion(payload: ConversionPayload) {
  const res = await fetch(`${BASE_URL}/conversions?api_key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: "CONVERSION",
      event_family: "CDP",
      payload,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("RD Station conversion error:", err);
    return { success: false, error: err };
  }

  const data = await res.json();
  return { success: true, uuid: data.event_uuid };
}

export async function registrarInscrito(data: {
  nome: string;
  email: string;
  telefone?: string;
  municipio?: string;
  cargo?: string;
}) {
  return sendConversion({
    conversion_identifier: "webinar-fundeb-2026-inscricao",
    email: data.email,
    name: data.nome,
    personal_phone: data.telefone || undefined,
    city: data.municipio || undefined,
    job_title: data.cargo || undefined,
    cf_municipio: data.municipio || undefined,
    cf_cargo: data.cargo || undefined,
    tags: ["webinar-fundeb-2026", "inscrito"],
  });
}

export async function marcarReminderEnviado(
  email: string,
  reminderId: string
) {
  return sendConversion({
    conversion_identifier: `webinar-fundeb-reminder-${reminderId}`,
    email,
    name: "",
    tags: ["webinar-fundeb-2026", `reminder-${reminderId}`],
  });
}

export function getSenderInfo() {
  return { email: SENDER_EMAIL, name: SENDER_NAME };
}
