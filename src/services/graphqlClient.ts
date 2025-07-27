/**
 * GraphQL Client Service
 * 
 * This service manages GraphQL connections to the Hasura backend,
 * providing both WebSocket and HTTP clients for real-time and REST operations.
 * 
 * Supports authentication via Bearer tokens and automatic retry logic.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { GraphQLClient } from 'graphql-request';
import { createClient } from 'graphql-ws';
import WebSocket from 'ws';
import { getSdk } from '../__generated/graphql';

// Environment configuration
const HASURA_WS_URL = process.env.HASURA_GRAPHQL_WS;
const HASURA_GRAPHQL_URL = process.env.HASURA_GRAPHQL_URL;

// Validate required environment variables
if (!HASURA_WS_URL || !HASURA_GRAPHQL_URL) {
  throw new Error(
    'HASURA_GRAPHQL_WS and HASURA_GRAPHQL_URL environment variables must be set to your Hasura GraphQL endpoints.'
  );
}

/**
 * Interface for GraphQL client configuration
 */
export interface GraphQLClientConfig {
  wsClient: ReturnType<typeof createClient>;
  httpClient: ReturnType<typeof getSdk>;
}

/**
 * Get configured GraphQL clients for WebSocket and HTTP operations
 * 
 * This function creates both WebSocket and HTTP clients with the provided
 * authentication token. The WebSocket client is configured for real-time
 * subscriptions, while the HTTP client is used for REST operations.
 * 
 * @param token - The authentication token for API access
 * @returns Promise<GraphQLClientConfig> - Configured WebSocket and HTTP clients
 * @throws Error if client creation fails
 */
export const getClient = async (token: string): Promise<GraphQLClientConfig> => {
  try {
    const authorization = `Bearer ${token}`;
    
    // Create WebSocket client for real-time subscriptions
    const wsClient = createClient({
      url: HASURA_WS_URL,
      webSocketImpl: WebSocket,
      shouldRetry: () => true, // Enable automatic retry
      connectionParams: {
        headers: {
          Authorization: authorization,
        },
      },
    });

    // Create HTTP client for REST operations
    const httpClient = new GraphQLClient(HASURA_GRAPHQL_URL, {
      headers: {
        Authorization: authorization,
      },
    });

    // Return both clients with SDK wrapper
    return {
      wsClient,
      httpClient: getSdk(httpClient),
    };
  } catch (error) {
    console.error('Failed to create GraphQL clients:', error);
    throw new Error(`GraphQL client initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
