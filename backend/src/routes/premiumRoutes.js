import express from "express";

import {
    protect
} from "../middleware/authMiddleware.js";

import {
    premiumOnly
} from "../middleware/premiumMiddleware.js";

import User from "../models/User.js";


const router = express.Router();


// ==========================================
// GET PREMIUM STATUS
// ==========================================

router.get(
    "/status",
    protect,
    async (req, res) => {

        try {

            return res.status(200).json({

                success: true,

                data: {

                    plan:
                        req.user.subscription?.plan ||
                        "Free",

                    status:
                        req.user.subscription?.status ||
                        "active"

                }

            });

        }

        catch (error) {

            console.error(
                "Get Premium Status Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Failed to get subscription status."

            });

        }

    }
);


// ==========================================
// UPGRADE TO PREMIUM
// ==========================================

router.post(
    "/upgrade",
    protect,
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user._id
                );


            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found."

                });

            }


            user.subscription = {

                plan: "Premium",

                status: "active"

            };


            await user.save();


            return res.status(200).json({

                success: true,

                message:
                    "Successfully upgraded to Premium.",

                data: {

                    plan:
                        user.subscription.plan,

                    status:
                        user.subscription.status

                }

            });

        }

        catch (error) {

            console.error(
                "Premium Upgrade Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Premium upgrade failed."

            });

        }

    }
);


// ==========================================
// TEST PREMIUM FEATURE
// ==========================================

router.get(
    "/premium-feature",
    protect,
    premiumOnly,
    async (req, res) => {

        return res.status(200).json({

            success: true,

            message:
                "Welcome! You have access to this Premium feature."

        });

    }
);


export default router;