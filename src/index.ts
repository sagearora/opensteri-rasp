import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import wifiRoutes from './routes/wifi.routes';
import staticRoutes from './routes/static.routes';

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Routes
app.use('/api', wifiRoutes);
app.use('/', wifiRoutes); // Add this line to expose /setup at root
app.use('/', staticRoutes);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portal running on port ${PORT}`);
}); 