import "@/styles/globals.css";
import type { AppProps } from "next/app";
import PainelLayout from "@/components/PainelLayout";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PainelLayout>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </PainelLayout>
  );
}
