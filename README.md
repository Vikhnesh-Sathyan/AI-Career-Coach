# 🤖 AI Career Coach

An AI-powered career development platform designed to help users **analyze resumes, improve ATS compatibility, prepare for interviews, match job descriptions, and track their career progress**.

The project is being developed as a full-stack application using **React, Node.js, Express.js, MongoDB, and AI-powered tools**.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT-based Authentication
* Password Hashing with bcrypt
* Protected Routes
* Role-Based Access Control
* User and Admin Roles
* Admin Protected Routes

### 👤 User Dashboard

* Personalized Career Dashboard
* Career Progress Overview
* ATS Score Overview
* Job Application Statistics
* Interview Statistics
* Skills Overview
* Career Level / Progress Tracking

### 📄 Resume & ATS

* Resume Management
* Resume Analysis
* ATS Score Analysis
* Resume Skill Extraction
* Resume Improvement Suggestions

### 💼 Job & Career Tools

* Job Description Matching
* Job Skill Matching
* Match Score
* Match History
* Job Application Tracking

### 🎤 Interview Preparation

* Interview Preparation
* Interview Questions
* Interview Practice
* Interview History
* Answer Evaluation

### ⚙️ User Settings

* Profile Management
* Career Preferences
* Notification Settings
* Security Settings
* Subscription UI
* Free / Premium Plan Interface

### 🛡️ Admin Panel

* Admin Dashboard
* Role-Based Admin Access
* User Management
* User Statistics
* User Search
* User Filtering
* User Status Management UI
* Admin User Actions
* Admin Settings
* Admin Navigation & Controls

> The admin user management module is currently implemented with static data and can be connected to the backend API later.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* JavaScript
* CSS
* Framer Motion
* React Icons
* Lucide React
* Axios

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication
* bcryptjs

### Database

* MongoDB
* Mongoose

### AI / Resume Processing

* Python
* Flask
* PyMuPDF
* spaCy

---

## 📂 Project Structure

```text
AI-Career-Coach
│
├── backend
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   │
│   │   ├── controllers
│   │   │
│   │   ├── middleware
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models
│   │   │   └── User.js
│   │   │
│   │   └── routes
│   │
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   │
│   │   ├── components
│   │   │   ├── admin
│   │   │   ├── auth
│   │   │   └── dashboard
│   │   │
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── ATS.jsx
│   │   │   ├── JobMatcher.jsx
│   │   │   ├── Interviews.jsx
│   │   │   ├── JobTracker.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── AdminUsers.jsx
│   │   │
│   │   ├── services
│   │   │
│   │   ├── styles
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔑 Role-Based Access

The application supports two user roles:

```text
User
  │
  ├── Dashboard
  ├── Resume
  ├── ATS
  ├── Job Matcher
  ├── Interviews
  ├── Job Tracker
  └── Settings


Admin
  │
  ├── Admin Dashboard
  ├── User Management
  └── Admin Settings
```

New registrations are assigned the default:

```text
role: user
```

Administrators can be assigned the `admin` role through the database during development.

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/Vikhnesh-Sathyan/AI-Career-Coach.git
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 Environment Variables

Do not commit sensitive environment variables to GitHub.

```text
.env
```

should remain inside `.gitignore`.

Required backend variables:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
```

---



## 🎯 Future Improvements

* AI-powered resume analysis
* Advanced ATS scoring
* AI-generated resume suggestions
* AI interview evaluation
* Dynamic admin user management
* Real-time dashboard analytics
* Job recommendation system
* Resume PDF processing
* Advanced career insights
* Production deployment

---

## 📚 Learning Goals

This project is also being developed as a practical full-stack learning project to strengthen skills in:

* React.js
* Node.js
* Express.js
* MongoDB
* REST API development
* Authentication & Authorization
* JWT
* Role-Based Access Control
* Frontend state management
* API integration
* AI integration
* Full-stack application architecture

---

## 👨‍💻 Author

**Vikhnesh Sathyan**

* GitHub: https://github.com/Vikhnesh-Sathyan
* LinkedIn: https://linkedin.com/in/vikhnesh-sathyan-80a433221n

---

⭐ If you find this project interesting, feel free to explore the repository and follow the development journey.
