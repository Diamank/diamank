import {
  DollarSign,
  FileText,
  Landmark,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useUser } from '@/contexts/UserContext'
import { supabase } from '@/lib/supabase'

export default function PainelPage() {
  const { user } = useUser()
  const [quantidadeNotas, setQuantidadeNotas] = useState(0)
  const [volumeNegociado, setVolumeNegociado] = useState(0)
  const [graficoData, setGraficoData] = useState([])
  const [diasFiltro, setDiasFiltro] = useState(30)
  const [ultimaNegociacao, setUltimaNegociacao] = useState<Date | null>(null)

  useEffect(() => {
    carregarDados()
  }, [user, diasFiltro])

  async function carregarDados() {
    if (!user) return

    const { data, error } = await supabase
      .from('notas_fiscais')
      .select('valor, data_emissao')
      .eq('user_id', user.id)
      .order('data_emissao', { ascending: true })

    if (error || !data) return

    setQuantidadeNotas(data.length)
    setVolumeNegociado(data.reduce((acc, cur) => acc + cur.valor, 0))

    if (data.length > 0) {
      const datasFiltradas = data.filter(item => {
        const dataEmissao = new Date(item.data_emissao)
        const dataLimite = new Date()
        dataLimite.setDate(dataLimite.getDate() - diasFiltro)
        return dataEmissao >= dataLimite
      })

      const agrupado = datasFiltradas.reduce((acc, nota) => {
        const dataFormatada = format(new Date(nota.data_emissao), 'dd/MM/yyyy')
        acc[dataFormatada] = (acc[dataFormatada] || 0) + nota.valor
        return acc
      }, {} as Record<string, number>)

      const arrayGrafico = Object.entries(agrupado).map(([data, valor]) => ({ data, valor }))
      setGraficoData(arrayGrafico)
      setUltimaNegociacao(new Date(data[data.length - 1].data_emissao))
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Olá, {user?.email}</h1>
        <button className="text-sm text-blue-600 hover:underline">Sair</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto mb-4">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <h3 className="text-sm opacity-70">Notas Negociadas</h3>
            <p className="text-3xl font-bold">{quantidadeNotas}</p>
          </div>
          <FileText className="w-8 h-8 opacity-40" />
        </div>

        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <h3 className="text-sm opacity-70">Volume Negociado</h3>
            <p className="text-3xl font-bold">R$ {volumeNegociado.toLocaleString('pt-BR')}</p>
          </div>
          <DollarSign className="w-8 h-8 opacity-40" />
        </div>
      </div>

      {ultimaNegociacao && (
        <p className="text-sm text-gray-600 mb-2 ml-2">
          Última negociação: {format(ultimaNegociacao, 'dd/MM/yyyy', { locale: ptBR })}
        </p>
      )}

      <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Volume Negociado (últimos {diasFiltro} dias)</h2>
          <div className="space-x-2">
            {[7, 15, 30].map(d => (
              <button
                key={d}
                onClick={() => setDiasFiltro(d)}
                className={`px-3 py-1 rounded-full text-sm ${diasFiltro === d ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                {d} dias
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={graficoData}>
            <XAxis dataKey="data" fontSize={12} tick={{ fill: '#888' }} />
            <YAxis fontSize={12} tick={{ fill: '#888' }} tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
            <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
