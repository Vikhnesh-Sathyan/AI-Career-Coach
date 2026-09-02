import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
    uploadResume,
    getLatestResumeAnalysis
} from "../controllers/resumeController.js";

import {
    protect
} from "../middleware/authMiddleware.js";


const router = express.Router();


// ==========================================
// UPLOAD + ANALYZE RESUME
// ==========================================

router.post(

    "/upload",

    protect,

    upload.single("resume"),

    uploadResume

);


// ==========================================
// GET LATEST RESUME ANALYSIS
// ==========================================

router.get(

    "/latest",

    protect,

    getLatestResumeAnalysis

);


export default router;