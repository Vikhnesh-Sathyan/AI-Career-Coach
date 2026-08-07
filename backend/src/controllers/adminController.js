import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import Interview from "../models/Interview.js";


// Dashboard Statistics
export const getDashboardStats = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalApplications =
            await JobApplication.countDocuments();

        const totalInterviews =
            await Interview.countDocuments();

        const premiumUsers =
            await User.countDocuments({

                "subscription.plan": "Premium"

            });

        res.json({

            success: true,

            stats: {

                totalUsers,

                totalApplications,

                totalInterviews,

                premiumUsers

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


// Get All Users
export const getUsers = async (req, res) => {

    try {

        const users = await User.find()

            .select("-password")

            .sort({

                createdAt: -1

            });

        res.json({

            success: true,

            users

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Get Single User
export const getUser = async (req, res) => {

    try {

        const user = await User.findById(

            req.params.id

        ).select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        res.json({

            success: true,

            user

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Delete User
export const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(

            req.params.id

        );

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        await user.deleteOne();

        res.json({

            success: true,

            message: "User deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};