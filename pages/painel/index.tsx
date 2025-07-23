import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Home,
  User,
  Link as LinkIcon,
  BarChart2,
  Wallet,
  PencilLine
} from 'lucide-react'
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
      {/* Menu lateral com ícones */}
      <aside className="w-20 bg-white shadow-lg py-6 flex flex-col items-center space-y-6">
        <MenuItem href="/painel" icon={<Home size={24} />} label="Início" />
        <MenuItem href="/painel/banco" icon={<User size={24} />} label="Dados" />
        <MenuItem href="/painel/links" icon={<LinkIcon size={24} />} label="Links" />
        <MenuItem href="/painel/relatorio" icon={<BarChart2 size={24} />} label="Relatório" />
        <MenuItem href="/painel/saque" icon={<Wallet size={24} />} label="Saque" />
        <MenuItem href="/painel/assinatura" icon={<PencilLine size={24} />} label="Assinatura" />
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Olá, teste@cedente.com</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Notas Negociadas</h2>
            <p className="text-3xl font-bold text-gray-800">{totalNotas}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Volume Negociado</h2>
            <p className="text-3xl font-bold text-gray-800">
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

// Componente auxiliar de item de menu com ícone + legenda
function MenuItem({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link href={href} className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition">
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  )
}
