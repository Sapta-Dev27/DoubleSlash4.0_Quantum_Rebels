import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/Landing.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";

import { CandidateDashboard } from "./pages/candidate/Dashboard.jsx";
import { MockInterview } from "./pages/candidate/MockInterview.jsx";
import { ResumeAnalyzer } from "./pages/candidate/ResumeAnalyzer.jsx";
import { CoverLetter } from "./pages/candidate/CoverLetter.jsx";
import { InterviewPrep } from "./pages/candidate/InterviewPrep.jsx";
import { Jobs } from "./pages/candidate/Jobs.jsx";
import { AppliedJobs } from "./pages/candidate/AppliedJobs.jsx";
import { JobMatch } from "./pages/candidate/JobMatch.jsx";
import { JobScraper } from "./pages/candidate/JobScraper.jsx";
import { ReferralAgent } from './pages/candidate/ReferralAgent.jsx';

import { RecruiterDashboard } from "./pages/recruiter/Dashboard.jsx";
import { PostJob } from "./pages/recruiter/PostJob.jsx";
import { ManageJobs } from "./pages/recruiter/ManageJobs.jsx";
import { Applicants } from "./pages/recruiter/Applicants.jsx";
import ProjectAnalyzer  from "./pages/recruiter/GithubAgent.jsx";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/candidate/dashboard"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <CandidateDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/dashboard"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <RecruiterDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/candidate/mock-interview"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <MockInterview />
                </ProtectedRoute>
              }
            />

            <Route
              path="/candidate/resume-analyzer"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <ResumeAnalyzer />
                </ProtectedRoute>
              }
            />

            <Route
              path="/candidate/cover-letter"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <CoverLetter />
                </ProtectedRoute>
              }
            />

            <Route
              path="/candidate/interview-prep"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <InterviewPrep />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidate/job-match"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <JobMatch />
                </ProtectedRoute>
              }
            />

            <Route
              path="/candidate/referral-agent"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <ReferralAgent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/candidate/job-scraper"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <JobScraper />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidate/jobs"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <Jobs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/candidate/applied-jobs"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <AppliedJobs />
                </ProtectedRoute>
              }
            />


            <Route
              path="/recruiter/post-job"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <PostJob />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recruiter/manage-jobs"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <ManageJobs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recruiter/applicants"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <Applicants />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recruiter/github-agent"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <ProjectAnalyzer/>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;