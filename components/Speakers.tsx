import { SPEAKERS } from "@/lib/constants";

export default function Speakers() {
  return (
    <section id="palestrantes" className="bg-teal-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-serif">
            Seus Palestrantes
          </h2>
          <p className="text-base text-white/50">
            Especialistas com experiência prática em gestão educacional e captação de recursos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {SPEAKERS.map((s) => (
            <div
              key={s.name}
              className="flex flex-col items-center text-center bg-teal-dark/60 rounded-2xl p-8 border border-green/20"
            >
              {s.image ? (
                <div className="w-28 h-28 rounded-full ring-4 ring-green/40 shadow-[0_0_20px_rgba(0,229,160,0.3)] mb-4 overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-28 h-28 rounded-full bg-teal flex items-center justify-center ring-4 ring-green/40 shadow-[0_0_20px_rgba(0,229,160,0.3)] mb-4">
                  <span className="text-white text-2xl font-bold">{s.initials}</span>
                </div>
              )}

              <h3 className="text-lg font-bold text-white">{s.name}</h3>
              <p className="text-sm font-semibold text-green mb-3">{s.title}</p>
              <p className="text-sm text-white/60 leading-relaxed">{s.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
