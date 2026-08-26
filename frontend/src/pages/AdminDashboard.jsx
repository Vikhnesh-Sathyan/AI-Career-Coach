import { motion } from "framer-motion";
import {Link} from "react-router-dom"

import {
    FaUsers,
    FaCrown,
    FaBriefcase,
    FaBrain,
    FaUserPlus,
    FaFileAlt,
    FaCreditCard
} from "react-icons/fa";

import { useEffect, useState } from "react";

import AdminLayout from "../components/admin/AdminLayout";

import { getAdminStats } from "../services/adminService";

import "../styles/admindashboard.css";


function AdminDashboard() {

    // =========================================
    // ADMIN DATA
    // =========================================

 const [adminData, setAdminData] = useState({

    totalUsers: 0,

    premiumUsers: 0,

    totalJobs: 0,

    openJobs: 0,

    closedJobs: 0,

    totalApplications: 0,

    applied: 0,

    shortlisted: 0,

    assessment: 0,

    interviews: 0,

    offers: 0,

    rejected: 0,

    accepted: 0

});


    const [loading, setLoading] = useState(true);


    // =========================================
    // LOAD ADMIN STATS
    // =========================================

    useEffect(() => {

        const loadAdminStats = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                if (!token) {

                    setLoading(false);

                    return;

                }


                const response =
                    await getAdminStats(token);


   if (response?.success) {

    setAdminData({

        totalUsers:
            response.data?.totalUsers ?? 0,

        premiumUsers:
            response.data?.premiumUsers ?? 0,

        totalJobs:
            response.data?.totalJobs ?? 0,

        openJobs:
            response.data?.openJobs ?? 0,

        closedJobs:
            response.data?.closedJobs ?? 0,

        totalApplications:
            response.data?.totalApplications ?? 0,

        applied:
            response.data?.applied ?? 0,

        shortlisted:
            response.data?.shortlisted ?? 0,

        assessment:
            response.data?.assessment ?? 0,

        interviews:
            response.data?.interviews ?? 0,

        offers:
            response.data?.offers ?? 0,

        rejected:
            response.data?.rejected ?? 0,

        accepted:
            response.data?.accepted ?? 0

    });

}

            }

            catch (error) {

                console.error(
                    "Admin dashboard error:",
                    error
                );

            }

            finally {

                setLoading(false);

            }

        };


        loadAdminStats();

    }, []);


    // =========================================
    // STAT CARDS
    // =========================================

    const stats = [

        {
            title: "Total Users",

            value:
                adminData.totalUsers,

            growth: "Live",

            icon:
                <FaUsers />,

            description:
                "Registered users",

            className:
                "users-card"

        },


        {
            title: "Premium Users",

            value:
                adminData.premiumUsers,

            growth: "Live",

            icon:
                <FaCrown />,

            description:
                "Active subscriptions",

            className:
                "premium-card"

        },


        {
            title: "Job Applications",

            value:
                adminData.totalApplications,

            growth: "Live",

            icon:
                <FaBriefcase />,

            description:
                "Tracked applications",

            className:
                "jobs-card"

        },


        {
            title: "Interviews",

            value:
                adminData.interviews,

            growth: "Live",

            icon:
                <FaBrain />,

            description:
                "Interview-stage applications",

            className:
                "ai-usage-card"

        }

    ];


    // =========================================
    // SYSTEM ACTIVITY
    // =========================================

    const activities = [

        {
            icon:
                <FaUserPlus />,

            title:
                "User activity",

            description:
                `${adminData.totalUsers} users currently registered`,

            time:
                "Platform"

        },


        {
            icon:
                <FaFileAlt />,

            title:
                "Application tracking",

            description:
                `${adminData.totalApplications} applications recorded`,

            time:
                "Tracker"

        },


        {
            icon:
                <FaCreditCard />,

            title:
                "Premium subscriptions",

            description:
                `${adminData.premiumUsers} active premium users`,

            time:
                "Billing"

        },


        {
            icon:
                <FaBriefcase />,

            title:
                "Interview pipeline",

            description:
                `${adminData.interviews} applications at interview stage`,

            time:
                "Career"

        }

    ];


    // =========================================
    // APPLICATION PIPELINE
    // =========================================

    const pipeline = [

        {
            label: "Applied",
            value: adminData.applied
        },

        {
            label: "Shortlisted",
            value: adminData.shortlisted
        },

        {
            label: "Assessment",
            value: adminData.assessment
        },

        {
            label: "Interview",
            value: adminData.interviews
        },

        {
            label: "Offer",
            value: adminData.offers
        },

        {
            label: "Rejected",
            value: adminData.rejected
        },

        {
            label: "Accepted",
            value: adminData.accepted
        }

    ];


    // Find largest pipeline value

    const maxPipelineValue =
        Math.max(

            ...pipeline.map(
                item => item.value
            ),

            1

        );


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <AdminLayout>

                <div className="admin-dashboard-loading">

                    <div className="admin-loader"></div>

                    <p>
                        Loading admin dashboard...
                    </p>

                </div>

            </AdminLayout>

        );

    }


    // =========================================
    // DASHBOARD
    // =========================================

    return (

        <AdminLayout>

            <div className="admin-dashboard">


                {/* =================================
                    WELCOME
                ================================= */}

                <motion.section

                    className="admin-welcome"

                    initial={{
                        opacity: 0,
                        y: 25
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        duration: 0.6
                    }}

                >

                    <div>

                        <span
                            className="welcome-label"
                        >
                            ADMIN CONTROL CENTER
                        </span>


                        <h1>
                            Good morning, Admin 👋
                        </h1>


                        <p>
                            Here's what's happening across
                            CareerCoach today.
                        </p>

                    </div>


                    <motion.div

                        className="welcome-orb"

                        animate={{

                            scale: [
                                1,
                                1.08,
                                1
                            ],

                            rotate: [
                                0,
                                8,
                                0
                            ]

                        }}

                        transition={{

                            duration: 5,

                            repeat: Infinity,

                            ease: "easeInOut"

                        }}

                    />

                </motion.section>



                {/* =================================
                    STATISTICS
                ================================= */}

                <section className="admin-stats">

                    {stats.map(
                        (stat, index) => (

                            <motion.div

                                key={
                                    stat.title
                                }

                                className={
                                    `admin-stat-card ${stat.className}`
                                }

                                initial={{
                                    opacity: 0,
                                    y: 35
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}

                                transition={{

                                    duration: 0.5,

                                    delay:
                                        index * 0.1

                                }}

                                whileHover={{

                                    y: -8,

                                    scale: 1.02

                                }}

                            >

                                <div
                                    className="stat-top"
                                >

                                    <div
                                        className="stat-icon"
                                    >

                                        {
                                            stat.icon
                                        }

                                    </div>


                                    <span
                                        className="stat-growth"
                                    >


                                        {
                                            stat.growth
                                        }

                                    </span>

                                </div>


                                <div
                                    className="stat-content"
                                >

                                    <p>
                                        {
                                            stat.title
                                        }
                                    </p>


                                    <h2>
                                        {
                                            stat.value
                                        }
                                    </h2>


                                    <span>
                                        {
                                            stat.description
                                        }
                                    </span>

                                </div>


                                <div
                                    className="stat-glow"
                                />

                            </motion.div>

                        )
                    )}

                </section>



                {/* =================================
                    MAIN GRID
                ================================= */}

                <section
                    className="admin-main-grid"
                >
                {/* =================================
    JOBS OVERVIEW
================================= */}

<motion.section

    className="admin-jobs-chart"

    initial={{
        opacity: 0,
        y: 25
    }}

    animate={{
        opacity: 1,
        y: 0
    }}

    transition={{
        duration: 0.6,
        delay: 0.6
    }}

>

    <div className="section-heading">

        <div>

            <span>
                JOB MANAGEMENT
            </span>

            <h2>
                Jobs Overview
            </h2>

        </div>

        <Link
            to="/admin/jobs"
            className="jobs-chart-link"
        >
            View Jobs →
        </Link>

    </div>


    <div className="jobs-chart">

        <div className="jobs-chart-item">

            <div className="jobs-chart-value">
                {adminData.totalJobs}
            </div>

            <div className="jobs-chart-bar-container">

                <motion.div

                    className="jobs-chart-bar total"

                    initial={{
                        height: 0
                    }}

                    animate={{
                        height:
                            `${adminData.totalJobs > 0 ? 100 : 8}%`
                    }}

                    transition={{
                        duration: 0.8
                    }}

                />

            </div>

            <span>
                Total Jobs
            </span>

        </div>


        <div className="jobs-chart-item">

            <div className="jobs-chart-value">
                {adminData.openJobs}
            </div>

            <div className="jobs-chart-bar-container">

                <motion.div

                    className="jobs-chart-bar open"

                    initial={{
                        height: 0
                    }}

                    animate={{
                        height:
                            adminData.totalJobs === 0
                                ? "8%"
                                : `${Math.max(
                                    8,
                                    (adminData.openJobs /
                                        adminData.totalJobs) *
                                        100
                                )}%`
                    }}

                    transition={{
                        duration: 0.8,
                        delay: 0.1
                    }}

                />

            </div>

            <span>
                Open Jobs
            </span>

        </div>


        <div className="jobs-chart-item">

            <div className="jobs-chart-value">
                {adminData.closedJobs}
            </div>

            <div className="jobs-chart-bar-container">

                <motion.div

                    className="jobs-chart-bar closed"

                    initial={{
                        height: 0
                    }}

                    animate={{
                        height:
                            adminData.totalJobs === 0
                                ? "8%"
                                : `${Math.max(
                                    8,
                                    (adminData.closedJobs /
                                        adminData.totalJobs) *
                                        100
                                )}%`
                    }}

                    transition={{
                        duration: 0.8,
                        delay: 0.2
                    }}

                />

            </div>

            <span>
                Closed Jobs
            </span>

        </div>

    </div>

</motion.section>
                    {/* =================================
                        APPLICATION PIPELINE
                    ================================= */}

                    <motion.div

                        className="analytics-card"

                        initial={{
                            opacity: 0,
                            x: -30
                        }}

                        animate={{
                            opacity: 1,
                            x: 0
                        }}

                        transition={{
                            duration: 0.6,
                            delay: 0.4
                        }}

                    >

                        <div
                            className="section-heading"
                        >

                            <div>

                                <span>
                                    APPLICATION FLOW
                                </span>

                                <h2>
                                    Career Pipeline
                                </h2>

                            </div>


                            <button>
                                Live Data
                            </button>

                        </div>


                        <div
                            className="fake-chart"
                        >

                            <div
                                className="chart-grid"
                            >

                                <span />
                                <span />
                                <span />
                                <span />

                            </div>


                            <div
                                className="chart-bars"
                            >

                                {pipeline.map(
                                    (
                                        item,
                                        index
                                    ) => {

                                        const height =
                                            item.value === 0

                                                ? 8

                                                :

                                                Math.max(

                                                    8,

                                                    (
                                                        item.value /
                                                        maxPipelineValue
                                                    ) * 100

                                                );


                                        return (

                                            <motion.div

                                                key={
                                                    item.label
                                                }

                                                className="chart-bar"

                                                initial={{
                                                    height: 0
                                                }}

                                                animate={{
                                                    height:
                                                        `${height}%`
                                                }}

                                                transition={{

                                                    duration:
                                                        0.8,

                                                    delay:
                                                        0.5 +
                                                        index *
                                                        0.08

                                                }}

                                                title={
                                                    `${item.label}: ${item.value}`
                                                }

                                            >

                                                <span />

                                            </motion.div>

                                        );

                                    }

                                )}

                            </div>


                            <div
                                className="chart-labels"
                            >

                                {pipeline.map(
                                    item => (

                                        <span
                                            key={
                                                item.label
                                            }
                                        >

                                            {
                                                item.label
                                            }

                                        </span>

                                    )
                                )}

                            </div>

                        </div>

                    </motion.div>



                    {/* =================================
                        SYSTEM OVERVIEW
                    ================================= */}

                    <motion.div

                        className="activity-card"

                        initial={{
                            opacity: 0,
                            x: 30
                        }}

                        animate={{
                            opacity: 1,
                            x: 0
                        }}

                        transition={{
                            duration: 0.6,
                            delay: 0.5
                        }}

                    >

                        <div
                            className="section-heading"
                        >

                            <div>

                                <span>
                                    PLATFORM FEED
                                </span>

                                <h2>
                                    System Overview
                                </h2>

                            </div>


                            <div
                                className="live-dot"
                            >

                                ● Live

                            </div>

                        </div>


                        <div
                            className="activity-list"
                        >

                            {activities.map(
                                (
                                    activity,
                                    index
                                ) => (

                                    <motion.div

                                        key={
                                            activity.title
                                        }

                                        className="activity-item"

                                        initial={{
                                            opacity: 0,
                                            x: 20
                                        }}

                                        animate={{
                                            opacity: 1,
                                            x: 0
                                        }}

                                        transition={{
                                            delay:
                                                0.7 +
                                                index *
                                                0.1
                                        }}

                                    >

                                        <div
                                            className="activity-icon"
                                        >

                                            {
                                                activity.icon
                                            }

                                        </div>


                                        <div
                                            className="activity-info"
                                        >

                                            <h4>
                                                {
                                                    activity.title
                                                }
                                            </h4>


                                            <p>
                                                {
                                                    activity.description
                                                }
                                            </p>

                                        </div>


                                        <span
                                            className="activity-time"
                                        >

                                            {
                                                activity.time
                                            }

                                        </span>

                                    </motion.div>

                                )
                            )}

                        </div>

                    </motion.div>

                </section>

            
{/* =================================
    JOB MANAGEMENT
================================= */}

<motion.section

    className="admin-job-management"

    initial={{
        opacity: 0,
        y: 25
    }}

    animate={{
        opacity: 1,
        y: 0
    }}

    transition={{
        duration: 0.6,
        delay: 0.6
    }}

>

    <div className="job-management-content">

        <div className="job-management-icon">
            <FaBriefcase />
        </div>

        <div>

            <span>
                JOB MANAGEMENT
            </span>

            <h2>
                Manage Posted Jobs
            </h2>

            <p>
                Create, manage and publish job opportunities
                for users on the platform.
            </p>

        </div>

    </div>


    <Link
        to="/admin/jobs"
        className="manage-jobs-btn"
    >

        Manage Jobs →

    </Link>

</motion.section>
    



                {/* =================================
                    BOTTOM INSIGHT
                ================================= */}

                <motion.section

                    className="admin-insight"

                    initial={{
                        opacity: 0,
                        y: 25
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        duration: 0.6,
                        delay: 0.7
                    }}

                >

                    <div
                        className="insight-icon"
                    >

                        <FaBrain />

                    </div>


                    <div>

                        <span>
                            PLATFORM INSIGHT
                        </span>


                        <h3>

                            {

                                adminData.interviews > 0

                                    ?

                                    `${adminData.interviews} interview-stage applications are currently being tracked.`

                                    :

                                    "No interview-stage applications yet."

                            }

                        </h3>


                        <p>

                            {

                                adminData.offers > 0

                                    ?

                                    `${adminData.offers} offer-stage applications are currently recorded.`

                                    :

                                    "The platform is ready to start tracking career progress."

                            }

                        </p>

                    </div>


                    <motion.div

                        className="insight-pulse"

                        animate={{

                            scale: [
                                1,
                                1.4,
                                1
                            ],

                            opacity: [
                                0.4,
                                0.1,
                                0.4
                            ]

                        }}

                        transition={{

                            duration: 2,

                            repeat: Infinity

                        }}

                    />

                </motion.section>

            </div>

        </AdminLayout>

    );

}


export default AdminDashboard;