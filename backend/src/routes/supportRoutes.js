import express from "express";

import {
    createSupportRequest
} from "../controllers/supportController.js";

import { protect }
    from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// CREATE ACCOUNT REVIEW REQUEST
// ==========================================

router.post(
    "/",
    protect,
    createSupportRequest
);


export default router;