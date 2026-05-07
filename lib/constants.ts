export const SITE = {
  name: "APM + Instituto i10",
  webinarDate: "18 de Maio, 2026",
  webinarTime: "15:00",
  webinarDuration: "1 hora",
  format: "Google Meet (ao vivo)",
  certificate: "Sim, com certificado de participação",
  material: "Acesso à gravação e materiais complementares",
};

export const SPEAKERS = [
  {
    name: "Luciane Biancardi",
    initials: "LB",
    title: "Consultora de FUNDEB | Ex-Secretária de Educação",
    bio: "Especialista em captação de recursos do FUNDEB com ampla experiência como gestora pública. Ex-Secretária de Educação, Luciane domina os mecanismos de financiamento educacional e as estratégias para maximizar a captação municipal.",
  },
  {
    name: "Felipe Miguel",
    initials: "FM",
    title: "Ex-Secretário de Educação de Ribeirão Preto",
    bio: "Com experiência à frente da Secretaria de Educação de Ribeirão Preto, Felipe traz a visão prática de quem já implementou políticas de captação de recursos e adequação curricular em uma das maiores redes municipais de SP.",
  },
];

export const HERO = {
  headline: "Seu Município Está Pronto para Captar os Recursos do FUNDEB 2026?",
  subheadline:
    "O Censo Escolar fecha em 27 de maio. Cada dia sem ação é recurso perdido. Descubra como maximizar a captação do FUNDEB e cumprir as exigências da BNCC Computação.",
  cta: "Quero Garantir Minha Vaga",
};

export const URGENCY_ITEMS = [
  {
    value: "20",
    suffix: "dias",
    label: "até o Censo Escolar",
    description: "Prazo limite: 27 de maio de 2026. Matrículas não registradas = recursos perdidos por 1 ano",
    color: "red" as const,
  },
  {
    value: "2.5%",
    suffix: "",
    label: "do FUNDEB em risco",
    description: "Redes que não implementarem a BNCC Computação perdem até 2.5% dos recursos",
    color: "orange" as const,
  },
  {
    value: "R$710",
    suffix: "/aluno",
    label: "VAAR em jogo",
    description: "Valor anual por aluno que depende do cumprimento das 5 condicionalidades",
    color: "green" as const,
  },
];

export const TOPICS = [
  {
    icon: "fundeb" as const,
    title: "FUNDEB & CENSO",
    duration: "20 min",
    items: [
      "Como funciona a captação do FUNDEB 2026",
      "As 15 categorias de matrícula e seus fatores",
      "Prazo crítico: Censo Escolar 27 de maio",
      "Erros comuns que fazem municípios perderem recursos",
    ],
  },
  {
    icon: "bncc" as const,
    title: "BNCC COMPUTAÇÃO",
    duration: "15 min",
    items: [
      "O que a Resolução CNE/CEB 1/2022 exige",
      "Prazos de adequação para 2026",
      "Como implementar sem infraestrutura cara",
      "Impacto no VAAR e na captação de recursos",
    ],
  },
  {
    icon: "vaar" as const,
    title: "PERGUNTAS & RESPOSTAS",
    duration: "10 min",
    items: [
      "Tire suas dúvidas ao vivo com os palestrantes",
      "Casos práticos do seu município",
      "Próximos passos e plano de ação",
      "Como acessar o sistema BNCC-CAPTAÇÃO",
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: "Quem pode participar do webinar?",
    answer:
      "O webinar é voltado para Secretários(as) de Educação, gestores, diretores, coordenadores e toda equipe envolvida na captação de recursos e adequação curricular dos municípios de SP.",
  },
  {
    question: "Quanto custa?",
    answer:
      "O webinar é 100% gratuito. É uma iniciativa da APM em parceria com o Instituto i10 para capacitar os municípios paulistas.",
  },
  {
    question: "O que é o sistema BNCC-CAPTAÇÃO?",
    answer:
      "É a plataforma desenvolvida pelo Instituto i10 que guia municípios na otimização da captação do FUNDEB, identificando oportunidades em 15 categorias de matrícula, compliance VAAR e implementação da BNCC Computação.",
  },
  {
    question: "Posso assistir a gravação depois?",
    answer:
      "Sim, a gravação ficará disponível para todos os inscritos. Porém, recomendamos a participação ao vivo para interagir e tirar dúvidas diretamente com os palestrantes.",
  },
  {
    question: "Meu município precisa se preocupar com o prazo de 27 de maio?",
    answer:
      "Sim! O dia 27 de maio é a data limite do Censo Escolar. Matrículas não registradas ou classificadas incorretamente significam recursos perdidos por todo o ano de 2026. Por isso a urgência em agir agora.",
  },
  {
    question: "O que acontece se meu município não implementar a BNCC Computação?",
    answer:
      "A não implementação pode resultar na perda de até 2.5% dos recursos do FUNDEB e no não cumprimento das condicionalidades do VAAR, reduzindo significativamente a receita educacional do município.",
  },
];

export const NAV_LINKS = [
  { href: "#urgencia", label: "Urgência" },
  { href: "#conteudo", label: "Conteúdo" },
  { href: "#webinar", label: "Webinar" },
  { href: "#palestrantes", label: "Palestrantes" },
  { href: "#faq", label: "FAQ" },
];
