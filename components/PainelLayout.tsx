// components/PainelLayout.tsx
import { ReactNode } from "react";
import Sidebar from "./Sidebar"; // supondo que seu menu esteja aqui

export default function PainelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
