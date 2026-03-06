import express from "express";
import {conductMockInterview , fetchAllInterviews , deleteInterview} from "../controllers/interviewController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/generate", upload.single("resume"), conductMockInterview);
router.get("/fetch" , fetchAllInterviews);
router.delete("/delete/:id" , deleteInterview);

export default router;