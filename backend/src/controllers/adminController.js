import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";

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
        // JOBS
        // -------------------------------

        const totalJobs =
            await Job.countDocuments();

        const openJobs =
            await Job.countDocuments({
        status: "Open"
    });

        const closedJobs =
            await Job.countDocuments({
        status: "Closed"
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

    totalJobs,

    openJobs,

    closedJobs,

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
// GET ADMIN ANALYTICS
// ==========================================

export const getAdminAnalytics = async (
    req,
    res
) => {

    try {

        // ======================================
        // OVERVIEW
        // ======================================

        const totalUsers =
            await User.countDocuments();


        const premiumUsers =
            await User.countDocuments({
                "subscription.plan": "Premium"
            });


        const totalJobs =
            await Job.countDocuments();


        const openJobs =
            await Job.countDocuments({
                status: "Open"
            });


        const closedJobs =
            await Job.countDocuments({
                status: "Closed"
            });


        const totalApplications =
            await JobApplication.countDocuments();


        // ======================================
        // APPLICATION STATUS
        // ======================================

        const applicationStatuses = [
            "Applied",
            "Shortlisted",
            "Assessment",
            "Interview",
            "Offer",
            "Selected",
            "Rejected"
        ];


        const applicationsByStatus = {};


        for (
            const status of applicationStatuses
        ) {

            applicationsByStatus[status] =
                await JobApplication.countDocuments({
                    status
                });

        }


        // ======================================
        // MONTHLY APPLICATIONS
        // LAST 6 MONTHS
        // ======================================

        const sixMonthsAgo = new Date();

        sixMonthsAgo.setMonth(
            sixMonthsAgo.getMonth() - 5
        );

        sixMonthsAgo.setDate(1);

        sixMonthsAgo.setHours(
            0,
            0,
            0,
            0
        );


        const monthlyData =
            await JobApplication.aggregate([

                {

                    $match: {

                        createdAt: {

                            $gte:
                                sixMonthsAgo

                        }

                    }

                },


                {

                    $group: {

                        _id: {

                            year: {
                                $year:
                                    "$createdAt"
                            },

                            month: {
                                $month:
                                    "$createdAt"
                            }

                        },


                        count: {
                            $sum: 1
                        }

                    }

                },


                {

                    $sort: {

                        "_id.year": 1,

                        "_id.month": 1

                    }

                }

            ]);


        // ======================================
        // FORMAT ALL 6 MONTHS
        // ======================================

        const monthlyApplications = [];


        for (
            let i = 5;
            i >= 0;
            i--
        ) {

            const date = new Date();

            date.setMonth(
                date.getMonth() - i
            );


            const year =
                date.getFullYear();


            const month =
                date.getMonth() + 1;


            const existingMonth =
                monthlyData.find(

                    item =>

                        item._id.year === year &&

                        item._id.month === month

                );


            monthlyApplications.push({

                month:

                    date.toLocaleString(
                        "en-US",
                        {
                            month:
                                "short"
                        }
                    ),


                count:

                    existingMonth
                        ? existingMonth.count
                        : 0

            });

        }


        // ======================================
        // TOP HIRING COMPANIES
        // ======================================

        const topCompanies =
            await Job.aggregate([

                {

                    $match: {

                        company: {

                            $exists: true,

                            $ne: ""

                        }

                    }

                },


                {

                    $group: {

                        _id:
                            "$company",


                        jobs: {

                            $sum: 1

                        }

                    }

                },


                {

                    $sort: {

                        jobs: -1

                    }

                },


                {

                    $limit: 5

                }

            ]);


        // ======================================
        // RESPONSE
        // ======================================

        res.status(200).json({

            success: true,


            data: {

                overview: {

                    totalUsers,

                    premiumUsers,

                    totalJobs,

                    openJobs,

                    closedJobs,

                    totalApplications

                },


                applicationsByStatus,


                monthlyApplications,


                topCompanies

            }

        });

    }

    catch (error) {

        console.error(
            "Admin Analytics Error:",
            error
        );


        res.status(500).json({

            success: false,


            message:
                "Failed to load admin analytics"

        });

    }

};



// ==========================================
// GET ALL USERS FOR ADMIN
// ==========================================

export const getAdminUsers = async (req, res) => {

    try {

        const users = await User.find({})
            .select(
                "_id name email role subscription status createdAt"
            )
            .sort({
                createdAt: -1
            });


        const formattedUsers =
            users.map((user) => ({

                id: user._id,

                name:
                    user.name || "Unknown User",

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

                // Existing users without status
                // are treated as Active
                status:
                    user.status === "suspended"
                        ? "Suspended"
                        : "Active"

            }));


        res.status(200).json({

            success: true,

            data: formattedUsers

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


// ==========================================
// UPDATE USER STATUS
// ==========================================

export const updateUserStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;


        // -------------------------------
        // VALIDATE STATUS
        // -------------------------------

        if (
            !["active", "suspended"].includes(status)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid user status"

            });

        }


        // -------------------------------
        // FIND USER
        // -------------------------------

        const user =
            await User.findById(id);


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"

            });

        }


        // -------------------------------
        // PREVENT ADMIN SUSPENSION
        // -------------------------------

        if (user.role === "admin") {

            return res.status(403).json({

                success: false,

                message:
                    "Admin users cannot be suspended"

            });

        }


        // -------------------------------
        // UPDATE STATUS
        // -------------------------------

        user.status = status;

        await user.save();


        // -------------------------------
        // RESPONSE
        // -------------------------------

        res.status(200).json({

            success: true,

            message:
                status === "suspended"
                    ? "User suspended successfully"
                    : "User activated successfully",

            data: {

                id: user._id,

                status:
                    user.status === "suspended"
                        ? "Suspended"
                        : "Active"

            }

        });

    }

    catch (error) {

        console.error(
            "Update User Status Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to update user status"

        });

    }
};


// ==========================================
// DELETE USER
// ==========================================

export const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;


        const user =
            await User.findById(id);


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"

            });

        }


        // Prevent deleting admin
        if (user.role === "admin") {

            return res.status(403).json({

                success: false,

                message:
                    "Admin users cannot be deleted"

            });

        }


        await User.findByIdAndDelete(id);


        res.status(200).json({

            success: true,

            message:
                "User deleted successfully"

        });

    }

    catch (error) {

        console.error(
            "Delete User Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to delete user"

        });

    }
};