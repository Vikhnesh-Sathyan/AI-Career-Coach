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