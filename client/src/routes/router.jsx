import { createBrowserRouter } from 'react-router-dom';
import publicRouter from './publicRoutes.jsx';
import privateRouter from './privateRoutes.jsx';

// Create Browser Router
const router = createBrowserRouter([...publicRouter, ...privateRouter]);

export default router;
