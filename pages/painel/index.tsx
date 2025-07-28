// ✅ pages/painel/index.tsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FileText, CheckCircle } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PainelHome() {
  const [notas, setNotas] = useState(0);
  const [volume, setVolume] = useState(0);
  const [dadosGrafico, setDadosGrafico] = useState<any[]>([]);
  const [dias, setDias] = useState(7);

  useEffect(() => {
    carregarResumo();
    carregarGrafico(dias);
  }, [dias]);

  const carregarResumo = async () => {
    const { data } = await supabase
      .from("notas")
      .select("valor, created_at");

    if (data) {
      setNotas(data.length);
      setVolume(data.reduce((acc, n) => acc + n.valor, 0));
    }
  };

  const carregarGrafico = async (dias: number) => {
    const hoje = new Date();
    const inicio = new Date();
    inicio.setDate(hoje.getDate() - dias + 1);

    const { data } = await supabase
      .from("notas")
      .select("valor, created_at")
      .gte("created_at", inicio.toISOString());

    const agrupado: { [key: string]: number } = {};

    for (let i = 0; i < dias; i++) {
      const d = new Date();
      d.setDate(hoje.getDate() - i);
      const key = d.toISOString().split("T")[0];
      agrupado[key] = 0;
    }

    data?.forEach((nota) => {
      const dataStr = nota.created_at.split("T")[0];
      if (agrupado[dataStr] !== undefined) {
        agrupado[dataStr] += nota.valor;
      }
    });

    const formatado = Object.keys(agrupado)
      .sort()
      .map((k) => ({
        data: k.split("-").reverse().join("/"),
        valor: agrupado[k],
      }));

    setDadosGrafico(formatado);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Olá, teste@cedente.com</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <FileText className="text-blue-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Disponível</p>
              <p className="text-xs text-gray-400">Valor total</p>
            </div>
          </div>
          <p className="text-2xl font-bold mt-4">R$ {volume.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
          <p className="text-sm text-gray-400 mt-1">{notas} Notas fiscais</p>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <CheckCircle className="text-green-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Negociado</p>
              <p className="text-xs text-gray-400">Valor total</p>
            </div>
          </div>
          <p className="text-2xl font-bold mt-4">R$ {(volume * 6.72).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
          <p className="text-sm text-gray-400 mt-1">{notas * 10} Notas fiscais</p>
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-1">
        Última negociação: {new Date().toLocaleDateString()}
      </div>

      <div className="bg-white shadow rounded-lg p-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">
            Volume Negociado (últimos {dias} dias)
          </h3>
          <div className="flex gap-2">
            {[7, 15, 30].map((d) => (
              <button
                key={d}
                onClick={() => setDias(d)}
                className={`px-3 py-1 rounded-full text-sm ${
                  dias === d ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {d} dias
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dadosGrafico}>
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip
              formatter={(v: any) => `R$ ${v.toLocaleString("pt-BR")}`}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="#3b82f6"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
