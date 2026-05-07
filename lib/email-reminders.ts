import { CALENDAR_LINK, MEET_LINK } from "./email";

export interface Reminder {
  id: string;
  subject: string;
  date: string;
  time: string;
  bodyHtml: string;
}

const greenButton = (text: string, href: string) => `
  <div style="text-align:center;margin:24px 0;">
    <a href="${href}" style="display:inline-block;background:#00E5A0;color:#084547;font-weight:700;font-size:16px;padding:14px 32px;border-radius:8px;text-decoration:none;">
      ${text}
    </a>
  </div>`;

const eventCard = `
  <div style="background:#F4F7FA;border:1px solid #DDE3EB;border-radius:12px;padding:20px;margin:20px 0;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:6px 0;color:#718096;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:100px;">Data</td>
        <td style="padding:6px 0;color:#1A202C;font-size:14px;font-weight:600;">Segunda-feira, 18 de Maio de 2026</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#718096;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Horario</td>
        <td style="padding:6px 0;color:#1A202C;font-size:14px;font-weight:600;">15:00 – 16:00 (horario de Brasilia)</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#718096;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Formato</td>
        <td style="padding:6px 0;color:#1A202C;font-size:14px;font-weight:600;">Google Meet (ao vivo)</td>
      </tr>
    </table>
  </div>`;

const urgencyBanner = `
  <div style="background:rgba(212,85,58,0.08);border:1px solid rgba(212,85,58,0.3);border-radius:8px;padding:16px;margin:16px 0;">
    <p style="color:#D4553A;font-size:14px;margin:0;font-weight:600;">
      LEMBRETE: O Censo Escolar fecha em 27 de Maio. Cada dia sem acao e recurso perdido.
    </p>
  </div>`;

