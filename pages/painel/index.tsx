// pages/painel/index.tsx
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
      {/* Menu lateral */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Painel do Cedente</h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/painel" className="text-blue-600 hover:underline">🏠 Dashboard</Link>
          <Link href="/painel/notas" className="text-blue-600 hover:underline">📄 Notas Fiscais</Link>
          <Link href="/painel/contratos" className="text-blue-600 hover:underline">📑 Contratos</Link>
          <Link href="/painel/documentos" className="text-blue-600 hover:underline">📂 Documentos</Link>
          <Link href="/painel/movimentacoes" className="text-blue-600 hover:underline">💰 Movimentações</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Sair
        </button>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Olá, {usuario.email}</h1>
        </div>

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

        <section>
          <h2 className="text-xl font-semibold mb-2">Próximas Ações</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            <li>Enviar nova nota fiscal</li>
            <li>Assinar contrato pendente</li>
            <li>Atualizar documentos</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

// pages/painel/notas.tsx
import { useState } from 'react'

export default function Notas() {
  const [xml, setXml] = useState<File | null>(null)
  const [pdf, setPdf] = useState<File | null>(null)

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Upload simulado - aqui faremos a integração com Supabase Storage e a criação no banco.')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Notas Fiscais</h1>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">XML da Nota</label>
            <input
              type="file"
              accept=".xml"
              onChange={(e) => setXml(e.target.files?.[0] || null)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">PDF da Nota</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdf(e.target.files?.[0] || null)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Enviar Nota
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Histórico de Notas</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Sacado</th>
                <th className="p-2 text-left">Valor</th>
                <th className="p-2 text-left">Vencimento</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">Empresa XPTO</td>
                <td className="p-2">R$ 4.500,00</td>
                <td className="p-2">15/07/2025</td>
                <td className="p-2 text-yellow-600 font-semibold">Em análise</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
