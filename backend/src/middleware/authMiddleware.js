
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// ===============================
// Protect Route
// ===============================

export const protect = async (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;


        // ===============================
        // CHECK AUTHORIZATION HEADER
        // ===============================

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return res.status(401).json({

                success: false,

                message:
                    "Not authorized. Token missing."

            });

        }


        // ===============================
        // GET TOKEN
        // ===============================

        const token =
            authHeader.split(" ")[1];


        // ===============================
        // VERIFY TOKEN
        // ===============================

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // ===============================
        // FIND USER
        // ===============================

        const user =
            await User.findById(
                decoded.id
            ).select("-password");


        if (!user) {

            return res.status(401).json({

                success: false,

                message: "User not found"

            });

        }


        // ===============================
        // CHECK ACCOUNT STATUS
        // ===============================

        if (
            user.status === "suspended" &&
            user.role !== "admin"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Your account has been suspended."

            });

        }


        // ===============================
        // ATTACH USER
        // ===============================

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

            message:
                "Invalid or expired token"

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

            message:
                "Admin access required"

        });

    }


    next();

};

