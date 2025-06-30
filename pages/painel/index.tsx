import { useState } from 'react'
import Link from 'next/link'

export default function Painel() {
  const [usuario] = useState<any>({
    email: 'teste@cedente.com'
  })

  const handleLogout = () => {
    alert('Logout simulado. Quando o login estiver ativo, isso chamará supabase.auth.signOut().')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Painel do Cedente</h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/painel">🏠 Dashboard</Link>
          <Link href="/painel/notas">📄 Notas Fiscais</Link>
          <Link href="/painel/contratos">📑 Contratos</Link>
          <Link href="/painel/documentos">📂 Documentos</Link>
          <Link href="/painel/movimentacoes">💰 Movimentações</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Sair
        </button>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Olá, {usuario.email}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-100 rounded-xl p-4">
            <h2 className="text-sm text-gray-600">Saldo Disponível</h2>
            <p className="text-2xl font-bold text-blue-800">R$ 0,00</p>
          </div>
          <div className="bg-green-100 rounded-xl p-4">
            <h2 className="text-sm text-gray-600">Limite Contratado</h2>
            <p className="text-2xl font-bold text-green-800">R$ 0,00</p>
          </div>
          <div className="bg-yellow-100 rounded-xl p-4">
            <h2 className="text-sm text-gray-600">Notas Cadastradas</h2>
            <p className="text-2xl font-bold text-yellow-800">0</p>
          </div>
        </div>
      </main>
    </div>
  )
}
