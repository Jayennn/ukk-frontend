import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GeistSans } from 'geist/font/sans';
import {type ReactElement, type ReactNode} from "react";
import {NextPage} from "next";
import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {trpc} from "@/utils/trpc"
import {Toaster} from "sonner";
import {Provider} from "jotai";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout
}

function MyApp({
  Component,
  pageProps: {session, ...pageProps}
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <SessionProvider session={session}>
      <main className={`${GeistSans.className} ${GeistSans.variable}`}>
        <Provider>
          {getLayout(
            <Component {...pageProps} />
          )}
        </Provider>
        <Toaster richColors position="top-right"/>
      </main>
    </SessionProvider>
  )
}


export default trpc.withTRPC(MyApp);
