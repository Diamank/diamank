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
