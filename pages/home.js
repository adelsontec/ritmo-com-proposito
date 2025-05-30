// pages/home.js
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bem-vindo ao seu Assistente Pessoal</h1>
      <div className="space-y-4">
        <Link href="/agua" className="block bg-blue-500 text-white p-4 rounded text-center">💧 Hidratação</Link>
        <Link href="/medicamentos" className="block bg-green-500 text-white p-4 rounded text-center">💊 Medicamentos</Link>
        <Link href="/projetos" className="block bg-purple-500 text-white p-4 rounded text-center">📈 Projetos</Link>
      </div>
    </main>
  );
}
