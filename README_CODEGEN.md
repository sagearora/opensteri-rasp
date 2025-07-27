# GraphQL Code Generator Setup

This project uses GraphQL Code Generator to generate TypeScript types from your GraphQL schema and operations.

## Setup

1. **Environment Variables**: Create a `.env` file with the following variables:
   ```
   HASURA_GRAPHQL_URL=http://localhost:8080/v1/graphql
   HASURA_GRAPHQL_WS=ws://localhost:8080/v1/graphql
   HASURA_ADMIN_SECRET=your-admin-secret-here
   ```

2. **Generate Types**: Run the codegen to generate TypeScript types:
   ```bash
   npm run codegen
   ```

3. **Watch Mode**: For development, use watch mode to automatically regenerate types:
   ```bash
   npm run codegen:watch
   ```

## Usage

### Writing GraphQL Queries

Create `.graphql` files in your project (e.g., `src/queries/printer.graphql`):

```graphql
query GetPrinter($printerId: uuid!) {
  printer_by_pk(id: $printerId) {
    id
    clinic_id
    paired_at
    last_seen_at
  }
}
```

### Using Generated Types

Import the generated types in your TypeScript files:

```typescript
import { 
  GetPrinterDocument, 
  GetPrinterQuery, 
  GetPrinterQueryVariables 
} from '../__generated/graphql';

// Use the typed document
const result = await client.subscribe(
  { query: GetPrinterDocument, variables: { printerId: "123" } },
  {
    next: (data) => {
      // data is fully typed
      console.log(data.data?.printer_by_pk?.id);
    }
  }
);
```

### WebSocket Support

The generated types work seamlessly with your existing `graphql-ws` client. See `src/services/graphqlClientWithCodegen.ts` for examples of how to use the generated types with WebSocket subscriptions.

## Configuration

The codegen configuration is in `codegen.yml`. It generates:
- TypeScript types for all GraphQL operations
- Typed document nodes for queries, mutations, and subscriptions
- Support for WebSocket operations

## Generated Files

After running codegen, the following files will be generated:
- `src/__generated/graphql.ts` - Contains all generated types and document nodes 