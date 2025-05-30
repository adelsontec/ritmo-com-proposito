import webpush from 'web-push';

webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { subscription, title, body } = req.body;

  try {
    await webpush.sendNotification(subscription, JSON.stringify({
      title: title || '💧 Hora de beber água!',
      body: body || 'Hora de se hidratar com propósito!',
    }));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    res.status(500).json({ error: 'Erro ao enviar notificação' });
  }
}