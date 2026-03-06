import { Job, Application, InterviewQuestion, ResumeAnalysis } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    role: 'Senior Frontend Developer',
    description: 'Looking for an experienced React developer',
    location: 'Remote',
    experience: '5+ years',
    salary: '$120k - $150k',
    company: 'TechCorp',
    postedBy: 'recruiter1',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    role: 'Full Stack Engineer',
    description: 'Build scalable web applications',
    location: 'New York, NY',
    experience: '3-5 years',
    salary: '$100k - $130k',
    company: 'StartupXYZ',
    postedBy: 'recruiter1',
    createdAt: '2024-01-14'
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    candidateId: 'candidate1',
    candidateName: 'John Doe',
    resumeUrl: '/resumes/john-doe.pdf',
    status: 'pending',
    appliedAt: '2024-01-16'
  }
];

export const mockInterviewQuestions: InterviewQuestion[] = [
  {
    id: '1',
    question: 'Explain the concept of closures in JavaScript',
    category: 'technical'
  },
  {
    id: '2',
    question: 'Tell me about a challenging project you worked on',
    category: 'experience'
  },
  {
    id: '3',
    question: 'Where do you see yourself in 5 years?',
    category: 'hr'
  }
];

export const mockResumeAnalysis: ResumeAnalysis = {
  atsScore: 85,
  strengths: [
    'Strong technical skills in modern frameworks',
    'Clear project descriptions with quantifiable results',
    'Well-structured format with proper sections'
  ],
  weaknesses: [
    'Missing relevant keywords for the target role',
    'Could add more specific achievements',
    'Contact information could be more prominent'
  ],
  suggestions: [
    'Add keywords: React, TypeScript, Node.js, AWS',
    'Include metrics: improved performance by X%, reduced load time by Y%',
    'Use action verbs: developed, implemented, optimized',
    'Add a professional summary at the top'
  ]
};
