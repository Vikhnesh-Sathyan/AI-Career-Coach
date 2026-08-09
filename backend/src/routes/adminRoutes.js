import express from "express";

import {
    getAdminStats,
    getAdminUsers,
    updateUserStatus,
    deleteUser
} from "../controllers/adminController.js";

import {
    protect
} from "../middleware/authMiddleware.js";

import adminOnly
    from "../middleware/adminMiddleware.js";


const router = express.Router();


// ==========================================
// ADMIN DASHBOARD STATS
// ==========================================

router.get(
    "/stats",
    protect,
    adminOnly,
    getAdminStats
);


// ==========================================
// GET ALL USERS
// ==========================================

router.get(
    "/users",
    protect,
    adminOnly,
    getAdminUsers
);


// ==========================================
// UPDATE USER STATUS
// ==========================================

router.patch(
    "/users/:id/status",
    protect,
    adminOnly,
    updateUserStatus
);


// ==========================================
// DELETE USER
// ==========================================

router.delete(
    "/users/:id",
    protect,
    adminOnly,
    deleteUser
);


export default router;