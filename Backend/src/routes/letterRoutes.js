import express from 'express'
import { createCoverLetter, fetchAllCoverLetters, fetchCoverLetterById, deleteCoverLetterById } from '../controllers/letterController.js'


const router = express.Router();


router.post('/generate', createCoverLetter);

router.get('/fetch', fetchAllCoverLetters);

router.get('/fetch/:id', fetchCoverLetterById);
router.delete('/delete/:id', deleteCoverLetterById);

export default router;