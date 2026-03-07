import express from 'express';
import 'dotenv/config';
import interviewRoutes from "./routes/interviewRoutes.js";
import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import interviewPrepRoutes from "./routes/interviewPrep.js"
import authRoutes from "./routes/authRoutes.js";
import letterRoutes from "./routes/letterRoutes.js";
import jobMatchRoute from "./routes/jobMatchRoute.js";
import jobRoutes from "./routes/jobRoutes.js";
import ApplicationRoutes from "./routes/applicationRoutes.js";
import CandidateRoutes from "./routes/candidateRoutes.js";
import RecruiterRoutes from "./routes/recruiterRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"
import cors from 'cors';


const PORT = process.env.PORT || 8001;
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE" , "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);
connectDB();

app.get('/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is LIVE"
  })
})
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/resumeAnalyzer', analysisRoutes);
app.use('/api/interviewPrep', interviewPrepRoutes);
app.use('/api/coverLetter', letterRoutes);
app.use('/api/jobMatch', jobMatchRoute);
app.use('/api/job', jobRoutes);
app.use('/api/application', ApplicationRoutes);
app.use('/api/candidate',CandidateRoutes);
app.use('/api/recruiter',RecruiterRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})