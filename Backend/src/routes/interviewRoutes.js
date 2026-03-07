import express from "express";
import { conductMockInterview, fetchAllInterviews, deleteInterview , fetchInterviewById } from "../controllers/interviewController.js";
import upload from "../middlewares/uploadMiddleware.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import candidateMiddleware from '../middlewares/candidatemiddleware.js';

const router = express.Router();

router.post("/generate", upload.single("resume"), authMiddleware, candidateMiddleware, conductMockInterview);
router.get("/fetch", authMiddleware, candidateMiddleware ,  fetchAllInterviews);
router.delete("/delete/:id", authMiddleware, candidateMiddleware, deleteInterview);
router.get("/fetch/:id", authMiddleware, candidateMiddleware ,  fetchInterviewById);


export default router;