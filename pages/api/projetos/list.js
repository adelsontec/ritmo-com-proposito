import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { usuarioId } = req.query;
  try {
    const projetos = await prisma.projeto.findMany({
      where: { usuarioId },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(projetos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar projetos", error });
  }
}
