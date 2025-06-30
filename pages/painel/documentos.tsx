import { useState } from 'react'

export default function Documentos() {
  const [arquivos, setArquivos] = useState<Record<string, File | null>>({
    rg: null,
    comprovante: null,
    contratoSocial: null
  })

  const handleChange = (tipo: string, file: File | null) => {
    setArquivos(prev => ({ ...prev, [tipo]: file }))
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Upload simulado – aqui enviaremos os documentos para o Supabase Storage.')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">Envio de Documentos</h1>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">RG / CNH (PDF ou imagem)</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => handleChange('rg', e.target.files?.[0] || null)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Comprovante Bancário</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => handleChange('comprovante', e.target.files?.[0] || null)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Contrato Social (se CNPJ)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleChange('contratoSocial', e.target.files?.[0] || null)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Enviar Documentos
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Após o envio, os documentos serão analisados pela equipe da securitizadora.
        </p>
      </div>
    </div>
  )
}
