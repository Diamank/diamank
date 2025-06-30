import { useState } from 'react'

export default function Contratos() {
  const [contratoAssinado, setContratoAssinado] = useState<boolean>(true)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Contrato de Cessão</h1>

        {contratoAssinado ? (
          <div className="space-y-4">
            <p className="text-gray-700">
              Seu contrato está <strong className="text-green-600">assinado</strong> e ativo.
            </p>
            <a
              href="https://meu-bucket.supabase.co/storage/v1/object/public/contratos/exemplo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              📄 Baixar Contrato PDF
            </a>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p><strong>Limite aprovado:</strong> R$ 50.000,00</p>
              <p><strong>Data de início:</strong> 01/06/2025</p>
              <p><strong>Status:</strong> Ativo</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-yellow-700 font-medium">Você ainda não assinou seu contrato.</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              ✍️ Assinar Contrato
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
