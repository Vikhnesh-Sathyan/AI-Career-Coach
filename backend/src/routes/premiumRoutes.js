import express from "express";

import {

    getPremiumStatus,

    upgradeToPremium,

    getPremiumPlans

} from "../controllers/premiumController.js";

import {

    protect

} from "../middleware/authMiddleware.js";


const router =
    express.Router();


// ==========================================
// PUBLIC ROUTE
// ==========================================

router.get(
    "/plans",
    getPremiumPlans
);


// ==========================================
// PROTECTED ROUTES
// ==========================================

router.get(
    "/status",
    protect,
    getPremiumStatus
);


router.post(
    "/upgrade",
    protect,
    upgradeToPremium
);


export default router;