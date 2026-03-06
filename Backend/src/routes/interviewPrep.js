import express from 'express'
import {generateInterviewPrepController  , fetchAllInterviews , deleteInterviewPrep } from '../controllers/interviewPrepController.js'

const router = express.Router();

router.post('/generate' , generateInterviewPrepController)
router.get('/fetch' , fetchAllInterviews)
router.delete('/delete/:id' , deleteInterviewPrep)

export default router;
