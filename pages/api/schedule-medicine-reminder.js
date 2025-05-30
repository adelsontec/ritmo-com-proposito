// pages/api/schedule-medicine-reminder.js
import webpush from 'web-push';

webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { subscription, title, body } = req.body;

    if (!subscription || !title || !body) {
      return res.status(400).json({ error: 'Dados incompletos para o agendamento' });
    }

    // Simula agendamento em 5 segundos
    setTimeout(() => {
      webpush.sendNotification(subscription, JSON.stringify({ title, body })).catch(err => {
        console.error('Erro ao enviar notificação:', err);
      });
    }, 5000);

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Método não permitido' });
}

async function ativarLembreteMedicamento() {
  try {
    // Solicita permissão de notificação
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('Permissão de notificação negada.');
      return;
    }

    // Verifica se o service worker já está registrado
    const registration = await navigator.serviceWorker.ready;

    // Obtém a inscrição do PushManager
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });

    // Envia a inscrição para o backend
    const response = await fetch('/api/schedule-medicine-reminder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription }),
    });

    if (response.ok) {
      alert('Lembrete de medicamento ativado com sucesso!');
    } else {
      alert('Erro ao ativar lembrete. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao configurar lembrete:', error);
    alert('Erro ao configurar lembrete. Veja o console.');
  }
}
