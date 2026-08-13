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


// Admin — Create Job
router.post(
    "/",
    protect,
    adminOnly,
    createJob
);


// Admin — Get All Jobs
router.get(
    "/",
    protect,
    adminOnly,
    getAllJobs
);


// Get Single Job
router.get(
    "/:id",
    protect,
    getJobById
);


// Admin — Update Job
router.put(
    "/:id",
    protect,
    adminOnly,
    updateJob
);


// Admin — Delete Job
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteJob
);

export default router;