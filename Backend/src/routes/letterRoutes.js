import express from 'express'
import { createCoverLetter, fetchAllCoverLetters, fetchCoverLetterById, deleteCoverLetterById } from '../controllers/letterController.js'
import authMiddleware from '../middlewares/authMiddleware.js';
import candidateMiddleware from '../middlewares/candidatemiddleware.js';

const router = express.Router();


router.post('/generate', authMiddleware, candidateMiddleware, createCoverLetter);

router.get('/fetch', authMiddleware, candidateMiddleware, fetchAllCoverLetters);

router.get('/fetch/:id', authMiddleware, candidateMiddleware, fetchCoverLetterById);
router.delete('/delete/:id', authMiddleware, candidateMiddleware, deleteCoverLetterById);

export default router;