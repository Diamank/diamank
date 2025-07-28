import { ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function PainelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-50">{children}</main>
    </div>
  );
}
