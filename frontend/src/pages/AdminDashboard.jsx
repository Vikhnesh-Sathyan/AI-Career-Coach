import { motion } from "framer-motion";

import {
    FaUsers,
    FaCrown,
    FaBriefcase,
    FaBrain,
    FaArrowUp,
    FaUserPlus,
    FaFileAlt,
    FaCreditCard
} from "react-icons/fa";

import AdminLayout from "../components/admin/AdminLayout";

import "../styles/admindashboard.css";

import { useEffect, useState } from "react";

import { getAdminStats } from "../services/adminService";


function AdminDashboard() {

    // =========================================
    // ADMIN STATS
    // =========================================

    const [adminData, setAdminData] = useState({

        totalUsers: 0,

        premiumUsers: 0,

        totalApplications: 0,

        interviews: 0,

        offers: 0,

        rejected: 0

    });


    const [loading, setLoading] = useState(true);


    // =========================================
    // LOAD ADMIN DATA
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


                if (response.success) {

                    setAdminData(
                        response.data
                    );

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
    // DASHBOARD STAT CARDS
    // =========================================

    const stats = [

        {
            title: "Total Users",

            value:
                adminData.totalUsers,

            growth: "+12%",

            icon: <FaUsers />,

            description:
                "Registered users",

            className:
                "users-card"

        },


        {
            title: "Premium Users",

            value:
                adminData.premiumUsers,

            growth: "+8%",

            icon: <FaCrown />,

            description:
                "Active subscriptions",

            className:
                "premium-card"

        },


        {
            title: "Job Applications",

            value:
                adminData.totalApplications,

            growth: "+15%",

            icon: <FaBriefcase />,

            description:
                "Tracked applications",

            className:
                "jobs-card"

        },


        {
            title: "Interviews",

            value:
                adminData.interviews,

            growth: "+18%",

            icon: <FaBrain />,

            description:
                "Interview stage",

            className:
                "ai-usage-card"

        }

    ];


    // =========================================
    // RECENT ACTIVITY
    // =========================================

    const activities = [

        {
            icon: <FaUserPlus />,

            title:
                "User activity",

            description:
                `${adminData.totalUsers} users registered`,

            time:
                "Platform"
        },


        {
            icon: <FaFileAlt />,

            title:
                "Applications tracked",

            description:
                `${adminData.totalApplications} applications in system`,

            time:
                "Tracker"
        },


        {
            icon: <FaCreditCard />,

            title:
                "Premium users",

            description:
                `${adminData.premiumUsers} active premium users`,

            time:
                "Subscription"
        },


        {
            icon: <FaBriefcase />,

            title:
                "Interview pipeline",

            description:
                `${adminData.interviews} users reached interview stage`,

            time:
                "Career"
        }

    ];


    // =========================================
    // LOADING SCREEN
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
                ================================== */}

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
                ================================== */}

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

                                        <FaArrowUp />

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
                ================================== */}

                <section
                    className="admin-main-grid"
                >


                    {/* =================================
                        ANALYTICS
                    ================================== */}

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
                                    OVERVIEW
                                </span>

                                <h2>
                                    Application Pipeline
                                </h2>

                            </div>


                            <button>
                                Current
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

                                {

                                    [

                                        adminData.totalApplications,

                                        adminData.interviews,

                                        adminData.offers,

                                        adminData.rejected,

                                        adminData.premiumUsers,

                                        adminData.totalUsers,

                                        adminData.interviews

                                    ].map(

                                        (
                                            value,
                                            index
                                        ) => {


                                            const maxValue =
                                                Math.max(
                                                    adminData.totalUsers,
                                                    adminData.totalApplications,
                                                    adminData.premiumUsers,
                                                    1
                                                );


                                            const height =
                                                Math.max(
                                                    8,
                                                    Math.min(
                                                        100,
                                                        (
                                                            value /
                                                            maxValue
                                                        ) * 100
                                                    )
                                                );


                                            return (

                                                <motion.div

                                                    key={index}

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

                                                >

                                                    <span />

                                                </motion.div>

                                            );

                                        }

                                    )

                                }

                            </div>


                            <div
                                className="chart-labels"
                            >

                                <span>
                                    Apps
                                </span>

                                <span>
                                    Interview
                                </span>

                                <span>
                                    Offers
                                </span>

                                <span>
                                    Rejected
                                </span>

                                <span>
                                    Premium
                                </span>

                                <span>
                                    Users
                                </span>

                                <span>
                                    Interview
                                </span>

                            </div>

                        </div>

                    </motion.div>



                    {/* =================================
                        RECENT ACTIVITY
                    ================================== */}

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

                            {

                                activities.map(
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
                                )

                            }

                        </div>

                    </motion.div>

                </section>



                {/* =================================
                    BOTTOM INSIGHT
                ================================== */}

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

                                adminData.interviews >
                                0

                                    ?

                                    `${adminData.interviews} active interview-stage applications are currently being tracked.`

                                    :

                                    "No interview-stage applications yet."

                            }

                        </h3>


                        <p>

                            {

                                adminData.offers >
                                0

                                    ?

                                    `${adminData.offers} offer-stage applications are currently recorded in the platform.`

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