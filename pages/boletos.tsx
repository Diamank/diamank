// pages/painel/boletos.tsx
import Link from 'next/link'

export default function Boletos() {
  const boletos = [
    {
      id: 'BLT-001',
      nota: 'NF-4587',
      valor: 4200,
      emissao: '2025-06-25',
      vencimento: '2025-07-10',
      url: '/boleto-exemplo.pdf'
    },
    {
      id: 'BLT-002',
      nota: 'NF-4588',
      valor: 7800,
      emissao: '2025-06-26',
      vencimento: '2025-07-12',
      url: '/boleto-exemplo.pdf'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Boletos Gerados</h1>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">#</th>
              <th className="p-2">Nota Fiscal</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Emissão</th>
              <th className="p-2">Vencimento</th>
              <th className="p-2">Visualizar</th>
            </tr>
          </thead>
          <tbody>
            {boletos.map((boleto) => (
              <tr key={boleto.id} className="border-t">
                <td className="p-2">{boleto.id}</td>
                <td className="p-2">{boleto.nota}</td>
                <td className="p-2">R$ {boleto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="p-2">{boleto.emissao}</td>
                <td className="p-2">{boleto.vencimento}</td>
                <td className="p-2">
                  <Link href={boleto.url} target="_blank" className="text-blue-600 hover:underline">
                    Abrir PDF
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
