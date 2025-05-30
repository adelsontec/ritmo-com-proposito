import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, senha } = req.body;

  const usuario = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!usuario || usuario.senha !== senha) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  res.status(200).json(usuario);
}