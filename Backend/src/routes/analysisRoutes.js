import express from 'express'
import { analyzeResume, fetchallAnalysis, deleteAnalysis } from '../controllers/analysisController.js'
import upload from '../middlewares/uploadMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js';
import candidateMiddleware from '../middlewares/candidatemiddleware.js';

const router = express.Router();

router.post('/analyze', upload.single("resume"), authMiddleware, candidateMiddleware, analyzeResume)
router.get('/fetch', authMiddleware, candidateMiddleware, fetchallAnalysis)
router.delete('/delete/:id', authMiddleware, candidateMiddleware, deleteAnalysis)


export default router;