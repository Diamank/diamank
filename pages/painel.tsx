import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'

export default function Painel() {
  const [usuario, setUsuario] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const verificarSessao = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUsuario(user)
      }
    }
    verificarSessao()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!usuario) {
    return <p className="text-center mt-20 text-gray-600">Carregando painel...</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Olá, {usuario.email}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-100 rounded-xl p-4">
            <h2 className="text-sm text-gray-600">Saldo Disponível</h2>
            <p className="text-2xl font-bold text-blue-800">R$ 0,00</p>
          </div>
          <div className="bg-green-100 rounded-xl p-4">
            <h2 className="text-sm text-gray-600">Limite Contratado</h2>
            <p className="text-2xl font-bold text-green-800">R$ 0,00</p>
          </div>
          <div className="bg-yellow-100 rounded-xl p-4">
            <h2 className="text-sm text-gray-600">Notas Cadastradas</h2>
            <p className="text-2xl font-bold text-yellow-800">0</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm">
          Essa é a versão inicial do seu painel de cedente. Em breve você poderá:
        </p>
        <ul className="list-disc pl-6 text-sm text-gray-700 mt-2">
          <li>Enviar notas fiscais para antecipação</li>
          <li>Acompanhar contratos e documentos</li>
          <li>Visualizar movimentações financeiras</li>
        </ul>
      </div>
    </div>
  )
}
