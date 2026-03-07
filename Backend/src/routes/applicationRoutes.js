import express from "express";
import { applyJob, getApplicantsForJob, getMyApplications, updateApplicationStatus } from "../controllers/applicationController.js";
import upload from "../middlewares/uploadMiddleware.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import candidateMiddleware from '../middlewares/candidatemiddleware.js';
import recruiterMiddleware from '../middlewares/recruiterMiddleware.js';

const router = express.Router();

router.post('/apply/:jobId', upload.single('resume'), authMiddleware , candidateMiddleware, applyJob);
router.get('/applicants/:jobId', authMiddleware, recruiterMiddleware, getApplicantsForJob);
router.get('/fetch', authMiddleware, candidateMiddleware, getMyApplications);
router.put('/updateStatus/:applyId', authMiddleware, recruiterMiddleware, updateApplicationStatus);

export default router;