import { HERO } from "@/lib/constants";
import SubscribeForm from "./SubscribeForm";

export default function Hero() {
  return (
    <section
      id="inscricao"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-darker via-teal-dark to-teal" />
      <div className="absolute inset-0 chevron-pattern opacity-40" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="text-center lg:text-left lg:pt-4 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-alert/20 text-white text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-red-alert countdown-pulse" />
              CENSO ESCOLAR FECHA EM 27/05 — URGENTE
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 font-serif">
              {HERO.headline}
            </h1>

            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
              {HERO.subheadline}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-white font-semibold">15 de Maio | 17h</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-white font-semibold">Google Meet | Gratuito</span>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <img
                src="/images/apm-logo-pill-web.png"
                alt="APM"
                className="h-8 w-auto opacity-70"
              />
              <span className="text-white/30 text-sm">em parceria com</span>
              <span className="text-green font-bold text-sm">Instituto i10</span>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto lg:mx-0 order-1 lg:order-2">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
