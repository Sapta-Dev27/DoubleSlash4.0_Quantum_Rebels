export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const ROLES = [
  { value: "candidate", label: "Candidate" },
  { value: "recruiter", label: "Recruiter" },
];

export const EXPERIENCE_LEVELS = [
  "Fresher",
  "Entry Level (0-2 years)",
  "Mid Level (2-5 years)",
  "Senior Level (5-10 years)",
  "Expert (10+ years)",
];

export const SENIORITY_LEVELS = [
  "Junior",
  "Mid-level",
  "Senior",
  "Lead",
  "Principal",
];

export const JOB_ROLES = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Product Manager",
  "UI/UX Designer",
  "QA Engineer",
  "Business Analyst",
];