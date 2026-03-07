import express from 'express'
import { getDashboardStats } from '../controllers/statsDashboard.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import candidateMiddleware from '../middlewares/candidatemiddleware.js';

const router = express.Router();

router.get("/stats",authMiddleware , candidateMiddleware , getDashboardStats);

export default router;