import { Router, Request, Response } from 'express';
import path from 'path';

const router = Router();

// Serve main page
router.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../views', 'index.html'));
});

// Serve connect page
router.get('/connect', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../views', 'connect.html'));
});

// Serve shared CSS file
router.get('/shared.css', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../views', 'shared.css'));
});

export default router; 