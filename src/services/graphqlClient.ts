import { GraphQLClient } from 'graphql-request';
import { createClient } from 'graphql-ws';
import WebSocket from 'ws'; // 👈 required in Node
import { getSdk } from '../__generated/graphql';

const HASURA_WS_URL = process.env.HASURA_GRAPHQL_WS;
const HASURA_GRAPHQL_URL = process.env.HASURA_GRAPHQL_URL;

if (!HASURA_WS_URL || !HASURA_GRAPHQL_URL) {
  throw new Error('HASURA_GRAPHQL_WS && HASURA_GRAPHQL_URL environment variable must be set to your Hasura GraphQL WebSocket endpoint.');
}

export const getClient = async (token: string) => {
  const authorization = `Bearer ${token}`;
  const wsClient = createClient({
    url: HASURA_WS_URL,
    webSocketImpl: WebSocket,
    shouldRetry: () => true,
    connectionParams: {
      headers: {
        Authorization: authorization,
      },
    },
  });
  const httpClient = new GraphQLClient(HASURA_GRAPHQL_URL, {
    headers: {
      Authorization: authorization,
    },
  });

  return {
    wsClient,
    httpClient: getSdk(httpClient),
  }
}
