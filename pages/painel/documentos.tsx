import { useState } from 'react'

export default function Documentos() {
  const [regime, setRegime] = useState<'simples' | 'presumido' | ''>('')
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
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">Envio de Documentos</h1>

        <form onSubmit={handleUpload} className="space-y-4">
          {/* Documentos básicos */}
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

          {/* Regime Tributário */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Regime Tributário</label>
            <select
              value={regime}
              onChange={(e) => setRegime(e.target.value as 'simples' | 'presumido' | '')}
              required
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Selecione</option>
              <option value="simples">Simples Nacional</option>
              <option value="presumido">Lucro Presumido ou Real</option>
            </select>
          </div>

          {/* Regime Simples Nacional */}
          {regime === 'simples' && (
            <>
              <h2 className="text-md font-semibold mt-6 text-gray-700">PGDAS-D e DAS (últimos 3 meses)</h2>
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">PGDAS-D Mês {i}</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleChange(`pgdas_${i}`, e.target.files?.[0] || null)}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Comprovante DAS Mês {i}</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleChange(`das_${i}`, e.target.files?.[0] || null)}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Regime Presumido / Real */}
          {regime === 'presumido' && (
            <>
              <h2 className="text-md font-semibold mt-6 text-gray-700">EFD-Contribuições e DARF (últimos 3 meses)</h2>
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">EFD Mês {i}</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleChange(`efd_${i}`, e.target.files?.[0] || null)}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Comprovante DARF Mês {i}</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleChange(`darf_${i}`, e.target.files?.[0] || null)}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                </div>
              ))}
            </>
          )}

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
