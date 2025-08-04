import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Nota {
  sacado: string;
  valor: number;
  vencimento: string;
  status: string;
}

export default function Notas() {
  const [xml, setXml] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [xmlPreview, setXmlPreview] = useState<any>(null);
  const [manualInputs, setManualInputs] = useState({
    destinatario: "",
    valor: "",
    vencimento: "",
  });
  const [notas, setNotas] = useState<Nota[]>([]);

  const handleXmlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setXml(file);

    const reader = new FileReader();
    reader.onload = () => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(reader.result as string, "text/xml");

      const emit = xmlDoc.getElementsByTagName("emit")[0];
      const dest = xmlDoc.getElementsByTagName("dest")[0];
      const total = xmlDoc.getElementsByTagName("vNF")[0];
      const venc = xmlDoc.getElementsByTagName("venc")[0];
      const numero = xmlDoc.getElementsByTagName("nNF")[0];
      const chave = xmlDoc.getElementsByTagName("infNFe")[0]?.getAttribute("Id")?.slice(3);

      setXmlPreview({
        emitente: emit?.getElementsByTagName("xNome")[0]?.textContent,
        destinatario: dest?.getElementsByTagName("xNome")[0]?.textContent,
        cnpj: dest?.getElementsByTagName("CNPJ")[0]?.textContent,
        valor: total?.textContent,
        vencimento: venc?.getElementsByTagName("venc")[0]?.textContent,
        numero: numero?.textContent,
        chave,
      });
    };
    reader.readAsText(file);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pdf) {
      toast.error("Você deve enviar o PDF da nota.");
      return;
    }

    let novaNota: Nota;

    if (xml && xmlPreview) {
      const valor = Number(xmlPreview.valor);
      const venc = xmlPreview.vencimento || manualInputs.vencimento;
      novaNota = {
        sacado: xmlPreview.destinatario,
        valor,
        vencimento: formatarData(venc),
        status: "Em análise",
      };
    } else {
      if (!manualInputs.destinatario || !manualInputs.valor || !manualInputs.vencimento) {
        toast.error("Preencha todos os campos manuais.");
        return;
      }

      novaNota = {
        sacado: manualInputs.destinatario,
        valor: Number(manualInputs.valor.replace(/\D/g, "")) / 100,
        vencimento: formatarData(manualInputs.vencimento),
        status: "Em análise",
      };
    }

    setNotas((prev) => [...prev, novaNota]);
    setXml(null);
    setPdf(null);
    setXmlPreview(null);
    setManualInputs({ destinatario: "", valor: "", vencimento: "" });
    toast.success("Nota enviada com sucesso!");
  };

  const formatarData = (data: string) => {
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />
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
              required
            />
          </div>

          {xmlPreview && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 space-y-2">
              <p><strong>Emitente:</strong> {xmlPreview.emitente}</p>
              <p><strong>Destinatário:</strong> {xmlPreview.destinatario}</p>
              <p><strong>CNPJ:</strong> {xmlPreview.cnpj}</p>
              <p><strong>Nota Nº:</strong> {xmlPreview.numero}</p>
              <p><strong>Valor:</strong> R$ {Number(xmlPreview.valor).toFixed(2)}</p>

              {xmlPreview.vencimento ? (
                <p><strong>Vencimento:</strong> {formatarData(xmlPreview.vencimento)}</p>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vencimento</label>
                  <input
                    type="date"
                    onChange={(e) =>
                      setXmlPreview((prev: any) => ({ ...prev, vencimento: e.target.value }))
                    }
                    className="border rounded-lg px-3 py-2 w-full"
                    required
                  />
                </div>
              )}

              <p><strong>Chave:</strong> {xmlPreview.chave}</p>
            </div>
          )}

          {!xml && (
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destinatário</label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 w-full"
                  value={manualInputs.destinatario}
                  onChange={(e) =>
                    setManualInputs({ ...manualInputs, destinatario: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 w-full"
                  placeholder="R$ 0,00"
                  value={manualInputs.valor}
                  onChange={(e) =>
                    setManualInputs({
                      ...manualInputs,
                      valor: e.target.value.replace(/[^0-9,]/g, ""),
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vencimento</label>
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2 w-full"
                  value={manualInputs.vencimento}
                  onChange={(e) =>
                    setManualInputs({ ...manualInputs, vencimento: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
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
              {notas.map((nota, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{nota.sacado}</td>
                  <td className="p-2">R$ {nota.valor.toFixed(2)}</td>
                  <td className="p-2">{nota.vencimento}</td>
                  <td className="p-2 text-yellow-600 font-semibold">{nota.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
