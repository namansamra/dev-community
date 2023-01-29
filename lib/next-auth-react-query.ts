import { useQuery, QueryClientConfig } from 'react-query';
import { useRouter } from 'next/router';

export async function fetchSession() {
  const res = await fetch('/api/auth/session');
  const session = await res.json();
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

export function useSessionCustom({
  required = false,
  redirectTo = '/api/auth/signin?error=SessionExpired',
  queryConfig = {},
} = {}) {
  const router = useRouter();
  const query = useQuery(['session'], fetchSession, {
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
