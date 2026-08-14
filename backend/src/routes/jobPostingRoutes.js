import express from "express";

import {
    createJob,
    getAllJobs,
    getAdminJobs,
    getJobById,
    updateJob,
    deleteJob
} from "../controllers/jobController.js";

import {
    protect,
    adminOnly
} from "../middleware/authMiddleware.js";


const router = express.Router();


// ==========================================
// ADMIN — CREATE JOB
// ==========================================

router.post(
    "/",
    protect,
    adminOnly,
    createJob
);


// ==========================================
// ADMIN — GET ALL JOBS
// OPEN + CLOSED
// IMPORTANT: MUST COME BEFORE /:id
// ==========================================

router.get(
    "/admin",
    protect,
    adminOnly,
    getAdminJobs
);


// ==========================================
// USER + ADMIN — GET OPEN JOBS
// ==========================================

router.get(
    "/",
    protect,
    getAllJobs
);


// ==========================================
// USER + ADMIN — GET SINGLE JOB
// ==========================================

router.get(
    "/:id",
    protect,
    getJobById
);


// ==========================================
// ADMIN — UPDATE JOB
// ==========================================

router.put(
    "/:id",
    protect,
    adminOnly,
    updateJob
);


// ==========================================
// ADMIN — DELETE JOB
// ==========================================

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteJob
);


export default router;