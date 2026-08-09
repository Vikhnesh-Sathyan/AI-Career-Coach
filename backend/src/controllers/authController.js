import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ===============================
// Generate JWT
// ===============================

const generateToken = (id, role) => {

    return jwt.sign(
        {
            id,
            role,
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "7d",
        }
    );
};


// ===============================
// Register
// ===============================

export const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
        } = req.body;


        // Validate fields
        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message: "All fields are required",

            });
        }


        // Check existing user
        const existingUser = await User.findOne({
            email,
        });


        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "User already exists",

            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Create user
        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            // New users are always normal users
            role: "user",

        });


        // Generate token
        const token = generateToken(
            user._id,
            user.role
        );


        // Response
        res.status(201).json({

            success: true,

            message: "Registration successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,

                profileImage: user.profileImage,

            },

        });

    }

    catch (error) {

        console.error(
            "Register Error:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// ===============================
// Login
// ===============================

export const loginUser = async (req, res) => {

    try {

        const {
            email,
            password,
        } = req.body;


        // ===============================
        // Find user
        // ===============================

        const user = await User.findOne({
            email,
        });


        // ===============================
        // User not found
        // ===============================

        if (!user) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid email or password",

            });

        }


        // ===============================
        // Check password
        // ===============================

        const match = await bcrypt.compare(
            password,
            user.password
        );


        if (!match) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid email or password",

            });

        }


        // ===============================
        // Check account status
        // ===============================

        if (user.status === "suspended") {

            return res.status(403).json({

                success: false,

                message:
                    "Your account has been suspended. Please contact the administrator.",

            });

        }


        // ===============================
        // Generate JWT
        // ===============================

        const token = generateToken(
            user._id,
            user.role
        );


        // ===============================
        // Login response
        // ===============================

        res.status(200).json({

            success: true,

            message:
                "Login successful",

            token,

            user: {

                id:
                    user._id,

                name:
                    user.name,

                email:
                    user.email,

                role:
                    user.role,

                profileImage:
                    user.profileImage,

                subscription:
                    user.subscription?.plan || "Free",

            },

        });

    }

    catch (error) {

        console.error(
            "Login Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Login failed",

        });

    }

};