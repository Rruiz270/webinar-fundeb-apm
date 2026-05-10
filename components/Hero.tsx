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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green/20 text-white text-sm font-bold mb-6 uppercase tracking-wider">
              Webinar Gratuito
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6 font-serif">
              {HERO.headline}
            </h1>

            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
              {HERO.subheadline}
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-white font-semibold">18/05</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-white font-semibold">15h</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-sm text-white font-semibold">Online via Google Meet</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green/20 border border-green/30">
                <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-green font-bold">100% gratuito</span>
              </div>
            </div>

            <p className="text-sm text-white/50 mb-6">
              Voltado para secretários(as), gestores, diretores, coordenadores e equipes técnicas da educação municipal.
            </p>

            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <img
                src="https://webinar-fundeb-apm.vercel.app/images/apm-logo-pill-web.png"
                alt="APM — Associação Paulista de Municípios"
                className="h-12 sm:h-14 w-auto"
              />
              <span className="text-green font-extrabold text-2xl">i10</span>
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
