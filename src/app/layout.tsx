'use client';
import "./globals.css";
import { HeadScripts } from "@/components/HeadScripts";
import StyledComponentsRegistry from "@/utils/StyledComponentsRegistry";
import useInitGoogleAnalytics from "@/hooks/useInitGoogleAnalytics";
import useInitLogin from "@/hooks/useInitLogin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useInitGoogleAnalytics();
  useInitLogin();

  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>라이트메이트(write mate) - 웹소설 창작자를 위한 클라우드 기반 창작 플랫폼</title>
        <meta property="og:title" content="라이트메이트(write mate) - 웹소설 창작자를 위한 클라우드 기반 창작 플랫폼" />
        <meta property="og:url" content="www.write-mate.net" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.write-mate.net/opengraph.png" />
        <meta property="og:description"
          content="클라우드 기반 아이디어 보관함, 쉽고 빠른 인물 관계도 구축, 제출용 시놉시스 출력까지. 작가님을 위한 모든 기능이 준비되어 있습니다."
        />
        <HeadScripts />
      </head>
      <body>
        <StyledComponentsRegistry>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
