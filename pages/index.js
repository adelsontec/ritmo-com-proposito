import { useEffect, useState } from "react";

export default function Home() {
  const [agua, setAgua] = useState(0);
  const [remedios, setRemedios] = useState([]);
  const [reflexao, setReflexao] = useState("");

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const aguaSalva = localStorage.getItem("agua");
    const remediosSalvos = localStorage.getItem("remedios");
    const reflexaoSalva = localStorage.getItem("reflexao");

    if (aguaSalva) setAgua(parseInt(aguaSalva));
    if (remediosSalvos) setRemedios(JSON.parse(remediosSalvos));
    if (reflexaoSalva) setReflexao(reflexaoSalva);
  }, []);

  // Salvar dados sempre que mudarem
  useEffect(() => {
    localStorage.setItem("agua", agua.toString());
  }, [agua]);

  useEffect(() => {
    localStorage.setItem("remedios", JSON.stringify(remedios));
  }, [remedios]);

  useEffect(() => {
    localStorage.setItem("reflexao", reflexao);
  }, [reflexao]);
  
  const tomarAgua = () => setAgua((prev) => prev + 1);

  const adicionarRemedio = () => {
    const nome = prompt("Digite o nome do remédio:");
    if (nome) setRemedios((prev) => [...prev, nome]);
  };

  // Verifica e pede permissão para notificações no primeiro carregamento
useEffect(() => {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}, []);

// Simular notificações para teste (remover no final)
useEffect(() => {
  if ("Notification" in window && Notification.permission === "granted") {
    setTimeout(() => {
      new Notification("💧 Hora de beber água!");
    }, 5000); // 5 segundos após abrir

    setTimeout(() => {
      new Notification("📖 Já fez sua reflexão com Deus hoje?");
    }, 10000); // 10 segundos após abrir
  }
}, []);


  return (
    <main className="min-h-screen p-4 max-w-2xl mx-auto bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">Ritmo com Propósito</h1>
      <p className="italic text-gray-700 mb-6">
        “Ensina-nos a contar os nossos dias, de tal maneira que alcancemos corações sábios.” – Salmos 90:12
      </p>

      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">💧 Hidratação</h2>
        <p>Copos de água tomados hoje: <strong>{agua}</strong></p>
        <button
          onClick={tomarAgua}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Registrar copo de água
        </button>
      </section>

      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">💊 Remédios</h2>
        {remedios.length === 0 ? (
          <p>Nenhum remédio registrado.</p>
        ) : (
          <ul className="list-disc list-inside">
            {remedios.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        )}
        <button
          onClick={adicionarRemedio}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Adicionar remédio
        </button>
      </section>

      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">📖 Reflexão</h2>
        <textarea
          value={reflexao}
          onChange={(e) => setReflexao(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded"
          placeholder="Como você usou seu tempo hoje para glorificar a Deus?"
        />
      </section>
    </main>
  );
}
