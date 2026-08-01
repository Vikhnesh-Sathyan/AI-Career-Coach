import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

    saveInterview,

    getInterviewHistory,

    generateQuestion,

    evaluateAnswer

} from "../controllers/interviewController.js";

const router = express.Router();

router.post(

    "/question",

    generateQuestion

);

router.post(

    "/evaluate",

    evaluateAnswer

);

router.post(

    "/save",

    protect,

    saveInterview

);

router.get(

    "/history",

    protect,

    getInterviewHistory

);

export default router;