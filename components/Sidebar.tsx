import Link from "next/link";
import { useRouter } from "next/router";
import {
  Home,
  FileText,
  Folder,
  File,
  DollarSign,
  CreditCard,
  Banknote
} from "lucide-react";

const menu = [
  { href: "/painel", label: "Início", icon: <Home size={20} /> },
  { href: "/painel/notas", label: "Notas", icon: <FileText size={20} /> },
  { href: "/painel/contratos", label: "Contratos", icon: <Folder size={20} /> },
  { href: "/painel/documentos", label: "Documentos", icon: <File size={20} /> },
  { href: "/painel/movimentacoes", label: "Movimentos", icon: <DollarSign size={20} /> },
  { href: "/painel/boletos", label: "Boletos", icon: <CreditCard size={20} /> },
  { href: "/painel/banco", label: "Bancário", icon: <Banknote size={20} /> }
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm fixed top-0 left-0 overflow-y-auto">
      <div className="p-6 font-bold text-xl">Securitizadora</div>
      <nav className="flex flex-col space-y-1 px-4 pb-6">
        {menu.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                router.pathname === item.href ? "text-blue-600 font-semibold" : "text-gray-800"
              }`}
            >
              {item.icon}
              {item.label}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
