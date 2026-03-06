import express from 'express'
import { analyzeResume , fetchallAnalysis , deleteAnalysis } from '../controllers/analysisController.js'
import upload  from '../middlewares/uploadMiddleware.js'

const router = express.Router();

router.post('/analyze' , upload.single("resume") , analyzeResume)
router.get('/fetch' , fetchallAnalysis)
router.delete('/delete/:id' , deleteAnalysis)


export default router;