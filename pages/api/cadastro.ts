import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/utils/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' })
  }

  const { nome, email, senha, cnpj, telefone } = req.body

  if (!nome || !email || !senha || !cnpj) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes' })
  }

  // Cria o usuário no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: { nome, cnpj, telefone, tipo: 'cedente' }
    }
  })

  if (authError) {
    return res.status(400).json({ erro: authError.message })
  }

  return res.status(200).json({ mensagem: 'Cadastro realizado com sucesso', usuario: authData.user })
}
