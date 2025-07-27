import { client } from './graphqlClient';
import { loadToken } from './graphqlTokenStore';
import fetch from 'node-fetch';

// Heartbeat: update last_seen_at every HEARTBEAT_INTERVAL_SECONDS
const HEARTBEAT_INTERVAL_SECONDS = parseInt(process.env.HEARTBEAT_INTERVAL_SECONDS || '60', 10);
let heartbeatInterval: NodeJS.Timeout | null = null;

async function updatePrinterLastSeen(printerId: string) {
  const mutation = `
    mutation updatePrinterLastSeen($printerId: uuid!) {
      update_printer_by_pk(pk_columns: {id: $printerId}, _set: {last_seen_at: "now()"}) {
        id
        last_seen_at
      }
    }
  `;
  try {
    await client.subscribe(
      { query: mutation, variables: { printerId } },
      {
        next: () => { },
        error: (err: unknown) => console.error('Heartbeat mutation error:', err),
        complete: () => { },
      }
    );
  } catch (err) {
    console.error('Failed to update last_seen_at:', err);
  }
}

export async function startPrinterHeartbeat(printerId: string) {
  if (heartbeatInterval) clearInterval(heartbeatInterval);
  heartbeatInterval = setInterval(() => {
    updatePrinterLastSeen(printerId);
  }, HEARTBEAT_INTERVAL_SECONDS * 1000);
  // Immediately send first heartbeat
  await updatePrinterLastSeen(printerId);
}

const HASURA_GRAPHQL_URL = process.env.HASURA_GRAPHQL_URL;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

async function fetchPrinterInfo(printerId: string, token?: string) {
  if (!HASURA_GRAPHQL_URL) throw new Error('HASURA_GRAPHQL_URL not set');
  const query = `
    query getPrinter($printerId: uuid!) {
      printer_by_pk(id: $printerId) {
        id
        clinic_id
        paired_at
        last_seen_at
      }
    }
  `;
  const res = await fetch(HASURA_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : HASURA_ADMIN_SECRET ? `Bearer ${HASURA_ADMIN_SECRET}` : '',
    },
    body: JSON.stringify({ query, variables: { printerId } }),
  });
  const json = await res.json();
  return json.data?.printer_by_pk;
}

export function subscribeToSteriLabels(printerId: string, onLabel: (label: any) => void) {
  const query = `
    subscription steriLabelSub($printerId: uuid!) {
      steri_label(where: {printer_id: {_eq: $printerId}, printed_at: {_is_null: true}}) {
        id
        steri_item_id
        expiry_at
      }
    }
  `;
  return client.subscribe(
    { query, variables: { printerId } },
    {
      next: ({ data }: { data?: { steri_label?: any[] } }) => {
        if (data?.steri_label && data.steri_label.length > 0) {
          data.steri_label.forEach(onLabel);
        }
      },
      error: (err: unknown) => console.error('Steri label subscription error:', err),
      complete: () => console.log('Steri label subscription complete'),
    }
  );
}

export async function startPrinterSubscription(printerId: string, onLabel: (label: any) => void) {
  const tokenObj = await loadToken();
  const token = tokenObj?.token;
  if (tokenObj) {
    // Subscribe to steri_label for this printer
    subscribeToSteriLabels(printerId, onLabel);
    startPrinterHeartbeat(printerId);
    // Fetch printer info once
    const printerInfo = await fetchPrinterInfo(printerId, token);
    return printerInfo
  } else {
    console.log('No token found, not subscribing to printer.');
  }
} 