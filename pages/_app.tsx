import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import chakraTheme from "../styles/chakraTheme";
import { useSessionCustom } from "@/lib/next-auth-react-query";
import { ReactNode } from "react";
import type { NextComponentType } from "next";
import { ReactQueryDevtools } from "react-query/devtools";
import HashLoader from "react-spinners/HashLoader";

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

export default function App({ Component, pageProps }: CustomAppProps) {
  const emotionCache = createCache({
    key: "emotion-css-cache",
    prepend: true, // ensures styles are prepended to the <head>, instead of appended
  });

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        cacheTime: 60 * 1000 * 10,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={chakraTheme}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}

function Auth({ children }: { children: ReactNode }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { session, status } = useSessionCustom({ required: true });
  if (status === "loading") {
    return (
      <div className=" w-screen h-screen flex justify-center items-center p-5">
        <HashLoader color="#3B49DF" />
      </div>
    );
  }

  return <>{children}</>;
}
