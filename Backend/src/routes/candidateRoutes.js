import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import candidateMiddleware from '../middlewares/candidatemiddleware.js';

const router = express.Router();

router.get('/welcomeCandidate', authMiddleware, candidateMiddleware, (req, res) => {
    res.json({
        message: 'Welcome to the Candidate Welcome Page'
    });
});

export default router;