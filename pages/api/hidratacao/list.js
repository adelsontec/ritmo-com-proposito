import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { usuarioId } = req.query;
  try {
    const registros = await prisma.hidratacao.findMany({
      where: { usuarioId },
      orderBy: { horario: "desc" },
    });
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar hidratação", error });
  }
}
