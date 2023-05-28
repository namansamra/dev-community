import { useQuery, QueryClientConfig } from "react-query";
import { useRouter } from "next/router";

export async function fetchSession() {
  const res = await fetch("/api/auth/session");
  const session = await res.json();

  localStorage.setItem(
    "sessionInfo",
    //@ts-ignore
    Object.keys(session).length ? JSON.stringify(session) : null
  );
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

export function useSessionCustom({
  required = false,
  redirectTo = "/api/auth/signin?error=SessionExpired",
  queryConfig = {
    staleTime: 60 * 1000 * 60 * 3, // 3 hours
    refetchInterval: 60 * 1000 * 10, // 10 minutes
    cacheTime: 60 * 1000 * 10,
  },
} = {}) {
  const router = useRouter();
  const query = useQuery(["session"], fetchSession, {
    ...queryConfig,
    onSettled(data, error) {
      if ((queryConfig as any).onSettled) {
        (queryConfig as any).onSettled(data, error);
      }
      if (data || !required) return;
      router.push(redirectTo);
    },
  });
  return { session: query.data, status: query.status };
}
