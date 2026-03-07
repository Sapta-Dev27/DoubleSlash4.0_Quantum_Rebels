import express from 'express';
import { createJob, fetchAllJobs, fetchJobsById, updateJob, deleteJob , fetchAllJobsForRecruiter } from '../controllers/jobController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import candidateMiddleware from '../middlewares/candidatemiddleware.js';
import recruiterMiddleware from '../middlewares/recruiterMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, recruiterMiddleware, createJob);
router.get('/fetch', authMiddleware, fetchAllJobs);
router.get('/fetch/recruiter', authMiddleware, fetchAllJobsForRecruiter);
router.get('/fetch/:id', authMiddleware, fetchJobsById);
router.put('/update/:id', authMiddleware, recruiterMiddleware, updateJob);
router.delete('/delete/:id', authMiddleware, recruiterMiddleware, deleteJob);



export default router;