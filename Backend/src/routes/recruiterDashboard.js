import getRecruiterDashboard  from  '../controllers/recruiterDashboard.js'
import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import recruiterMiddleware from  '../middlewares/recruiterMiddleware.js'

const router = express.Router();

router.get('/stats' , authMiddleware , recruiterMiddleware,  getRecruiterDashboard)

export default router ;