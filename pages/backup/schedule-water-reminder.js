import webpush from 'web-push';

console.log('🔐 VAPID PUBLIC:', process.env.VAPID_PUBLIC_KEY);
console.log('🔐 VAPID PRIVATE:', process.env.VAPID_PRIVATE_KEY);
console.log('🔐 VAPID EMAIL:', process.env.VAPID_EMAIL);

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { subscription, title, body } = req.body;

  try {
    await webpush.sendNotification(subscription, JSON.stringify({
      title: title || '💧 Hora de beber água!',
      body: body || 'Beba um copo de água para se manter hidratado!',
    }));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    res.status(500).json({ error: 'Erro ao enviar notificação' });
  }
}
