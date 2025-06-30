export default function Movimentacoes() {
  const movimentacoes = [
    {
      nota: 'NF #123',
      valorNota: 3000.00,
      valorAntecipado: 2500.00,
      taxa: 16.7,
      ddl: 30,
      data: '25/06/2025'
    },
    {
      nota: 'NF #124',
      valorNota: 2000.00,
      valorAntecipado: 1800.00,
      taxa: 10.0,
      ddl: 20,
      data: '20/06/2025'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Movimentações Financeiras</h1>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Nota</th>
              <th className="p-2">Valor da Nota</th>
              <th className="p-2">Valor Antecipado</th>
              <th className="p-2">Taxa (%)</th>
              <th className="p-2">DDL</th>
              <th className="p-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((m, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{m.nota}</td>
                <td className="p-2">R$ {m.valorNota.toFixed(2).replace('.', ',')}</td>
                <td className="p-2 text-green-700 font-medium">R$ {m.valorAntecipado.toFixed(2).replace('.', ',')}</td>
                <td className="p-2">{m.taxa}%</td>
                <td className="p-2">{m.ddl} DDL</td>
                <td className="p-2">{m.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
