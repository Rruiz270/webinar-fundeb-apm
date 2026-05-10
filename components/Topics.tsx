import { HIGHLIGHTS } from "@/lib/constants";

function HighlightIcon({ icon }: { icon: string }) {
  if (icon === "fundeb") {
    return (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="12" />
        <path d="M12 12h8M12 16h8M12 20h5" strokeLinecap="round" />
        <path d="M16 4v4M16 24v4" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "bncc") {
    return (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="6" width="24" height="20" rx="3" />
        <path d="M12 16h8M12 20h6" strokeLinecap="round" />
        <circle cx="16" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "rede") {
    return (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="8" r="4" />
        <circle cx="8" cy="24" r="4" />
        <circle cx="24" cy="24" r="4" />
        <path d="M14 11L10 21M18 11L22 21" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="24" height="24" rx="3" />
      <path d="M10 12h12M10 16h12M10 20h8" strokeLinecap="round" />
    </svg>
  );
}

export default function Topics() {
  return (
    <section id="conteudo" className="bg-teal-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-serif">
            Participe deste webinar exclusivo e descubra:
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-green/20 bg-teal-darker/60 p-6 transition-all hover:-translate-y-1 hover:glow-teal"
            >
              <div className="w-10 h-10 rounded-lg bg-green/20 text-green flex items-center justify-center shrink-0 mt-0.5">
                <HighlightIcon icon={item.icon} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
