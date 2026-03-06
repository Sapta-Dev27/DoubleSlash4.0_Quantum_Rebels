import express from 'express';
import {jobMatchController , findAllJobMatches , findJobMatchById , deleteAnalysis} from '../controllers/jobMatchController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/match', upload.single("resume") , jobMatchController);
router.get('/fetch', findAllJobMatches);
router.get('/fetch/:id', findJobMatchById);
router.delete('/delete/:id', deleteAnalysis);

export default router;