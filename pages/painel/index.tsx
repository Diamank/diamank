import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  FileText,
  ScrollText,
  Folder,
  DollarSign,
  Landmark,
  Banknote,
  Home
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
  const router = useRouter()
  const [dias, setDias] = useState(30)
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
  const ultimaData = dadosFixos[dadosFixos.length - 1]?.data

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-neutral-800">
      {/* Menu lateral vertical com ícones */}
      <aside className="w-20 bg-white shadow-lg py-6 flex flex-col items-center space-y-6">
        <MenuIcon href="/painel" icon={<Home size={24} />} label="Início" active={router.pathname === '/painel'} />
        <MenuIcon href="/painel/notas" icon={<FileText size={24} />} label="Notas" active={router.pathname === '/painel/notas'} />
        <MenuIcon href="/painel/contratos" icon={<ScrollText size={24} />} label="Contratos" active={router.pathname === '/painel/contratos'} />
        <MenuIcon href="/painel/documentos" icon={<Folder size={24} />} label="Documentos" active={router.pathname === '/painel/documentos'} />
        <MenuIcon href="/painel/movimentacoes" icon={<DollarSign size={24} />} label="Movimentos" active={router.pathname === '/painel/movimentacoes'} />
        <MenuIcon href="/painel/boletos" icon={<Banknote size={24} />} label="Boletos" active={router.pathname === '/painel/boletos'} />
        <MenuIcon href="/painel/bancario" icon={<Landmark size={24} />} label="Bancário" active={router.pathname === '/painel/bancario'} />
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Olá, teste@cedente.com</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-4xl">
          <div className="bg-black rounded-xl p-6 shadow-md text-center text-white">
            <h2 className="text-sm font-medium mb-1">Notas Negociadas</h2>
            <p className="text-3xl font-bold">{totalNotas}</p>
          </div>
          <div className="bg-black rounded-xl p-6 shadow-md text-center text-white">
            <h2 className="text-sm font-medium mb-1">Volume Negociado</h2>
            <p className="text-3xl font-bold">
              R$ {totalValor.toLocaleString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Última data */}
        <p className="text-sm text-gray-500 mb-4 max-w-4xl">Última negociação: {ultimaData}</p>

        {/* Gráfico */}
        <div className="bg-white rounded-xl shadow-md p-4 max-w-4xl">
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

          <div className="overflow-x-auto">
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
        </div>
      </main>
    </div>
  )
}

// Componente de item de menu com ícone e label empilhados
function MenuIcon({
  href,
  icon,
  label,
  active,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active: boolean
}) {
  return (
    <Link href={href} className="flex flex-col items-center text-center group">
      <div className={`text-gray-600 group-hover:text-blue-600 ${active ? 'text-blue-600' : ''}`}>
        {icon}
      </div>
      <span className={`text-xs mt-1 ${active ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
        {label}
      </span>
    </Link>
  )
}
