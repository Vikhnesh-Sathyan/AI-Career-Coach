import express from "express";

import {
    createJob,
    getAllJobs,
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
// ADMIN + USER — GET JOBS
// ==========================================

router.get(
    "/",
    protect,
    getAllJobs
);


// ==========================================
// ADMIN + USER — GET SINGLE JOB
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