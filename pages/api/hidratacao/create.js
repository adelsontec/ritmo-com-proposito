import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método não permitido" });

  const { quantidade, horario, usuarioId } = req.body;
  try {
    const record = await prisma.hidratacao.create({
      data: {
        quantidade,
        horario,
        usuarioId,
      },
    });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar registro de hidratação", error });
  }
}
