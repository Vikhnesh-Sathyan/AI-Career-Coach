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

function AdminDashboard() {

    const stats = [

        {
            title: "Total Users",
            value: "2,340",
            growth: "+12%",
            icon: <FaUsers />,
            description: "Registered users",
            className: "users-card"
        },

        {
            title: "Premium Users",
            value: "528",
            growth: "+8%",
            icon: <FaCrown />,
            description: "Active subscriptions",
            className: "premium-card"
        },

        {
            title: "Job Applications",
            value: "942",
            growth: "+15%",
            icon: <FaBriefcase />,
            description: "Tracked applications",
            className: "jobs-card"
        },

        {
            title: "AI Usage",
            value: "18.4K",
            growth: "+32%",
            icon: <FaBrain />,
            description: "AI interactions",
            className: "ai-usage-card"
        }

    ];

    const activities = [

        {
            icon: <FaUserPlus />,
            title: "New user registered",
            description: "A new account was created",
            time: "2 min ago"
        },

        {
            icon: <FaFileAlt />,
            title: "Resume analyzed",
            description: "AI resume analysis completed",
            time: "8 min ago"
        },

        {
            icon: <FaCreditCard />,
            title: "Premium subscription",
            description: "New premium subscription purchased",
            time: "18 min ago"
        },

        {
            icon: <FaBriefcase />,
            title: "Job application added",
            description: "New application added to tracker",
            time: "1 hour ago"
        }

    ];

    return (

        <AdminLayout>

            <div className="admin-dashboard">

                {/* =========================
                    WELCOME SECTION
                ========================== */}

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

                        <span className="welcome-label">
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
                            scale: [1, 1.08, 1],
                            rotate: [0, 8, 0]
                        }}

                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                </motion.section>


                {/* =========================
                    STATISTICS
                ========================== */}

                <section className="admin-stats">

                    {stats.map((stat, index) => (

                        <motion.div
                            key={stat.title}

                            className={`admin-stat-card ${stat.className}`}

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
                                delay: index * 0.1
                            }}

                            whileHover={{
                                y: -8,
                                scale: 1.02
                            }}
                        >

                            <div className="stat-top">

                                <div className="stat-icon">

                                    {stat.icon}

                                </div>

                                <span className="stat-growth">

                                    <FaArrowUp />

                                    {stat.growth}

                                </span>

                            </div>

                            <div className="stat-content">

                                <p>
                                    {stat.title}
                                </p>

                                <h2>
                                    {stat.value}
                                </h2>

                                <span>
                                    {stat.description}
                                </span>

                            </div>

                            <div className="stat-glow" />

                        </motion.div>

                    ))}

                </section>


                {/* =========================
                    MAIN DASHBOARD GRID
                ========================== */}

                <section className="admin-main-grid">


                    {/* =====================
                        ANALYTICS CARD
                    ====================== */}

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

                        <div className="section-heading">

                            <div>

                                <span>
                                    OVERVIEW
                                </span>

                                <h2>
                                    Platform Growth
                                </h2>

                            </div>

                            <button>
                                Last 7 days
                            </button>

                        </div>


                        <div className="fake-chart">

                            <div className="chart-grid">

                                <span />
                                <span />
                                <span />
                                <span />

                            </div>

                            <div className="chart-bars">

                                {[45, 62, 52, 78, 68, 88, 74].map(
                                    (height, index) => (

                                        <motion.div
                                            key={index}
                                            className="chart-bar"

                                            initial={{
                                                height: 0
                                            }}

                                            animate={{
                                                height: `${height}%`
                                            }}

                                            transition={{
                                                duration: 0.8,
                                                delay:
                                                    0.5 +
                                                    index * 0.08
                                            }}
                                        >

                                            <span />

                                        </motion.div>

                                    )
                                )}

                            </div>

                            <div className="chart-labels">

                                <span>
                                    Mon
                                </span>

                                <span>
                                    Tue
                                </span>

                                <span>
                                    Wed
                                </span>

                                <span>
                                    Thu
                                </span>

                                <span>
                                    Fri
                                </span>

                                <span>
                                    Sat
                                </span>

                                <span>
                                    Sun
                                </span>

                            </div>

                        </div>

                    </motion.div>


                    {/* =====================
                        RECENT ACTIVITY
                    ====================== */}

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

                        <div className="section-heading">

                            <div>

                                <span>
                                    LIVE FEED
                                </span>

                                <h2>
                                    Recent Activity
                                </h2>

                            </div>

                            <div className="live-dot">
                                ● Live
                            </div>

                        </div>


                        <div className="activity-list">

                            {activities.map(
                                (activity, index) => (

                                    <motion.div
                                        key={activity.title}
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
                                                index * 0.1
                                        }}
                                    >

                                        <div className="activity-icon">

                                            {activity.icon}

                                        </div>

                                        <div className="activity-info">

                                            <h4>
                                                {activity.title}
                                            </h4>

                                            <p>
                                                {activity.description}
                                            </p>

                                        </div>

                                        <span className="activity-time">

                                            {activity.time}

                                        </span>

                                    </motion.div>

                                )
                            )}

                        </div>

                    </motion.div>

                </section>


                {/* =========================
                    BOTTOM INSIGHT
                ========================== */}

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

                    <div className="insight-icon">

                        <FaBrain />

                    </div>

                    <div>

                        <span>
                            AI INSIGHT
                        </span>

                        <h3>
                            AI activity increased by 32% this week.
                        </h3>

                        <p>
                            Resume analysis and interview preparation
                            are currently the most used AI features.
                        </p>

                    </div>

                    <motion.div
                        className="insight-pulse"

                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.4, 0.1, 0.4]
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