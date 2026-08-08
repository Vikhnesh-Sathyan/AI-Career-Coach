import express from "express";

import {
    registerUser,
    loginUser,
} from "../controllers/authController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// Register
router.post(
    "/register",
    registerUser
);


// Login
router.post(
    "/login",
    loginUser
);


// Protected profile
router.get(
    "/profile",
    protect,
    (req, res) => {

        res.json({
            success: true,
            user: req.user,
        });

    }
);


// Admin-only test route
router.get(
    "/admin-test",
    protect,
    adminOnly,
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Admin",
            user: req.user,
        });

    }
);


export default router;