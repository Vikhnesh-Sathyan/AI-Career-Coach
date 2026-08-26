import express from "express";

import {
    getAdminAnalytics
} from "../controllers/analyticsController.js";

import {
    protect
} from "../middleware/authMiddleware.js";

import adminOnly
    from "../middleware/adminMiddleware.js";


const router = express.Router();


// ==========================================
// GET ADMIN ANALYTICS
// ==========================================

router.get(
    "/",
    protect,
    adminOnly,
    getAdminAnalytics
);


export default router;