import { HERO } from "@/lib/constants";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient chevron-pattern">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-alert/20 text-white text-sm font-bold mb-6">
          <span className="w-2 h-2 rounded-full bg-red-alert countdown-pulse" />
          FALTAM APENAS 21 DIAS PARA O CENSO ESCOLAR
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-serif">
          Nao deixe seu municipio perder recursos
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
          Inscreva-se agora e aprenda como maximizar a captacao do FUNDEB antes que o prazo do Censo Escolar expire.
        </p>
        <a
          href="#inscricao"
          className="inline-flex items-center justify-center px-10 py-4 rounded-lg bg-white text-teal-dark font-bold text-lg hover:brightness-95 transition-all shadow-lg"
        >
          {HERO.cta}
        </a>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm">
          <span>100% Gratuito</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>Google Meet ao Vivo</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>APM + Instituto i10</span>
        </div>
      </div>
    </section>
  );
}
