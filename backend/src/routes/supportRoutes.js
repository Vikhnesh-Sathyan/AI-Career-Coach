import express from "express";

import {
    createSupportRequest,
    getMySupportRequest,
    getAllSupportRequests,
    updateSupportRequest
} from "../controllers/supportController.js";

import { protect } from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();


// USER
router.post(
    "/",
    createSupportRequest
);


// USER
router.get(
    "/my-request",
    protect,
    getMySupportRequest
);


// ADMIN
router.get(
    "/admin",
    protect,
    adminOnly,
    getAllSupportRequests
);


// ADMIN
router.patch(
    "/admin/:id",
    protect,
    adminOnly,
    updateSupportRequest
);


export default router;