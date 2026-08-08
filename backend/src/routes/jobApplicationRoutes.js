import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {

    addApplication,

    getApplications,

    getApplicationById,

    updateApplication,

    deleteApplication,

    getApplicationStats

} from "../controllers/jobApplicationController.js";

const router = express.Router();


// Add Application
router.post(

    "/add",

    protect,

    addApplication

);


// Get All Applications
router.get(

    "/",

    protect,

    getApplications

);


// Dashboard Statistics
router.get(

    "/stats",

    protect,

    getApplicationStats

);


// Get Single Application
router.get(

    "/:id",

    protect,

    getApplicationById

);


// Update Application
router.put(

    "/update/:id",

    protect,

    updateApplication

);


// Delete Application
router.delete(

    "/delete/:id",

    protect,

    deleteApplication

);

export default router;