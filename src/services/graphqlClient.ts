import { createClient } from 'graphql-ws';
import { loadToken } from './graphqlTokenStore';

const HASURA_WS_URL = process.env.HASURA_GRAPHQL_WS;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET; // or use JWT

if (!HASURA_WS_URL) {
  throw new Error('HASURA_GRAPHQL_WS environment variable must be set to your Hasura GraphQL WebSocket endpoint.');
}


async function getAuthHeader() {
  // Prefer locally saved token, fallback to admin secret
  const stored = await loadToken();
  if (stored && stored.token) return `Bearer ${stored.token}`;
  if (HASURA_ADMIN_SECRET) return `Bearer ${HASURA_ADMIN_SECRET}`;
  return undefined;
}

export const client = createClient({
  url: HASURA_WS_URL,
  connectionParams: async () => ({
    headers: {
      'Authorization': await getAuthHeader(),
    },
  }),
}); 