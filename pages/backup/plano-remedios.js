// pages/plano-remedios.js
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PlanoRemedios() {
  const [remedios, setRemedios] = useState([]);

  useEffect(() => {
    const salvos = localStorage.getItem("planoRemedios");
    if (salvos) setRemedios(JSON.parse(salvos));
  }, []);

  useEffect(() => {
    localStorage.setItem("planoRemedios", JSON.stringify(remedios));
  }, [remedios]);

  const adicionar = () => {
    const nome = prompt("Nome do remédio:");
    const horario = prompt("Horário (ex: 08:00, 14:00):");
    if (nome && horario) {
      setRemedios((prev) => [...prev, { nome, horario }]);

      // Envia ao backend para agendar push
      fetch("/api/schedule-medicine-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, horario }),
      });
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Plano de Remédios</h1>
      <p className="mb-6">Adicione seus medicamentos e receba lembretes automáticos nos horários definidos.</p>

      <ul className="mb-6">
        {remedios.map((r, i) => (
          <li key={i} className="mb-2">
            💊 <strong>{r.nome}</strong> às <strong>{r.horario}</strong>
          </li>
        ))}
      </ul>

      <button
        onClick={adicionar}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Adicionar Remédio
      </button>

      <div className="mt-6">
        <Link href="/">
          <span className="text-blue-600 underline">← Voltar para Início</span>
        </Link>
      </div>
    </main>
  );
}