// ============================================================
// FLUXO 1: REMINDERS PARA INSCRITOS
// ============================================================
export const REMINDERS: Reminder[] = [
  // #1 — Qua 07/Mai 09:00 BRT
  {
    id: "r1_confirmacao_reforco",
    subject: "Webinar FUNDEB e na proxima semana! | APM + i10",
    date: "2026-05-07",
    time: "09:00",
    bodyHtml: `
      <h2 style="color:#0A5C5F;font-size:22px;margin:0 0 8px;">O webinar e na proxima semana!</h2>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Falta <strong>1 semana</strong> para o webinar <strong>FUNDEB 2026 — Como captar recursos para a educacao do seu municipio</strong>.
      </p>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Com <strong>Luciane Biancardi</strong> (consultora FUNDEB, ex-secretaria de educacao) e <strong>Felipe Miguel</strong> (ex-secretario de educacao de Ribeirao Preto), voce vai aprender as estrategias praticas para maximizar a captacao antes do prazo do Censo.
      </p>
      ${urgencyBanner}
      ${eventCard}
      ${greenButton("Adicionar a Agenda", CALENDAR_LINK)}
      <p style="color:#718096;font-size:13px;line-height:1.5;margin:0;">
        Enviaremos mais detalhes ao longo da semana.
      </p>`,
  },

  // #2 — Sex 09/Mai 10:00 BRT
  {
    id: "r2_conteudo_preview",
    subject: "O que voce vai aprender no webinar FUNDEB | APM + i10",
    date: "2026-05-09",
    time: "10:00",
    bodyHtml: `
      <h2 style="color:#0A5C5F;font-size:22px;margin:0 0 8px;">Preview: o que voce vai aprender</h2>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Preparamos 1 hora de conteudo pratico dividido em <strong>3 blocos</strong>:
      </p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <tr>
          <td style="padding:8px 12px;background:#0A5C5F08;border-radius:6px;">
            <span style="color:#0D7377;font-weight:700;font-size:13px;">FUNDEB & CENSO</span>
            <span style="color:#718096;font-size:12px;"> — 20 min</span><br>
            <span style="color:#4A5568;font-size:13px;">15 categorias de matricula, fatores de ponderacao e o prazo critico de 27/05</span>
          </td>
        </tr>
        <tr><td style="height:4px;"></td></tr>
        <tr>
          <td style="padding:8px 12px;background:#0A5C5F08;border-radius:6px;">
            <span style="color:#0D7377;font-weight:700;font-size:13px;">BNCC COMPUTACAO</span>
            <span style="color:#718096;font-size:12px;"> — 15 min</span><br>
            <span style="color:#4A5568;font-size:13px;">Resolucao CNE/CEB 1/2022, prazos e impacto de ate 2.5% do FUNDEB</span>
          </td>
        </tr>
        <tr><td style="height:4px;"></td></tr>
        <tr>
          <td style="padding:8px 12px;background:#0A5C5F08;border-radius:6px;">
            <span style="color:#0D7377;font-weight:700;font-size:13px;">PERGUNTAS & RESPOSTAS</span>
            <span style="color:#718096;font-size:12px;"> — 10 min</span><br>
            <span style="color:#4A5568;font-size:13px;">Tire suas duvidas ao vivo com os palestrantes</span>
          </td>
        </tr>
      </table>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <strong>Dica:</strong> Convide sua equipe — quanto mais pessoas da secretaria participarem, mais rapida sera a implementacao.
      </p>
      ${eventCard}
      ${greenButton("Confirmar Presenca", CALENDAR_LINK)}`,
  },

  // #3 — Seg 12/Mai 09:00 BRT
  {
    id: "r3_semana_do_evento",
    subject: "E ESTA SEMANA — Webinar FUNDEB segunda as 15h | APM + i10",
    date: "2026-05-14",
    time: "09:00",
    bodyHtml: `
      <h2 style="color:#0A5C5F;font-size:22px;margin:0 0 8px;">E esta semana!</h2>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Faltam apenas <strong>4 dias</strong> para o webinar com <strong>Luciane Biancardi</strong> e <strong>Felipe Miguel</strong>.
      </p>
      ${urgencyBanner}
      ${eventCard}
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <strong>Prepare-se:</strong>
      </p>
      <ul style="color:#4A5568;font-size:14px;line-height:1.8;margin:0 0 16px;padding-left:20px;">
        <li>Reserve 1 hora sem interrupcoes (15h – 16h)</li>
        <li>Tenha papel e caneta para anotar</li>
        <li>Convide colegas da secretaria</li>
      </ul>
      ${greenButton("Salvar na Agenda", CALENDAR_LINK)}`,
  },

  // #4 — Qui 14/Mai 10:00 BRT
  {
    id: "r4_vespera",
    subject: "AMANHA as 15h — Webinar FUNDEB 2026 | APM + i10",
    date: "2026-05-17",
    time: "10:00",
    bodyHtml: `
      <h2 style="color:#0A5C5F;font-size:22px;margin:0 0 8px;">E amanha!</h2>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <strong>Amanha, segunda-feira 18 de Maio as 15h</strong>, comeca o webinar FUNDEB 2026 com Luciane Biancardi e Felipe Miguel.
      </p>
      <div style="background:#EFF6FF;border:1px solid #3B82F640;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="color:#1E40AF;font-size:14px;margin:0;">
          Recomendamos entrar no Google Meet <strong>5 minutos antes</strong> das 15h.
        </p>
      </div>
      ${eventCard}
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        O link do Google Meet sera enviado amanha pela manha.
      </p>
      ${greenButton("Adicionar a Agenda", CALENDAR_LINK)}`,
  },

  // #5 — Sex 15/Mai 09:00 BRT
  {
    id: "r5_dia_do_evento",
    subject: "HOJE as 15h — Webinar FUNDEB 2026 | APM + i10",
    date: "2026-05-18",
    time: "09:00",
    bodyHtml: `
      <h2 style="color:#0A5C5F;font-size:22px;margin:0 0 12px;">
        <span style="color:#00E5A0;">HOJE</span> as 15h!
      </h2>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        O dia chegou! <strong>Hoje as 15:00</strong> comeca o webinar <strong>FUNDEB 2026</strong> com a APM e Instituto i10.
      </p>
      <div style="background:#F0FDF4;border:1px solid #22C55E40;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="color:#166534;font-size:14px;margin:0;">
          Em <strong>1 hora de conteudo pratico</strong>, voce vai sair com um plano de acao completo para captar recursos do FUNDEB.
        </p>
      </div>
      ${eventCard}
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 8px;">
        <strong>Seu link de acesso:</strong>
      </p>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <a href="${MEET_LINK}" style="color:#0D7377;font-weight:600;">${MEET_LINK}</a>
      </p>
      ${greenButton("Entrar no Google Meet as 15h", MEET_LINK)}`,
  },

  // #6 — Seg 18/Mai 14:50 BRT
  {
    id: "r6_dez_minutos",
    subject: "COMECA EM 10 MINUTOS — Entre agora! | APM + i10",
    date: "2026-05-18",
    time: "14:50",
    bodyHtml: `
      <div style="text-align:center;">
        <h2 style="color:#0A5C5F;font-size:24px;margin:0 0 12px;">
          Comeca em <span style="color:#D4553A;">10 MINUTOS!</span>
        </h2>
        <p style="color:#4A5568;font-size:16px;line-height:1.6;margin:0 0 24px;">
          O webinar <strong>FUNDEB 2026</strong> esta prestes a comecar.<br>
          Entre agora para garantir seu lugar.
        </p>
        <a href="${MEET_LINK}" style="display:inline-block;background:#D4553A;color:#ffffff;font-weight:700;font-size:18px;padding:16px 40px;border-radius:8px;text-decoration:none;margin-bottom:24px;">
          ENTRAR AGORA
        </a>
        <p style="color:#4A5568;font-size:14px;line-height:1.6;margin:24px 0 16px;">
          <strong>Link direto:</strong><br>
          <a href="${MEET_LINK}" style="color:#0D7377;font-weight:600;">${MEET_LINK}</a>
        </p>
      </div>
      <p style="color:#718096;font-size:13px;line-height:1.5;margin:0;text-align:center;">
        15:00 – 16:00 (horario de Brasilia) | Google Meet
      </p>`,
  },
];

