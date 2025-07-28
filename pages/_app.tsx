// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />);
}
