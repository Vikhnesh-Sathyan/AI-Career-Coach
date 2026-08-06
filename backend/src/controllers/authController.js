import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {

    return jwt.sign(

        { id },

        process.env.JWT_SECRET,

        {

            expiresIn: "7d"

        }

    );

};


// Register
export const registerUser = async (req, res) => {

    try {

        const {

            name,
            email,
            password

        } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,
                message: "All fields are required"

            });

        }

        const existingUser = await User.findOne({

            email

        });

        if (existingUser) {

            return res.status(400).json({

                success: false,
                message: "User already exists"

            });

        }

        const hashedPassword = await bcrypt.hash(

            password,

            10

        );

        const user = await User.create({

            name,
            email,
            password: hashedPassword

        });

        res.status(201).json({

            success: true,

            message: "Registration successful",

            token: generateToken(user._id),

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// Login
export const loginUser = async (req, res) => {

    try {

        const {

            email,
            password

        } = req.body;

        const user = await User.findOne({

            email

        });

        if (!user) {

            return res.status(400).json({

                success: false,
                message: "Invalid email or password"

            });

        }

        const match = await bcrypt.compare(

            password,

            user.password

        );

        if (!match) {

            return res.status(400).json({

                success: false,
                message: "Invalid email or password"

            });

        }

        res.json({

            success: true,

            message: "Login successful",

            token: generateToken(user._id),

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                subscription: user.subscription.plan

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};