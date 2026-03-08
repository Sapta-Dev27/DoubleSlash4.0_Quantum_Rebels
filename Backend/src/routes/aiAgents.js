import express from "express";

import {
  triggerJobScraper,
  fetchScrapedJobs,
  triggerReferralAgent,
  fetchReferrals,
  triggerGithubScore
} from "../controllers/aiAgentController.js";

const router = express.Router();


router.post("/job-scraper", triggerJobScraper);
router.get("/jobs", fetchScrapedJobs);

router.post("/referral-agent", triggerReferralAgent);
router.get("/referrals", fetchReferrals);

router.post("/github-score", triggerGithubScore);

export default router;