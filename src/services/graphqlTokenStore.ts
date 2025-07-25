import { promises as fs } from 'fs';
import path from 'path';

const TOKEN_FILE = path.resolve(process.cwd(), '.printer_token.json');

export async function saveToken(token: string, printer_id: string): Promise<void> {
  await fs.writeFile(TOKEN_FILE, JSON.stringify({ token, printer_id }), 'utf-8');
}

export async function loadToken(): Promise<{ token: string, printer_id: string } | null> {
  try {
    const data = await fs.readFile(TOKEN_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (typeof parsed.token === 'string' && typeof parsed.printer_id === 'string') {
      return { token: parsed.token, printer_id: parsed.printer_id };
    }
    return null;
  } catch (err) {
    return null;
  }
} 