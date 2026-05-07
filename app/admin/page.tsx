"use client";

import { useState } from "react";
import { apiUrl } from "@/lib/api-url";

interface Subscriber {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  municipio: string | null;
  cargo: string | null;
  aceita_atualizacoes: boolean;
  createdAt: string;
}

interface EmailLog {
  id: number;
  reminderId: string;
  sentAt: string;
  totalSent: number;
  totalFailed: number;
  status: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"inscritos" | "emails" | "stats">("inscritos");
  const [search, setSearch] = useState("");

  async function fetchSubscribers(pwd: string) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(apiUrl("/api/admin/subscribers"), {
        headers: { Authorization: `Bearer ${pwd}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao buscar dados");
        return;
      }

      setSubscribers(data.subscribers);
      setEmailLogs(data.emailLogs || []);
      setTotal(data.total);
      setAuthenticated(true);
    } catch {
      setError("Erro de conexao");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchSubscribers(password);
  }

  function exportCSV() {
    const headers = [
      "ID",
      "Nome",
      "Email",
      "Telefone",
      "Municipio",
      "Cargo",
      "Aceita Atualizacoes",
      "Data Inscricao",
    ];

    const rows = subscribers.map((s) => [
      s.id,
      `"${s.nome}"`,
      s.email,
      s.telefone || "",
      `"${s.municipio || ""}"`,
      `"${s.cargo || ""}"`,
      s.aceita_atualizacoes ? "Sim" : "Nao",
      new Date(s.createdAt).toLocaleString("pt-BR"),
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `inscritos-webinar-fundeb-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportExcel() {
    const headers = ["ID", "Nome", "Email", "Telefone", "Municipio", "Cargo", "Data"];
    const rows = subscribers.map((s) => [
      s.id,
      s.nome,
      s.email,
      s.telefone || "",
      s.municipio || "",
      s.cargo || "",
      new Date(s.createdAt).toLocaleString("pt-BR"),
    ]);

    let xml = '<?xml version="1.0"?>\n<?mso-application progid="Excel.Sheet"?>\n';
    xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n';
    xml += "<Worksheet ss:Name=\"Inscritos\">\n<Table>\n";
    xml += "<Row>" + headers.map((h) => `<Cell><Data ss:Type="String">${h}</Data></Cell>`).join("") + "</Row>\n";
    rows.forEach((row) => {
      xml += "<Row>" + row.map((cell) => `<Cell><Data ss:Type="String">${cell}</Data></Cell>`).join("") + "</Row>\n";
    });
    xml += "</Table>\n</Worksheet>\n</Workbook>";

    const blob = new Blob([xml], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `inscritos-webinar-fundeb-${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const filteredSubscribers = subscribers.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.nome.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      (s.municipio && s.municipio.toLowerCase().includes(q)) ||
      (s.cargo && s.cargo.toLowerCase().includes(q))
    );
  });

  const cargoStats = subscribers.reduce<Record<string, number>>((acc, s) => {
    const key = s.cargo || "Nao informado";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const municipioStats = subscribers.reduce<Record<string, number>>((acc, s) => {
    const key = s.municipio || "Nao informado";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-darker">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-sm"
        >
          <h1 className="text-xl font-bold text-teal-dark mb-2">Admin — Webinar FUNDEB</h1>
          <p className="text-sm text-text-gray mb-6">
            Digite a senha para acessar o dashboard.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-teal text-white font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-60"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-gray">
      <header className="bg-teal-dark text-white px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold">Dashboard — Webinar FUNDEB 2026</h1>
            <p className="text-sm text-white/60">{total} inscrito(s) | 18 de Maio as 15h</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTab("inscritos")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${tab === "inscritos" ? "bg-green text-teal-darker" : "bg-white/20 text-white hover:bg-white/30"}`}
            >
              Inscritos ({total})
            </button>
            <button
              onClick={() => setTab("stats")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${tab === "stats" ? "bg-green text-teal-darker" : "bg-white/20 text-white hover:bg-white/30"}`}
            >
              Estatisticas
            </button>
            <button
              onClick={() => setTab("emails")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${tab === "emails" ? "bg-green text-teal-darker" : "bg-white/20 text-white hover:bg-white/30"}`}
            >
              E-mails ({emailLogs.length})
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-lg bg-white/20 text-white font-semibold text-sm hover:bg-white/30 transition-all"
            >
              CSV
            </button>
            <button
              onClick={exportExcel}
              className="px-4 py-2 rounded-lg bg-green text-teal-darker font-semibold text-sm hover:brightness-110 transition-all"
            >
              Excel
            </button>
          </div>
        </div>
      </header>

      {tab === "stats" && (
        <div className="p-6">
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow border border-border p-6 text-center">
              <p className="text-4xl font-bold text-teal">{total}</p>
              <p className="text-sm text-text-gray mt-1">Total de Inscritos</p>
            </div>
            <div className="bg-white rounded-xl shadow border border-border p-6 text-center">
              <p className="text-4xl font-bold text-teal">{Object.keys(municipioStats).length}</p>
              <p className="text-sm text-text-gray mt-1">Municipios</p>
            </div>
            <div className="bg-white rounded-xl shadow border border-border p-6 text-center">
              <p className="text-4xl font-bold text-teal">{emailLogs.length}</p>
              <p className="text-sm text-text-gray mt-1">Lembretes Enviados</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow border border-border p-6">
              <h3 className="font-bold text-text-dark mb-4">Por Cargo</h3>
              {Object.entries(cargoStats).sort((a, b) => b[1] - a[1]).map(([cargo, count]) => (
                <div key={cargo} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-text-gray">{cargo}</span>
                  <span className="text-sm font-bold text-teal">{count}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow border border-border p-6">
              <h3 className="font-bold text-text-dark mb-4">Por Municipio</h3>
              {Object.entries(municipioStats).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([mun, count]) => (
                <div key={mun} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-text-gray">{mun}</span>
                  <span className="text-sm font-bold text-teal">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "emails" && (
        <div className="p-6 overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-gray">
                <th className="text-left px-4 py-3 font-semibold text-text-dark">Lembrete</th>
                <th className="text-left px-4 py-3 font-semibold text-text-dark">Enviados</th>
                <th className="text-left px-4 py-3 font-semibold text-text-dark">Falhas</th>
                <th className="text-left px-4 py-3 font-semibold text-text-dark">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-text-dark">Data</th>
              </tr>
            </thead>
            <tbody>
              {emailLogs.map((log) => (
                <tr key={log.id} className="border-b border-border last:border-0 hover:bg-bg-gray/50">
                  <td className="px-4 py-3 text-text-dark font-medium">{log.reminderId}</td>
                  <td className="px-4 py-3 text-green font-bold">{log.totalSent}</td>
                  <td className="px-4 py-3 text-red-alert font-bold">{log.totalFailed}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${log.status === "completed" ? "bg-green/10 text-green" : "bg-orange-alert/10 text-orange-alert"}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-gray whitespace-nowrap">{new Date(log.sentAt).toLocaleString("pt-BR")}</td>
                </tr>
              ))}
              {emailLogs.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-text-gray">Nenhum lembrete enviado ainda.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "inscritos" && (
        <div className="p-6">
          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, email, municipio ou cargo..."
              className="w-full max-w-md px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow border border-border text-sm">
              <thead>
                <tr className="border-b border-border bg-bg-gray">
                  <th className="text-left px-4 py-3 font-semibold text-text-dark">Nome</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-dark">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-dark">Telefone</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-dark">Municipio</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-dark">Cargo</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-dark">Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-border last:border-0 hover:bg-bg-gray/50"
                  >
                    <td className="px-4 py-3 text-text-dark">{s.nome}</td>
                    <td className="px-4 py-3 text-text-gray">{s.email}</td>
                    <td className="px-4 py-3 text-text-gray">{s.telefone || "—"}</td>
                    <td className="px-4 py-3 text-text-gray">{s.municipio || "—"}</td>
                    <td className="px-4 py-3 text-text-gray">{s.cargo || "—"}</td>
                    <td className="px-4 py-3 text-text-gray whitespace-nowrap">
                      {new Date(s.createdAt).toLocaleString("pt-BR")}
                    </td>
                  </tr>
                ))}
                {filteredSubscribers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-text-gray">
                      {search ? "Nenhum resultado para a busca." : "Nenhum inscrito ainda."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
