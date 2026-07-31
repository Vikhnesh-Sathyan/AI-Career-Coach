import express from "express";

import {
    saveJobMatch,
    getMatchHistory
} from "../controllers/jobMatchController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();


router.post(
    "/save",
    protect,
    saveJobMatch
);


router.get(
    "/history",
    protect,
    getMatchHistory
);


export default router;