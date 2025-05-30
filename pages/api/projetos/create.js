import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método não permitido" });

  const { titulo, descricao, usuarioId } = req.body;
  try {
    const projeto = await prisma.projeto.create({
      data: {
        titulo,
        descricao,
        usuarioId,
      },
    });
    res.status(200).json(projeto);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar projeto", error });
  }
}
