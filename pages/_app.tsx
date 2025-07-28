import "@/styles/globals.css";
import type { AppProps } from "next/app";
import PainelLayout from "@/components/PainelLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PainelLayout>
      <Component {...pageProps} />
    </PainelLayout>
  );
}
