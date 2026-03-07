import express from "express";
import { applyJob, getApplicantsForJob, getMyApplications, updateApplicationStatus } from "../controllers/applicationController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post('/apply/:jobId', upload.single('resume'), applyJob);
router.get('/applicants/:jobId', getApplicantsForJob);
router.get('/fetch', getMyApplications);
router.put('/updateStatus/:applyId', updateApplicationStatus);

export default router;