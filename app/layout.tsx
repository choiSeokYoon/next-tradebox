import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "config/MaterialTailwindThemeProvider";
import MainLayout from "components/auth/layouts/main-layout";
import Auth from "components/auth";
import ReocilProvider from "config/ReocilPorvider";
import ReactQueryClientProvider from "config/ReactQueryClientPorvider";
import { createServerSupabaseClient } from "utils/supabase/server";
import AuthProvider from "config/AuthProvider";
import ToasterProvider from "config/ToastProvider";




const jua = Jua({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "TradeBox",
  description: "TradeBox 다양한 상품과 서비스를 손쉽게 교환할 수 있는 온라인 거래 플랫폼입니다.",
};

export default async function RootLayout({ children }) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <ReocilProvider>
      <ReactQueryClientProvider>
        <ThemeProvider>
          <html lang="en">
            <head>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
                integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </head>
            <AuthProvider accessToken={session?.access_token}>
              <body className={jua.className}>
              <ToasterProvider>
                {session?.user ? <MainLayout>{children}</MainLayout> : <Auth />}
                </ToasterProvider>
              </body>
            </AuthProvider>
          </html>
        </ThemeProvider>
      </ReactQueryClientProvider>
    </ReocilProvider>
  );
}
