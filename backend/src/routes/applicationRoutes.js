import express from "express";

import {
    applyForJob,
    getMyApplications,
    getAllApplications,
    getApplicationsByJob,
    updateApplicationStatus
} from "../controllers/applicationController.js";

import {
    protect,
    adminOnly
} from "../middleware/authMiddleware.js";


const router = express.Router();


// ==========================================
// USER — APPLY FOR JOB
// ==========================================

router.post(
    "/",
    protect,
    applyForJob
);


// ==========================================
// USER — GET MY APPLICATIONS
// ==========================================

router.get(
    "/my",
    protect,
    getMyApplications
);


// ==========================================
// ADMIN — GET ALL APPLICATIONS
// IMPORTANT: MUST COME BEFORE /:id
// ==========================================

router.get(
    "/admin",
    protect,
    adminOnly,
    getAllApplications
);


// ==========================================
// ADMIN — GET APPLICATIONS FOR ONE JOB
// ==========================================

router.get(
    "/job/:jobId",
    protect,
    adminOnly,
    getApplicationsByJob
);


// ==========================================
// ADMIN — UPDATE APPLICATION STATUS
// ==========================================

router.put(
    "/:id/status",
    protect,
    adminOnly,
    updateApplicationStatus
);


export default router;
