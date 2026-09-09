import express from "express";

import {
    protect
} from "../middleware/authMiddleware.js";

import {
    premiumOnly
} from "../middleware/premiumMiddleware.js";

import {
    getPremiumStatus,
    upgradeToPremium,
    getPremiumPlans
} from "../controllers/premiumController.js";


const router = express.Router();


// ==========================================
// GET PREMIUM STATUS
// ==========================================

router.get(
    "/status",
    protect,
    getPremiumStatus
);


// ==========================================
// GET PREMIUM PLANS
// ==========================================

router.get(
    "/plans",
    getPremiumPlans
);


// ==========================================
// UPGRADE TO PREMIUM
// ==========================================

router.post(
    "/upgrade",
    protect,
    upgradeToPremium
);


// ==========================================
// TEST PREMIUM FEATURE
// ==========================================

router.get(
    "/premium-feature",
    protect,
    premiumOnly,
    (req, res) => {

        return res.status(200).json({

            success: true,

            message:
                "Welcome! You have access to this Premium feature."

        });

    }
);


export default router;