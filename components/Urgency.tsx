import { URGENCY_ITEMS } from "@/lib/constants";

export default function Urgency() {
  const colorMap = {
    red: { value: "text-red-alert", bg: "bg-red-alert/10", border: "border-red-alert/30" },
    orange: { value: "text-orange-alert", bg: "bg-orange-alert/10", border: "border-orange-alert/30" },
    green: { value: "text-green", bg: "bg-green/10", border: "border-green/30" },
  };

  return (
    <section id="urgencia" className="bg-teal-darker">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-serif">
            Por que você precisa agir AGORA
          </h2>
          <p className="text-base text-white/50 max-w-2xl mx-auto">
            Cada dia sem ação representa recursos perdidos para a educação do seu município.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {URGENCY_ITEMS.map((item) => {
            const colors = colorMap[item.color];
            return (
              <div
                key={item.value}
                className={`rounded-2xl ${colors.bg} border ${colors.border} p-6 text-center transition-all hover:-translate-y-1`}
              >
                <p className={`text-4xl sm:text-5xl font-bold ${colors.value} mb-1 font-serif`}>
                  {item.value}
                  {item.suffix && (
                    <span className="text-lg font-semibold ml-1">{item.suffix}</span>
                  )}
                </p>
                <p className="text-base font-semibold text-white mb-2">
                  {item.label}
                </p>
                <p className="text-sm text-white/50">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl bg-red-alert/15 border border-red-alert/40 p-4 sm:p-6 text-center">
          <p className="text-white font-bold text-base sm:text-lg">
            <span className="text-red-alert">DATA CRÍTICA:</span>{" "}
            27 de Maio de 2026 — Censo Escolar
          </p>
          <p className="text-white/60 text-sm mt-1">
            Matrículas não registradas até esta data = recursos perdidos por todo o ano letivo de 2026
          </p>
        </div>
      </div>
    </section>
  );
}
