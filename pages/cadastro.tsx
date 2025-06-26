'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

export default function Cadastro() {
  const router = useRouter()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [telefone, setTelefone] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()

    if (!nome || !email || !senha || !cnpj) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    setCarregando(true)

    const resposta = await fetch('/api/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, cnpj, telefone })
    })

    const resultado = await resposta.json()

    if (!resposta.ok) {
      toast.error('Erro: ' + resultado.erro)
    } else {
      toast.success('Cadastro realizado com sucesso!')
      router.push('/login')
    }

    setCarregando(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Cedente</h1>
        <form onSubmit={handleCadastro} className="space-y-4">
          <input
            type="text"
            placeholder="Nome completo"
            className="w-full px-4 py-2 border rounded-lg"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-2 border rounded-lg"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <input
            type="text"
            placeholder="CNPJ"
            className="w-full px-4 py-2 border rounded-lg"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Telefone (opcional)"
            className="w-full px-4 py-2 border rounded-lg"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
