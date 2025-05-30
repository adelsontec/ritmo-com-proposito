import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, senha, nome } = req.body;

  try {
    const usuario = await prisma.usuario.create({
      data: { email, senha, nome }
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
}