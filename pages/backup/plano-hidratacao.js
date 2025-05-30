import { useState } from "react";

export default function PlanoHidratacao() {
  const [ativado, setAtivado] = useState(false);

  async function ativarPlano() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      alert("Seu navegador não suporta notificações push.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Permissão de notificação negada.");
      return;
    }

    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidKey) {
      alert("Chave VAPID pública não configurada.");
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    });

    await fetch("/api/schedule-water-reminder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subscription,
        title: "💧 Hora de beber água!",
        body: "Beba um copo a cada 2 horas. Hábito saudável, mente saudável!",
      }),
    });

    setAtivado(true);

    // Simula agendamento local
    setInterval(() => {
      if (Notification.permission === "granted") {
        new Notification("💧 Hora de beber água!", {
          body: "Beba um copo agora para manter a hidratação.",
        });
      }
    }, 2 * 60 * 60 * 1000); // 2 horas
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Plano de Hidratação</h1>
      <p className="mb-4">
        Este plano irá te lembrar a cada 2 horas para beber um copo de água (250ml).
      </p>
      <button
        onClick={ativarPlano}
        disabled={ativado}
        className={`px-4 py-2 rounded ${ativado ? "bg-gray-500" : "bg-blue-600 text-white"}`}
      >
        {ativado ? "Plano Ativado ✅" : "Ativar Lembretes"}
      </button>
    </main>
  );
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map((char) => char.charCodeAt(0)));
}
