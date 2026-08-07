import express from "express";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

import {

    getDashboardStats,
    getUsers,
    getUser,
    deleteUser

} from "../controllers/adminController.js";

const router = express.Router();

router.use(

    protect,
    adminOnly

);

// Dashboard
router.get(

    "/dashboard",

    getDashboardStats

);

// Users
router.get(

    "/users",

    getUsers

);

router.get(

    "/users/:id",

    getUser

);

router.delete(

    "/users/:id",

    deleteUser

);

export default router;