export const SITE = {
  name: "APM + Instituto i10",
  webinarDate: "18 de Maio, 2026",
  webinarTime: "15:00",
  webinarDuration: "1 hora",
  format: "Google Meet (ao vivo)",
  certificate: "Sim, com certificado de participacao",
  material: "Acesso a gravacao e materiais complementares",
};

export const SPEAKERS = [
  {
    name: "Luciane Biancardi",
    initials: "LB",
    title: "Consultora de FUNDEB | Ex-Secretaria de Educacao",
    bio: "Especialista em captacao de recursos do FUNDEB com ampla experiencia como gestora publica. Ex-Secretaria de Educacao, Luciane domina os mecanismos de financiamento educacional e as estrategias para maximizar a captacao municipal.",
  },
  {
    name: "Felipe Miguel",
    initials: "FM",
    title: "Ex-Secretario de Educacao de Ribeirao Preto",
    bio: "Com experiencia a frente da Secretaria de Educacao de Ribeirao Preto, Felipe traz a visao pratica de quem ja implementou politicas de captacao de recursos e adequacao curricular em uma das maiores redes municipais de SP.",
  },
];

export const HERO = {
  headline: "Seu Municipio Esta Pronto para Captar os Recursos do FUNDEB 2026?",
  subheadline:
    "O Censo Escolar fecha em 27 de maio. Cada dia sem acao e recurso perdido. Descubra como maximizar a captacao do FUNDEB e cumprir as exigencias da BNCC Computacao.",
  cta: "Quero Garantir Minha Vaga",
};

export const URGENCY_ITEMS = [
  {
    value: "20",
    suffix: "dias",
    label: "ate o Censo Escolar",
    description: "Prazo limite: 27 de maio de 2026. Matriculas nao registradas = recursos perdidos por 1 ano",
    color: "red" as const,
  },
  {
    value: "2.5%",
    suffix: "",
    label: "do FUNDEB em risco",
    description: "Redes que nao implementarem a BNCC Computacao perdem ate 2.5% dos recursos",
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
      "Como funciona a captacao do FUNDEB 2026",
      "As 15 categorias de matricula e seus fatores",
      "Prazo critico: Censo Escolar 27 de maio",
      "Erros comuns que fazem municipios perderem recursos",
    ],
  },
  {
    icon: "bncc" as const,
    title: "BNCC COMPUTACAO",
    duration: "15 min",
    items: [
      "O que a Resolucao CNE/CEB 1/2022 exige",
      "Prazos de adequacao para 2026",
      "Como implementar sem infraestrutura cara",
      "Impacto no VAAR e na captacao de recursos",
    ],
  },
  {
    icon: "vaar" as const,
    title: "PERGUNTAS & RESPOSTAS",
    duration: "10 min",
    items: [
      "Tire suas duvidas ao vivo com os palestrantes",
      "Casos praticos do seu municipio",
      "Proximos passos e plano de acao",
      "Como acessar o sistema BNCC-CAPTACAO",
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: "Quem pode participar do webinar?",
    answer:
      "O webinar e voltado para Secretarios(as) de Educacao, gestores, diretores, coordenadores e toda equipe envolvida na captacao de recursos e adequacao curricular dos municipios de SP.",
  },
  {
    question: "Quanto custa?",
    answer:
      "O webinar e 100% gratuito. E uma iniciativa da APM em parceria com o Instituto i10 para capacitar os municipios paulistas.",
  },
  {
    question: "O que e o sistema BNCC-CAPTACAO?",
    answer:
      "E a plataforma desenvolvida pelo Instituto i10 que guia municipios na otimizacao da captacao do FUNDEB, identificando oportunidades em 15 categorias de matricula, compliance VAAR e implementacao da BNCC Computacao.",
  },
  {
    question: "Posso assistir a gravacao depois?",
    answer:
      "Sim, a gravacao ficara disponivel para todos os inscritos. Porem, recomendamos a participacao ao vivo para interagir e tirar duvidas diretamente com os palestrantes.",
  },
  {
    question: "Meu municipio precisa se preocupar com o prazo de 27 de maio?",
    answer:
      "Sim! O dia 27 de maio e a data limite do Censo Escolar. Matriculas nao registradas ou classificadas incorretamente significam recursos perdidos por todo o ano de 2026. Por isso a urgencia em agir agora.",
  },
  {
    question: "O que acontece se meu municipio nao implementar a BNCC Computacao?",
    answer:
      "A nao implementacao pode resultar na perda de ate 2.5% dos recursos do FUNDEB e no nao cumprimento das condicionalidades do VAAR, reduzindo significativamente a receita educacional do municipio.",
  },
];

export const NAV_LINKS = [
  { href: "#urgencia", label: "Urgencia" },
  { href: "#conteudo", label: "Conteudo" },
  { href: "#webinar", label: "Webinar" },
  { href: "#palestrantes", label: "Palestrantes" },
  { href: "#faq", label: "FAQ" },
];
