// pages/painel/banco.tsx
import { useState } from 'react'

export default function Banco() {
  const [form, setForm] = useState({
    banco: '',
    agencia: '',
    conta: '',
    tipo: 'corrente',
    cpfCnpj: '',
    titular: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Dados bancários enviados (integração com Supabase será feita aqui).')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Dados Bancários</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Banco</label>
            <input type="text" name="banco" onChange={handleChange} value={form.banco} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Agência</label>
            <input type="text" name="agencia" onChange={handleChange} value={form.agencia} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Conta</label>
            <input type="text" name="conta" onChange={handleChange} value={form.conta} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Tipo de Conta</label>
            <select name="tipo" onChange={handleChange} value={form.tipo} className="w-full border rounded-lg px-3 py-2">
              <option value="corrente">Corrente</option>
              <option value="poupanca">Poupança</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">CPF/CNPJ do Titular</label>
            <input type="text" name="cpfCnpj" onChange={handleChange} value={form.cpfCnpj} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Nome do Titular</label>
            <input type="text" name="titular" onChange={handleChange} value={form.titular} className="w-full border rounded-lg px-3 py-2" required />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Salvar Dados
          </button>
        </form>
      </div>
    </div>
  )
}
