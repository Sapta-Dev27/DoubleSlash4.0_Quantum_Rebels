import express from "express";
import { createResumeSummary , fetchResumeSummary , deleteResumeSummary } from "../controllers/resumeController.js";
import upload from "../middlewares/uploadMiddleware.js";


const router = express.Router();

router.post("/createSummary" , upload.single("resume") , createResumeSummary);
router.get("/fetchSummary" , fetchResumeSummary);
router.delete("/deleteSummary/:id" , deleteResumeSummary);

export default router;