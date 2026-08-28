import User from "../models/User.js";


// ==========================================
// GET PREMIUM STATUS
// ==========================================

export const getPremiumStatus = async (
    req,
    res
) => {

    try {

        const user =
            await User.findById(
                req.user._id
            ).select(
                "name email subscription"
            );


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found."

            });

        }


        return res.status(200).json({

            success: true,

            data: {

                name: user.name,

                email: user.email,

                subscription:
                    user.subscription

            }

        });

    }

    catch (error) {

        console.error(
            "Get premium status error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch premium status."

        });

    }

};



// ==========================================
// UPGRADE TO PREMIUM
// ==========================================

export const upgradeToPremium = async (
    req,
    res
) => {

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


        // ======================================
        // PREMIUM DURATION
        // Currently: 30 days
        // ======================================

        const startDate =
            new Date();


        const expiryDate =
            new Date();


        expiryDate.setDate(
            expiryDate.getDate() + 30
        );


        // ======================================
        // UPDATE SUBSCRIPTION
        // ======================================

        user.subscription = {

            plan: "Premium",

            status: "active",

            startDate,

            expiryDate

        };


        await user.save();


        return res.status(200).json({

            success: true,

            message:
                "Successfully upgraded to Premium!",

            data: {

                subscription:
                    user.subscription

            }

        });

    }

    catch (error) {

        console.error(
            "Premium upgrade error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to upgrade subscription."

        });

    }

};



// ==========================================
// GET PREMIUM PLANS
// ==========================================

export const getPremiumPlans = async (
    req,
    res
) => {

    try {

        const plans = [

            {

                id: "free",

                name: "Free",

                price: 0,

                duration:
                    "Unlimited",

                features: [

                    "Basic resume analysis",

                    "Limited ATS checks",

                    "Job tracking",

                    "Basic interview preparation"

                ]

            },


            {

                id: "premium",

                name: "Premium",

                price: 299,

                duration:
                    "30 days",

                features: [

                    "Advanced resume analysis",

                    "Unlimited ATS checks",

                    "AI-powered interview preparation",

                    "Advanced job matching",

                    "Priority career insights"

                ]

            }

        ];


        return res.status(200).json({

            success: true,

            data: plans

        });

    }

    catch (error) {

        console.error(
            "Get premium plans error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch plans."

        });

    }

};