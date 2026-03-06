import express from 'express';
import 'dotenv/config';
import interviewRoutes from "./routes/interviewRoutes.js";
import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import interviewPrepRoutes from "./routes/interviewPrep.js"
import authRoutes from "./routes/authRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import letterRoutes from "./routes/letterRoutes.js";
import jobMatchRoute from "./routes/jobMatchRoute.js";


const PORT = process.env.PORT || 8001;
const app = express();
connectDB();
app.use(express.json());

app.get('/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is LIVE"
  })
})
app.use('/api/auth',authRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/resumeAnalyzer', analysisRoutes);
app.use('/api/interviewPrep', interviewPrepRoutes);
app.use('/api/coverLetter', letterRoutes);
app.use('/api/jobMatch', jobMatchRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})