// ============================================================
// FLUXO 2: RE-ENGAGEMENT PARA NAO INSCRITOS
// (templates para disparo manual via ferramenta de email)
// ============================================================
export const REENGAGEMENT_TEMPLATES = [
  {
    id: "re1_dia_06",
    sendDate: "2026-05-06",
    subject: "Voce ja se inscreveu? Webinar FUNDEB 2026 — Gratuito | APM",
    bodyHtml: `
      <h2 style="color:#0A5C5F;font-size:22px;margin:0 0 8px;">Secretario(a), voce ja garantiu sua vaga?</h2>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        No dia <strong>18 de Maio as 15h</strong>, a APM e o Instituto i10 realizam um webinar gratuito sobre <strong>como captar recursos do FUNDEB</strong> para a educacao do seu municipio.
      </p>
      ${urgencyBanner}
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Com a participacao de <strong>Luciane Biancardi</strong> (consultora FUNDEB, ex-secretaria de educacao) e <strong>Felipe Miguel</strong> (ex-secretario de educacao de Ribeirao Preto).
      </p>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Voce vai aprender sobre o prazo do Censo Escolar (27/05), as exigencias da BNCC Computacao, e como utilizar o sistema BNCC-CAPTACAO.
      </p>
      ${greenButton("Inscrever-me Gratuitamente", "{{LP_URL}}")}`,
  },
  {
    id: "re2_dia_08",
    sendDate: "2026-05-08",
    subject: "URGENTE: Censo Escolar fecha dia 27 — Webinar FUNDEB gratuito | APM",
    bodyHtml: `
      <h2 style="color:#0A5C5F;font-size:22px;margin:0 0 8px;">O tempo esta acabando</h2>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Faltam menos de <strong>20 dias</strong> para o fechamento do Censo Escolar. Matriculas nao registradas significam <strong>recursos perdidos por todo o ano de 2026</strong>.
      </p>
      <div style="background:rgba(212,85,58,0.08);border:1px solid rgba(212,85,58,0.3);border-radius:8px;padding:16px;margin:16px 0;">
        <p style="color:#D4553A;font-size:14px;margin:0;font-weight:600;">
          Seu municipio pode estar perdendo ate R$ 710/aluno/ano por nao cumprir as condicionalidades do VAAR.
        </p>
      </div>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Nosso webinar gratuito no dia <strong>18 de Maio as 15h</strong> vai mostrar exatamente o que fazer. Inscreva-se agora — vagas limitadas.
      </p>
      ${greenButton("Garantir Minha Vaga — Gratuito", "{{LP_URL}}")}`,
  },
  {
    id: "re3_dia_10",
    sendDate: "2026-05-10",
    subject: "Faltam 8 dias: Webinar que pode mudar a captacao do seu municipio | APM",
    bodyHtml: `
      <h2 style="color:#0A5C5F;font-size:22px;margin:0 0 8px;">Ultima chamada para esta semana</h2>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Na <strong>proxima segunda-feira (18/05)</strong>, especialistas em captacao de recursos vao revelar:
      </p>
      <ul style="color:#4A5568;font-size:14px;line-height:1.8;margin:0 0 16px;padding-left:20px;">
        <li>Como identificar <strong>6 alavancas de captacao</strong> do FUNDEB</li>
        <li>O que fazer antes do Censo Escolar (27/05)</li>
        <li>Como a BNCC Computacao impacta diretamente seus recursos</li>
        <li>O plano de acao em <strong>7 semanas</strong> que ja funcionou em outros municipios</li>
      </ul>
      ${urgencyBanner}
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <strong>Gratuito. Online. Pratico.</strong> So precisa se inscrever.
      </p>
      ${greenButton("Inscrever Agora — Ultimas Vagas", "{{LP_URL}}")}`,
  },
  {
    id: "re4_dia_12",
    sendDate: "2026-05-12",
    subject: "ESTA SEMANA: Webinar FUNDEB que seu municipio nao pode perder | APM",
    bodyHtml: `
      <h2 style="color:#D4553A;font-size:22px;margin:0 0 8px;">Voce esta deixando dinheiro na mesa?</h2>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Municipios que <strong>nao otimizam sua captacao do FUNDEB</strong> perdem centenas de milhares de reais por ano. As condicionalidades do VAAR sozinhas representam <strong>R$ 710 por aluno</strong>.
      </p>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <strong>Esta segunda-feira as 15h</strong>, Luciane Biancardi e Felipe Miguel vao mostrar como reverter isso.
      </p>
      <div style="background:#F0FDF4;border:1px solid #22C55E40;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="color:#166534;font-size:14px;margin:0;">
          O webinar e gratuito e online. Inscreva-se e receba o link de acesso direto no seu e-mail.
        </p>
      </div>
      ${greenButton("SIM, QUERO PARTICIPAR", "{{LP_URL}}")}`,
  },
  {
    id: "re5_dia_14",
    sendDate: "2026-05-17",
    subject: "AMANHA: Ultima chance de se inscrever — Webinar FUNDEB | APM",
    bodyHtml: `
      <h2 style="color:#D4553A;font-size:22px;margin:0 0 8px;">Amanha e o ultimo dia</h2>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <strong>Amanha as 15h</strong> acontece o webinar que pode mudar a captacao de recursos do seu municipio. E a ultima chance de se inscrever.
      </p>
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Faltam <strong>10 dias para o fechamento do Censo Escolar</strong>. Quem nao agir agora, perde por 12 meses.
      </p>
      ${urgencyBanner}
      <p style="color:#4A5568;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <strong>Luciane Biancardi</strong> e <strong>Felipe Miguel</strong> vao compartilhar experiencias reais e estrategias comprovadas.
      </p>
      ${greenButton("INSCREVER AGORA — E GRATIS", "{{LP_URL}}")}`,
  },
];

export function getCurrentReminder(): Reminder | null {
  const now = new Date();
  const brFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const brTimeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const todayBR = brFormatter.format(now);
  const timeBR = brTimeFormatter.format(now);
  const currentHour = parseInt(timeBR.split(":")[0], 10);

  for (const reminder of REMINDERS) {
    if (reminder.date !== todayBR) continue;
    const reminderHour = parseInt(reminder.time.split(":")[0], 10);
    if (currentHour === reminderHour) {
      return reminder;
    }
  }

  return null;
}

export function getReminderById(id: string): Reminder | undefined {
  return REMINDERS.find((r) => r.id === id);
}
