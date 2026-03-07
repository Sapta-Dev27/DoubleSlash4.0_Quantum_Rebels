import express from 'express'
import { generateInterviewPrepController, fetchAllInterviews, deleteInterviewPrep } from '../controllers/interviewPrepController.js'
import authMiddleware from '../middlewares/authMiddleware.js';
import candidateMiddleware from '../middlewares/candidatemiddleware.js';

const router = express.Router();

router.post('/generate', authMiddleware, candidateMiddleware, generateInterviewPrepController)
router.get('/fetch', authMiddleware, candidateMiddleware, fetchAllInterviews)
router.delete('/delete/:id', authMiddleware, candidateMiddleware, deleteInterviewPrep)

export default router;
