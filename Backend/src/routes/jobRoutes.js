import express from 'express';
import { createJob, fetchAllJobs , fetchJobsById , updateJob , deleteJob} from '../controllers/jobController.js';

const router = express.Router();

router.post('/create', createJob);
router.get('/fetch', fetchAllJobs);
router.get('/fetch/:id', fetchJobsById);
router.put('/update/:id', updateJob);
router.delete('/delete/:id', deleteJob);


export default router;