import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import recruiterMiddleware from  '../middlewares/recruiterMiddleware.js'

const router = express.Router();

router.get('/welcomeRecruiter', authMiddleware, recruiterMiddleware, (req, res) => {
    res.json({
        message: 'Welcome to the Recruiter Page'
    });
});

export default router;