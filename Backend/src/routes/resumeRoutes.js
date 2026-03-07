import express from "express";
import { createResumeSummary , fetchResumeSummary , deleteResumeSummary } from "../controllers/resumeController.js";
import upload from "../middlewares/uploadMiddleware.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import candidateMiddleware from '../middlewares/candidatemiddleware.js';


const router = express.Router();

router.post("/createSummary" , upload.single("resume") , authMiddleware , candidateMiddleware , createResumeSummary);
router.get("/fetchSummary" ,authMiddleware , candidateMiddleware ,  fetchResumeSummary);
router.delete("/deleteSummary/:id" , authMiddleware , candidateMiddleware , deleteResumeSummary);

export default router;