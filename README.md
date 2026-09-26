# 🚀 CareerCoach

### AI-Powered Career Development Platform

CareerCoach is a full-stack career development platform that brings **resume analysis, ATS scoring, job discovery, application tracking, and interview preparation** into one place.

The goal is to help job seekers improve their resumes, find relevant opportunities, prepare for interviews, and manage their job-search journey from a single platform.

---

## ✨ Features

| Module | Features |
|---|---|
| 🔐 Authentication | JWT authentication, protected routes, role-based access |
| 📄 Resume | Resume upload, resume management, skill extraction |
| 📊 ATS Analysis | ATS score, keyword match, formatting, readability, project analysis |
| 💡 Resume Insights | Detected skills and improvement suggestions |
| 💼 Jobs | Job listing, job details, job discovery |
| 📝 Applications | Apply to jobs, duplicate application prevention |
| 📌 Job Tracker | Track applications and application status |
| 🎤 Interviews | Interview practice and preparation |
| 🕐 Interview History | Review previous interview attempts |
| 💎 Premium | Free/Premium subscription management |
| 🛡️ Premium Security | Premium-only backend access using middleware |

---

## 🧠 Career Journey

```text
Register / Login
       ↓
Upload Resume
       ↓
ATS & Resume Analysis
       ↓
Improve Resume
       ↓
Browse Jobs
       ↓
Apply
       ↓
Track Applications
       ↓
Practice Interviews
       ↓
Review Interview History

📊 ATS Resume Analysis

CareerCoach analyzes uploaded resumes and provides:

ATS Score
Keyword Match
Formatting Score
Readability Score
Project Score
Detected Technical Skills
Resume Improvement Suggestions

The resume analysis uses Python/NLP-based resume processing to extract useful information from uploaded resumes.

💼 Job & Application Tracking

Users can browse available jobs, view detailed job information, and apply directly.

Jobs
 ↓
Job Details
 ↓
Apply
 ↓
Application Created
 ↓
My Applications
 ↓
Track Status

Application statuses include:
Applied · Shortlisted · Interview · Selected · Rejected

🎤 Interview Preparation

CareerCoach provides interview preparation tools where users can practice interview questions and maintain their interview history.

This allows users to review previous attempts and continuously improve their interview preparation.

💎 Premium

CareerCoach includes a subscription system with Free and Premium plans.

Free
Resume Management
Job Tracking
Basic ATS Score
Basic Career Tools
Premium
Advanced ATS Analysis
AI Resume Suggestions
Advanced Job Matching
Interview Preparation Tools
Priority Career Insights

Subscription Flow

Free
 ↓
Upgrade to Premium
 ↓
Premium Active
 ↓
Premium Features
 ↓
Cancel Premium
 ↓
Free

🔐 Security & Architecture

React Frontend
      ↓
REST API
      ↓
Express Routes
      ↓
JWT Authentication
      ↓
Authorization / Premium Middleware
      ↓
Controllers
      ↓
Mongoose Models
      ↓
MongoDB

🛠️ Tech Stack

Frontend

React.js · JavaScript · React Router · Axios · Framer Motion · CSS

Backend

Node.js · Express.js · MongoDB · Mongoose · JWT · REST APIs

AI / NLP

Python · NLP · Resume Processing · Skill Extraction

Tools

Git · GitHub · Postman · MongoDB

📂 Project Structure

CareerCoach/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── styles/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── config/
│
├── ai/
│   └── resume-analysis/
│
└── README.md

⚙️ Setup

Clone the repository

git clone https://github.com/YOUR_USERNAME/CareerCoach.git
cd CareerCoach

Frontend

cd frontend
npm install
npm run dev

Backend

Open another terminal:

cd backend
npm install
npm run dev

Environment Variables

Create a .env file inside the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

👨‍💻 Developer
Vikhnesh Sathyan

MCA Graduate | Full-Stack Developer

React · JavaScript · Node.js · Express · MongoDB · Python · NLP

⭐ CareerCoach — One platform for your complete career journey.