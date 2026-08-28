import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import resumeRoutes from "./src/routes/resumeRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import jobMatchRoutes from "./src/routes/jobMatchRoutes.js";
import interviewRoutes from "./src/routes/interviewRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import settingsRoutes from "./src/routes/settingsRoutes.js"; 
import jobApplicationRoutes from "./src/routes/jobApplicationRoutes.js";  
import adminRoutes from "./src/routes/adminRoutes.js";
import supportRoutes from "./src/routes/supportRoutes.js";
import jobPostingRoutes from "./src/routes/jobPostingRoutes.js";
import applicationRoutes from "./src/routes/applicationRoutes.js";
import analyticsRoutes from "./src/routes/analyticsRoutes.js";
import premiumRoutes from"./src/routes/premiumRoutes";

dotenv.config();

connectDB();

const app = express();


// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/job-match",jobMatchRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/job-application", jobApplicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/jobs", jobPostingRoutes);
app.use("/api/applications",applicationRoutes);
app.use("/api/admin/analytics",analyticsRoutes);
app.use("/api/premium,premiumRoutes")

// Test Route
app.get("/", (req, res) => {
    res.send("API is running...");
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});