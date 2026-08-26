import User from "../models/User.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";


// ==========================================
// GET ADMIN ANALYTICS
// ==========================================

export const getAdminAnalytics = async (req, res) => {

    try {

        // ==========================================
        // BASIC COUNTS
        // ==========================================

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


        // ==========================================
        // APPLICATION STATUS
        // ==========================================

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


        for (const status of applicationStatuses) {

            applicationsByStatus[status] =
                await JobApplication.countDocuments({
                    status
                });

        }


        // ==========================================
        // MONTHLY APPLICATIONS
        // ==========================================

        const monthlyApplications =
            await JobApplication.aggregate([

                {
                    $group: {

                        _id: {
                            year: {
                                $year: "$createdAt"
                            },

                            month: {
                                $month: "$createdAt"
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


        // ==========================================
        // MONTH NAMES
        // ==========================================

        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];


        const formattedMonthlyApplications =
            monthlyApplications.map(
                item => ({

                    month:
                        monthNames[
                            item._id.month - 1
                        ],

                    year:
                        item._id.year,

                    count:
                        item.count

                })
            );


        // ==========================================
        // TOP COMPANIES
        // ==========================================

        const topCompanies =
            await Job.aggregate([

                {
                    $group: {

                        _id: "$company",

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


        // ==========================================
        // RESPONSE
        // ==========================================

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


                monthlyApplications:
                    formattedMonthlyApplications,


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
                "Failed to load analytics data."

        });

    }

};