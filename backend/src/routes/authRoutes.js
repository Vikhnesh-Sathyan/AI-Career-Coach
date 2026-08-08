import express from "express";

import {
    registerUser,
    loginUser
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();


/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.post(
    "/register",
    registerUser
);

router.post(
    "/login",
    loginUser
);


/*
|--------------------------------------------------------------------------
| Protected Profile Route
|--------------------------------------------------------------------------
*/

router.get(
    "/profile",
    protect,
    (req, res) => {

        res.status(200).json({

            success: true,

            user: {

                id: req.user._id,

                name: req.user.name,

                email: req.user.email,

                role: req.user.role,

                profileImage:
                    req.user.profileImage,

                subscription:
                    req.user.subscription

            }

        });

    }
);


export default router;