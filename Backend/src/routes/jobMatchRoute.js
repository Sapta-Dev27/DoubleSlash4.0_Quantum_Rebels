import express from 'express';
import {jobMatchController , findAllJobMatches , findJobMatchById , deleteAnalysis} from '../controllers/jobMatchController.js';
import upload from '../middlewares/uploadMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import candidateMiddleware from '../middlewares/candidatemiddleware.js';

const router = express.Router();

router.post('/match', upload.single("resume") , authMiddleware , candidateMiddleware , jobMatchController);
router.get('/fetch', authMiddleware , candidateMiddleware , findAllJobMatches);
router.get('/fetch/:id', authMiddleware , candidateMiddleware , findJobMatchById);
router.delete('/delete/:id', authMiddleware , candidateMiddleware , deleteAnalysis);

export default router;