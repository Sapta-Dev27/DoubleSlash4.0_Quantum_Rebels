import express from 'express'
import { analyzeResume, fetchallAnalysis, deleteAnalysis , fetchAnalysisById  } from '../controllers/analysisController.js'
import upload from '../middlewares/uploadMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js';
import candidateMiddleware from '../middlewares/candidatemiddleware.js';

const router = express.Router();

router.post('/analyze', upload.single("resume"), authMiddleware, candidateMiddleware, analyzeResume)
router.get('/fetch', authMiddleware, candidateMiddleware, fetchallAnalysis)
router.delete('/delete/:id', authMiddleware, candidateMiddleware, deleteAnalysis)
router.get('/fetch/:id', authMiddleware, candidateMiddleware, fetchAnalysisById)

export default router;