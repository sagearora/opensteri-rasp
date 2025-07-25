import 'dotenv/config';

import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import wifiRoutes from './routes/wifi.routes';
import { loadToken } from './services/graphqlTokenStore';
import { startPrinterSubscription } from './services/subscribePrintLabels';

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/', wifiRoutes);

// On startup, load token and printer_id and subscribe if present
(async () => {
  const stored = await loadToken();
  if (stored && stored.token && stored.printer_id) {
    startPrinterSubscription(stored.printer_id, (labels) => {
      console.log('New labels on startup:', labels);
    });
  } else {
    console.log('No token/printer_id found, not subscribing to printer on startup.');
  }
})();

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portal running on port ${PORT}`);
});