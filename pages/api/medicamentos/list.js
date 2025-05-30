import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { usuarioId } = req.query;

  const medicamentos = await prisma.medicamento.findMany({
    where: { usuarioId }
  });

  res.status(200).json(medicamentos);
}