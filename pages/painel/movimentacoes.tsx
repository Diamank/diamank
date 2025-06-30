export default function Movimentacoes() {
  const movimentacoes = [
    {
      tipo: 'crédito',
      descricao: 'Antecipação de nota fiscal #123',
      valor: 2500.00,
      data: '25/06/2025'
    },
    {
      tipo: 'débito',
      descricao: 'Tarifa operacional',
      valor: -150.00,
      data: '25/06/2025'
    },
    {
      tipo: 'crédito',
      descricao: 'Antecipação de nota fiscal #124',
      valor: 1800.00,
      data: '20/06/2025'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Movimentações Financeiras</h1>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Data</th>
              <th className="p-2 text-left">Descrição</th>
              <th className="p-2 text-left">Valor</th>
              <th className="p-2 text-left">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((m, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{m.data}</td>
                <td className="p-2">{m.descricao}</td>
                <td className={`p-2 font-medium ${m.valor >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  R$ {Math.abs(m.valor).toFixed(2).replace('.', ',')}
                </td>
                <td className="p-2 capitalize">{m.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
