// pages/login.js
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();
    // Aqui futuramente: autenticação real
    router.push("/home");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Entrar no Ritmo com Propósito</h1>
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <input type="email" required placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" required placeholder="Senha" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
      </form>
    </main>
  );
}
