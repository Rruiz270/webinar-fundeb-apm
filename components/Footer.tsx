export default function Footer() {
  return (
    <footer className="bg-teal-darker">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-3">
              <img
                src="/images/apm-logo-pill-web.png"
                alt="APM"
                className="h-10 w-auto"
              />
              <span className="text-white/30 text-sm">+</span>
              <span className="text-green font-extrabold text-xl">i10</span>
            </div>
            <p className="text-xs text-white/40 italic">
              Captando recursos para a educacao publica
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#inscricao" className="text-white/60 hover:text-white transition-colors">
              Inscreva-se
            </a>
            <a href="#conteudo" className="text-white/60 hover:text-white transition-colors">
              Conteudo
            </a>
            <a href="#faq" className="text-white/60 hover:text-white transition-colors">
              FAQ
            </a>
          </div>
        </div>

        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-green/30 to-transparent" />

        <div className="mt-6 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} APM — Associacao Paulista de Municipios em parceria com Instituto i10. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
