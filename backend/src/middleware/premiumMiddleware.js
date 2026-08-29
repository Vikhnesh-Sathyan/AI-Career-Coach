// ==========================================
// PREMIUM ACCESS MIDDLEWARE
// ==========================================

export const premiumOnly = (
    req,
    res,
    next
) => {

    try {

        // ======================================
        // CHECK USER
        // ======================================

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message:
                    "User authentication required."

            });

        }


        // ======================================
        // CHECK PREMIUM PLAN
        // ======================================

        if (
            req.user.subscription?.plan !==
            "Premium"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "This feature requires a Premium subscription.",

                requiresPremium: true

            });

        }


        // ======================================
        // CHECK SUBSCRIPTION STATUS
        // ======================================

        if (
            req.user.subscription?.status !==
            "active"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Your Premium subscription is not active.",

                requiresPremium: true

            });

        }


        // ======================================
        // PREMIUM ACCESS GRANTED
        // ======================================

        next();

    }

    catch (error) {

        console.error(
            "Premium Middleware Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Premium access verification failed."

        });

    }

};