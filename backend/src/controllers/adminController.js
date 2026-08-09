import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";


// ==========================================
// GET ADMIN DASHBOARD STATS
// ==========================================

export const getAdminStats = async (req, res) => {

    try {

        // -------------------------------
        // USERS
        // -------------------------------

        const totalUsers =
            await User.countDocuments();


        // -------------------------------
        // PREMIUM USERS
        // -------------------------------

        const premiumUsers =
            await User.countDocuments({
                "subscription.plan": "Premium"
            });


        // -------------------------------
        // APPLICATIONS
        // -------------------------------

        const totalApplications =
            await JobApplication.countDocuments();


        // -------------------------------
        // APPLICATION STATUS
        // -------------------------------

        const applied =
            await JobApplication.countDocuments({
                status: "Applied"
            });


        const shortlisted =
            await JobApplication.countDocuments({
                status: "Shortlisted"
            });


        const assessment =
            await JobApplication.countDocuments({
                status: "Assessment"
            });


        const interviews =
            await JobApplication.countDocuments({
                status: "Interview"
            });


        const offers =
            await JobApplication.countDocuments({
                status: "Offer"
            });


        const rejected =
            await JobApplication.countDocuments({
                status: "Rejected"
            });


        const accepted =
            await JobApplication.countDocuments({
                status: "Accepted"
            });


        // -------------------------------
        // RESPONSE
        // -------------------------------

        res.status(200).json({

            success: true,

            data: {

                totalUsers,

                premiumUsers,

                totalApplications,

                applied,

                shortlisted,

                assessment,

                interviews,

                offers,

                rejected,

                accepted

            }

        });

    }

    catch (error) {

        console.error(
            "Admin Stats Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to load admin statistics"

        });

    }

};


// ==========================================
// GET ALL USERS FOR ADMIN
// ==========================================

export const getAdminUsers = async (req, res) => {

    try {

        const users =
            await User.find({})

                .select(
                    "_id name email role subscription createdAt"
                )

                .sort({
                    createdAt: -1
                });


        const formattedUsers =
            users.map((user) => ({

                id:
                    user._id,

                name:
                    user.name,

                email:
                    user.email,

                role:
                    user.role === "admin"
                        ? "Admin"
                        : "User",

                plan:
                    user.subscription?.plan === "Premium"
                        ? "Premium"
                        : "Free",

                status:
                    "Active"

            }));


        res.status(200).json({

            success: true,

            data:
                formattedUsers

        });

    }

    catch (error) {

        console.error(
            "Get Admin Users Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to load users"

        });

    }

};