import express from "express";

import { analyzeJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/analyze", analyzeJob);

export default router;