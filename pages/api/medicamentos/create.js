import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { nome, horario, dose, usuarioId } = req.body;

  try {
    const medicamento = await prisma.medicamento.create({
      data: {
        nome,
        horario,
        dose,
        usuarioId
      }
    });
    res.status(200).json(medicamento);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar medicamento' });
  }
}