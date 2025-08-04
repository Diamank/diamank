import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function Notas() {
  const [xml, setXml] = useState<File | null>(null)
  const [pdf, setPdf] = useState<File | null>(null)
  const [xmlPreview, setXmlPreview] = useState<any>(null)
  const [formData, setFormData] = useState<any>({ destinatario: '', valor: '', vencimento: '' })
  const [notas, setNotas] = useState<any[]>([])

  const handleXmlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setXml(file)

    const reader = new FileReader()
    reader.onload = () => {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(reader.result as string, 'text/xml')

      const emit = xmlDoc.getElementsByTagName("emit")[0]
      const dest = xmlDoc.getElementsByTagName("dest")[0]
      const total = xmlDoc.getElementsByTagName("vNF")[0]
      const venc = xmlDoc.getElementsByTagName("venc")[0]
      const numero = xmlDoc.getElementsByTagName("nNF")[0]
      const chave = xmlDoc.getElementsByTagName("infNFe")[0]?.getAttribute("Id")?.slice(3)

      const preview = {
        emitente: emit?.getElementsByTagName("xNome")[0]?.textContent,
        destinatario: dest?.getElementsByTagName("xNome")[0]?.textContent,
        cnpj: dest?.getElementsByTagName("CNPJ")[0]?.textContent,
        valor: total?.textContent,
        vencimento: venc?.textContent,
        numero: numero?.textContent,
        chave
      }

      setXmlPreview(preview)
      if (!venc) {
        setFormData((prev: any) => ({ ...prev, vencimento: '' }))
      }
    }
    reader.readAsText(file)
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()

    const nota = {
      sacado: xmlPreview?.destinatario || formData.destinatario,
      valor: xmlPreview?.valor || formData.valor,
      vencimento: xmlPreview?.vencimento || formData.vencimento,
      status: 'Pendente'
    }

    setNotas((prev) => [...prev, nota])
    toast.success('Nota enviada com sucesso!')

    setXml(null)
    setPdf(null)
    setXmlPreview(null)
    setFormData({ destinatario: '', valor: '', vencimento: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Notas Fiscais</h1>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">XML da Nota</label>
            <input
              type="file"
              accept=".xml"
              onChange={handleXmlChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">PDF da Nota</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdf(e.target.files?.[0] || null)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {!xml && pdf && (
            <>
              <input
                type="text"
                placeholder="Destinatário"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.destinatario}
                onChange={(e) => setFormData({ ...formData, destinatario: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Valor"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                required
              />
              <input
                type="date"
                placeholder="Vencimento"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.vencimento}
                onChange={(e) => setFormData({ ...formData, vencimento: e.target.value })}
                required
              />
            </>
          )}

          {xmlPreview && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800">
              <p><strong>Emitente:</strong> {xmlPreview.emitente}</p>
              <p><strong>Destinatário:</strong> {xmlPreview.destinatario}</p>
              <p><strong>CNPJ:</strong> {xmlPreview.cnpj}</p>
              <p><strong>Nota Nº:</strong> {xmlPreview.numero}</p>
              <p><strong>Valor:</strong> R$ {Number(xmlPreview.valor).toFixed(2)}</p>
              <p><strong>Vencimento:</strong> {xmlPreview.vencimento || (
                <input
                  type="date"
                  className="border rounded px-2 py-1"
                  value={formData.vencimento}
                  onChange={(e) => setFormData({ ...formData, vencimento: e.target.value })}
                  required
                />
              )}</p>
              <p><strong>Chave:</strong> {xmlPreview.chave}</p>
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            disabled={!pdf && !xml}
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
              {notas.map((n, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{n.sacado}</td>
                  <td className="p-2">R$ {Number(n.valor).toFixed(2)}</td>
                  <td className="p-2">{n.vencimento}</td>
                  <td className="p-2 text-yellow-600 font-semibold">{n.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
