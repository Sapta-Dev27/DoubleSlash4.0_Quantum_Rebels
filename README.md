# Career AI Coach 

# Resume Analyzer , Resume Summarizer , Mock Interview Generation Architechture

<img width="1685" height="727" alt="image" src="https://github.com/user-attachments/assets/5fec680c-3c56-4fa1-b187-ae614f32b6e2" />


# Photo :

<img width="1918" height="888" alt="image" src="https://github.com/user-attachments/assets/0a5d3d1f-6aa4-4624-9dde-e538f530ef20" />


# 🚀 AI Career Copilot

An **AI-powered career platform** that helps developers **analyze resumes, find jobs, track applications, prepare for interviews, and improve their GitHub profile** using intelligent agents.

Built with a **modern full-stack architecture (MERN + AI integration)** to automate and enhance the job hunting experience.

---

# 🎥 Demo

📺 **Project Demo Video**

[Watch the Demo](https://drive.google.com/drive/folders/1t5T2aWYplrebhc1zFAs2qwk9C2FxZC_0)

---

# 📌 Features

## 🤖 AI Resume Analyzer
- Upload or paste resume
- AI analyzes strengths and weaknesses
- Suggests improvements for ATS optimization
- Provides structured feedback

## 🔍 AI Job Scraper
- Scrapes job listings automatically
- Shows relevant job opportunities
- Stores jobs in the database for quick access

## 🤝 Referral Agent
- AI suggests possible referral opportunities
- Helps users identify people who can refer them

## 🧠 GitHub Profile Scorer
- Analyzes GitHub profile
- Scores repositories and activity
- Provides suggestions to improve profile quality

## 📋 Job Application Tracker
- Track all applied jobs
- View application status
- Manage job pipeline in one place

## 🎯 AI Interview Preparation
- Generates interview questions
- Helps prepare for technical interviews
- Stores interview preparation sessions

---

# 🏗️ Tech Stack

## Frontend
- React
- Tailwind CSS
- Framer Motion
- Axios
- React Router

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## AI Integration
- Gemini API
- AI Agents for resume analysis & interview prep

## Other Tools
- REST APIs
- GitHub API
- Web scraping tools

---
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

---

# 🛠️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/ai-career-copilot.git
cd ai-career-copilot
```

## 2️⃣ Setup Backend

```
cd Backend
npm install
```

# Create .env file
```
GEMINI_API_KEYS=your_api_keys
PORT=your_port
GROQ_API_KEY=your_grq_api
MONGO_URL=your_mongo_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_REFRESH_TOKEN_EXPIRES_IN=your_token_expiry
JWT_ACCESS_TOKEN_EXPIRES_IN=your_token_expiry
JWT_ACCESS_TOKEN_SECRET_KEY=your_access_token_secret_key    
REFRESH_TOKEN_SECRET_KEY=your_refresh_token_secret_key
FRONTEND_URL=http://localhost:5173
```
# Run backend
```
npm run dev
```
# 3️⃣ Setup Frontend 
```
cd Frontend
npm install
npm run dev
```




