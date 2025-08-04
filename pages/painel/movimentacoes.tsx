import { useState } from "react";
import { FaFilePdf, FaChevronDown, FaChevronUp } from "react-icons/fa";

type Movimentacao = {
  nota: string;
  valorNota: number;
  valorAntecipado: number;
  taxa: number;
  ddl: number;
  data: string;
  arquivos: {
    boleto: string;
    notaFiscal: string;
    contrato: string;
    bordero: string;
  };
};

type ColunaOrdenavel = keyof Pick<
  Movimentacao,
  "nota" | "valorNota" | "valorAntecipado" | "taxa" | "ddl" | "data"
>;

export default function Movimentacoes() {
  const movimentacoesOriginais: Movimentacao[] = [
    {
      nota: "NF #123",
      valorNota: 3000,
      valorAntecipado: 2500,
      taxa: 16.7,
      ddl: 30,
      data: "2025-06-25",
      arquivos: {
        boleto: "/arquivos/nf123-boleto.pdf",
        notaFiscal: "/arquivos/nf123-nota-fiscal.pdf",
        contrato: "/arquivos/nf123-contrato.pdf",
        bordero: "/arquivos/nf123-bordero.pdf",
      },
    },
    {
      nota: "NF #124",
      valorNota: 2000,
      valorAntecipado: 1800,
      taxa: 10,
      ddl: 20,
      data: "2025-06-20",
      arquivos: {
        boleto: "/arquivos/nf124-boleto.pdf",
        notaFiscal: "/arquivos/nf124-nota-fiscal.pdf",
        contrato: "/arquivos/nf124-contrato.pdf",
        bordero: "/arquivos/nf124-bordero.pdf",
      },
    },
  ];

  const [aberta, setAberta] = useState<number | null>(null);
  const [filtroNota, setFiltroNota] = useState("");
  const [dataMin, setDataMin] = useState("");
  const [dataMax, setDataMax] = useState("");
  const [colunaOrdenada, setColunaOrdenada] = useState<ColunaOrdenavel | null>(null);
  const [ordemAsc, setOrdemAsc] = useState(true);

  const ordenar = (dados: Movimentacao[]) => {
    if (!colunaOrdenada) return dados;
    return [...dados].sort((a, b) => {
      const valorA = a[colunaOrdenada]!;
      const valorB = b[colunaOrdenada]!;

      if (colunaOrdenada === "data") {
        const dateA = new Date(valorA);
        const dateB = new Date(valorB);
        return ordemAsc ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }

      if (typeof valorA === "number" && typeof valorB === "number") {
        return ordemAsc ? valorA - valorB : valorB - valorA;
      }

      return ordemAsc
        ? String(valorA).localeCompare(String(valorB))
        : String(valorB).localeCompare(String(valorA));
    });
  };

  const movimentacoesFiltradas = ordenar(
    movimentacoesOriginais.filter((m) => {
      const matchNota = m.nota.toLowerCase().includes(filtroNota.toLowerCase());
      const matchDataMin = !dataMin || m.data >= dataMin;
      const matchDataMax = !dataMax || m.data <= dataMax;
      return matchNota && matchDataMin && matchDataMax;
    })
  );

  const handleOrdenar = (coluna: ColunaOrdenavel) => {
    if (coluna === colunaOrdenada) {
      setOrdemAsc(!ordemAsc);
    } else {
      setColunaOrdenada(coluna);
      setOrdemAsc(true);
    }
  };

  const seta = (coluna: ColunaOrdenavel) =>
    colunaOrdenada === coluna ? (ordemAsc ? "↑" : "↓") : "";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Movimentações Financeiras</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Filtrar por nota..."
            value={filtroNota}
            onChange={(e) => setFiltroNota(e.target.value)}
            className="border rounded-md px-3 py-2 w-full sm:w-1/3"
          />
          <input
            type="date"
            value={dataMin}
            onChange={(e) => setDataMin(e.target.value)}
            className="border rounded-md px-3 py-2 w-full sm:w-1/3"
          />
          <input
            type="date"
            value={dataMax}
            onChange={(e) => setDataMax(e.target.value)}
            className="border rounded-md px-3 py-2 w-full sm:w-1/3"
          />
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left cursor-pointer">
              <th className="p-2" onClick={() => handleOrdenar("nota")}>Nota {seta("nota")}</th>
              <th className="p-2" onClick={() => handleOrdenar("valorNota")}>Valor da Nota {seta("valorNota")}</th>
              <th className="p-2" onClick={() => handleOrdenar("valorAntecipado")}>Valor Antecipado {seta("valorAntecipado")}</th>
              <th className="p-2" onClick={() => handleOrdenar("taxa")}>Taxa (%) {seta("taxa")}</th>
              <th className="p-2" onClick={() => handleOrdenar("ddl")}>DDL {seta("ddl")}</th>
              <th className="p-2" onClick={() => handleOrdenar("data")}>Data {seta("data")}</th>
              <th className="p-2">Ver</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoesFiltradas.map((m, idx) => (
              <>
                <tr key={idx} className="border-t hover:bg-gray-50 transition">
                  <td className="p-2">{m.nota}</td>
                  <td className="p-2">R$ {m.valorNota.toFixed(2).replace(".", ",")}</td>
                  <td className="p-2 text-green-700 font-medium">R$ {m.valorAntecipado.toFixed(2).replace(".", ",")}</td>
                  <td className="p-2">{m.taxa}%</td>
                  <td className="p-2">{m.ddl} DDL</td>
                  <td className="p-2">{new Date(m.data).toLocaleDateString("pt-BR")}</td>
                  <td className="p-2 cursor-pointer" onClick={() => setAberta(aberta === idx ? null : idx)}>
                    {aberta === idx ? <FaChevronUp /> : <FaChevronDown />}
                  </td>
                </tr>

                {aberta === idx && (
                  <tr className="bg-gray-50 border-t">
                    <td colSpan={7} className="p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ArquivoLink nome="Boleto" url={m.arquivos.boleto} />
                        <ArquivoLink nome="Nota Fiscal" url={m.arquivos.notaFiscal} />
                        <ArquivoLink nome="Contrato Aditivo" url={m.arquivos.contrato} />
                        <ArquivoLink nome="Borderô" url={m.arquivos.bordero} />
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ArquivoLink({ nome, url }: { nome: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      className="flex items-center gap-2 text-blue-600 hover:underline"
      rel="noreferrer"
    >
      <FaFilePdf className="text-red-600" />
      {nome}
    </a>
  );
}
