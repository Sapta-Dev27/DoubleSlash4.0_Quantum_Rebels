export type UserRole = 'candidate' | 'recruiter';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface Job {
  id: string;
  role: string;
  description: string;
  location: string;
  experience: string;
  salary: string;
  company: string;
  postedBy: string;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  resumeUrl: string;
  status: 'pending' | 'shortlisted' | 'rejected';
  appliedAt: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'technical' | 'experience' | 'hr';
}

export interface ResumeAnalysis {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}
