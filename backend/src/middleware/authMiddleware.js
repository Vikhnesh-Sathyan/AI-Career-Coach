import jwt from "jsonwebtoken";
import User from "../models/User.js";


// ===============================
// Protect Route
// ===============================

export const protect = async (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;


        // Check authorization header
        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return res.status(401).json({

                success: false,

                message: "Not authorized. Token missing.",

            });
        }


        // Get token
        const token =
            authHeader.split(" ")[1];


        // Verify token
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // Find user
        const user =
            await User.findById(decoded.id)
                .select("-password");


        if (!user) {

            return res.status(401).json({

                success: false,

                message: "User not found",

            });
        }


        // Attach user to request
        req.user = user;


        next();

    }

    catch (error) {

        console.error(
            "Auth Middleware Error:",
            error
        );


        return res.status(401).json({

            success: false,

            message: "Invalid or expired token",

        });

    }
};


// ===============================
// Admin Only
// ===============================

export const adminOnly = (
    req,
    res,
    next
) => {

    if (
        !req.user ||
        req.user.role !== "admin"
    ) {

        return res.status(403).json({

            success: false,

            message: "Admin access required",

        });
    }


    next();
};