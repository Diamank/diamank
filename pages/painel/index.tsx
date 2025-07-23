import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function Painel() {
  const [dias, setDias] = useState(7)

  const [dados, setDados] = useState<any[]>([])
  const [dadosFixos, setDadosFixos] = useState<any[]>([])

  useEffect(() => {
    const hoje = new Date()
    const gerados = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(hoje)
      d.setDate(d.getDate() - (29 - i))
      return {
        data: d.toLocaleDateString('pt-BR'),
        valor: Math.round(Math.random() * 5000),
        quantidade: Math.round(Math.random() * 5),
      }
    })
    setDadosFixos(gerados)
  }, [])

  const dadosFiltrados = dadosFixos.slice(-dias)

  const totalNotas = dadosFixos.reduce((soma, item) => soma + item.quantidade, 0)
  const totalValor = dadosFixos.reduce((soma, item) => soma + item.valor, 0)

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-neutral-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Painel do Cedente</h2>
        <nav className="flex flex-col space-y-4 text-blue-600 font-medium">
          <Link href="/painel" className="hover:underline">🏠 Dashboard</Link>
          <Link href="/painel/notas" className="hover:underline">📄 Notas Fiscais</Link>
          <Link href="/painel/contratos" className="hover:underline">📑 Contratos</Link>
          <Link href="/painel/documentos" className="hover:underline">📂 Documentos</Link>
          <Link href="/painel/movimentacoes" className="hover:underline">💰 Movimentações</Link>
          <Link href="/painel/boletos" className="hover:underline">🏦 Boletos</Link>
          <Link href="/painel/banco" className="hover:underline">🏛️ Dados Bancários</Link>
        </nav>
        <button
          onClick={() => alert('Logout simulado')}
          className="mt-10 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Sair
        </button>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Olá, teste@cedente.com</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-yellow-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm text-gray-600">Notas Negociadas</h2>
            <p className="text-3xl font-semibold text-yellow-800">{totalNotas}</p>
          </div>
          <div className="bg-green-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm text-gray-600">Volume Negociado</h2>
            <p className="text-3xl font-semibold text-green-800">
              R$ {totalValor.toLocaleString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Volume Negociado (últimos {dias} dias)</h2>
            <div className="space-x-2">
              {[7, 15, 30].map((num) => (
                <button
                  key={num}
                  onClick={() => setDias(num)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    dias === num ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {num} dias
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosFiltrados}>
              <XAxis dataKey="data" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(v) => `R$ ${v.toLocaleString('pt-BR')}`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) =>
                  [`R$ ${value.toLocaleString('pt-BR')}`, 'Volume']
                }
              />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  )
}
