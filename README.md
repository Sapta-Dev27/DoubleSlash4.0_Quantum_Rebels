# Career AI Coach A

# Resume Analyzer , Resume Summarizer , Mock Interview Generation

<img width="1685" height="727" alt="image" src="https://github.com/user-attachments/assets/5fec680c-3c56-4fa1-b187-ae614f32b6e2" />


# Photo :

<img width="1918" height="888" alt="image" src="https://github.com/user-attachments/assets/0a5d3d1f-6aa4-4624-9dde-e538f530ef20" />

# 🎥 Drive Video Link

[Watch the Demo Video](https://drive.google.com/drive/folders/1t5T2aWYplrebhc1zFAs2qwk9C2FxZC_0)

# Folder Structure : 

 ```
DoubleSlash4.0_Quantum_Rebels
│
├── Backend
│   ├── config
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── gemini.js
│   │
│   ├── controllers
│   │   ├── analysisController.js
│   │   ├── applicationController.js
│   │   ├── authController.js
│   │   ├── interviewController.js
│   │   ├── jobController.js
│   │   ├── jobMatchController.js
│   │   └── resumeController.js
│   │
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Resume.js
│   │   ├── Application.js
│   │   ├── Interview.js
│   │   └── Analysis.js
│   │
│   ├── routes
│   └── server.js
│
│
├── Frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   │
│   │   ├── context
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── layouts
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── candidate
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Jobs.tsx
│   │   │   │   ├── ResumeAnalyzer.tsx
│   │   │   │   ├── MockInterview.tsx
│   │   │   │   └── AppliedJobs.tsx
│   │   │   │
│   │   │   └── recruiter
│   │   │       ├── Dashboard.tsx
│   │   │       ├── ManageJobs.tsx
│   │   │       ├── Applications.tsx
│   │   │       └── PostJob.tsx
│   │   │
│   │   ├── services
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   │
│   │   ├── types
│   │   │   └── index.ts
│   │   │
│   │   └── main.tsx
│
└── README.md

```

# System Architechture : 

```
Frontend (React + Vite)
                         │
                         │ API Calls
                         ▼
               Backend (Node.js + Express)
                         │
                         │
              Business Logic & Controllers
                         │
                         ▼
                  MongoDB Database
                         │
                         ▼
               Cloudinary (Resume Uploads)
```

# ✨ Key Features

👤 Candidate Features
AI Resume Analysis
Resume ATS scoring
AI Generated Resume Summary
Job Recommendation Engine
Apply to Jobs
Track Applications
Mock Interview Preparation
Cover Letter Generation
Candidate Dashboard
Interview Practice System


#🏢 Recruiter Features
Recruiter Authentication
Post Jobs
Manage Job Listings
View Candidate Applications
AI Candidate Matching
Application Management Dashboard
Candidate Filtering
