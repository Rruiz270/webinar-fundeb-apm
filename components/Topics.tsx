import { TOPICS } from "@/lib/constants";

function TopicIcon({ icon }: { icon: string }) {
  if (icon === "fundeb") {
    return (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#00E5A0" strokeWidth="1.5">
        <circle cx="16" cy="16" r="12" />
        <path d="M12 12h8M12 16h8M12 20h5" strokeLinecap="round" />
        <path d="M16 4v4M16 24v4" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "bncc") {
    return (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#00E5A0" strokeWidth="1.5">
        <rect x="4" y="6" width="24" height="20" rx="3" />
        <path d="M12 16h8M12 20h6" strokeLinecap="round" />
        <circle cx="16" cy="12" r="2" fill="#00E5A0" />
      </svg>
    );
  }
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#00E5A0" strokeWidth="1.5">
      <path d="M16 4l12 8v12L16 28 4 24V12L16 4z" />
      <path d="M16 16v8M12 14l4 2 4-2" strokeLinecap="round" />
    </svg>
  );
}

export default function Topics() {
  return (
    <section id="conteudo" className="bg-teal-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-serif">
            O que voce vai aprender
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            1h30 de conteudo pratico dividido em 3 blocos essenciais para captar recursos e se adequar as exigencias.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TOPICS.map((topic) => (
            <div
              key={topic.title}
              className="rounded-2xl border border-green/20 bg-teal-darker/60 p-6 sm:p-8 transition-all hover:-translate-y-1 hover:glow-teal"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center">
                  <TopicIcon icon={topic.icon} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {topic.title}
                  </h3>
                  <span className="text-xs font-semibold text-green">
                    {topic.duration}
                  </span>
                </div>
              </div>

              <ul className="space-y-3">
                {topic.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white/70"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
