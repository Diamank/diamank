import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function Painel() {
  const [dias, setDias] = useState(7)

  // Simulação de dados
  const [dados, setDados] = useState<any[]>([])

  useEffect(() => {
    // Simula notas negociadas
    const hoje = new Date()
    const gerados = Array.from({ length: dias }, (_, i) => {
      const d = new Date(hoje)
      d.setDate(d.getDate() - (dias - i - 1))
      return {
        data: d.toLocaleDateString('pt-BR'),
        valor: Math.round(Math.random() * 5000),
        quantidade: Math.round(Math.random() * 5),
      }
    })
    setDados(gerados)
  }, [dias])

  const totalNotas = dados.reduce((soma, item) => soma + item.quantidade, 0)
  const totalValor = dados.reduce((soma, item) => soma + item.valor, 0)

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
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Olá, teste@cedente.com</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-yellow-100 rounded-xl p-4">
            <h2 className="text-sm text-gray-600">Notas Negociadas</h2>
            <p className="text-2xl font-bold text-yellow-800">{totalNotas}</p>
          </div>
          <div className="bg-green-100 rounded-xl p-4">
            <h2 className="text-sm text-gray-600">Volume Negociado</h2>
            <p className="text-2xl font-bold text-green-800">
              R$ {totalValor.toLocaleString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Volume Negociado</h2>
            <div className="space-x-2">
              {[7, 15, 30].map((num) => (
                <button
                  key={num}
                  onClick={() => setDias(num)}
                  className={`px-3 py-1 rounded-full border ${
                    dias === num ? 'bg-black text-white' : 'bg-gray-100'
                  }`}
                >
                  {num} dias
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dados}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="#3b82f6" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  )
}
