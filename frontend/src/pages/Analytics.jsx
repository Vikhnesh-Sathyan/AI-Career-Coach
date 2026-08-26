import { useEffect, useState } from "react";

import {
    FaUsers,
    FaCrown,
    FaBriefcase,
    FaFileAlt,
    FaSyncAlt
} from "react-icons/fa";

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

import AdminLayout from "../components/admin/AdminLayout";

import {
    getAdminAnalytics
} from "../services/analyticsService";

import "../styles/analytics.css";


function Analytics() {

    // ==========================================
    // STATE
    // ==========================================

    const [analytics, setAnalytics] = useState({

        overview: {

            totalUsers: 0,

            premiumUsers: 0,

            totalJobs: 0,

            openJobs: 0,

            closedJobs: 0,

            totalApplications: 0

        },

        applicationsByStatus: {},

        monthlyApplications: [],

        topCompanies: []

    });


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    // ==========================================
    // LOAD ANALYTICS
    // ==========================================

    const loadAnalytics = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await getAdminAnalytics();


            if (response?.success) {

                setAnalytics(
                    response.data
                );

            }

            else {

                setError(
                    response?.message ||
                    "Failed to load analytics."
                );

            }

        }

        catch (error) {

            console.error(
                "Analytics page error:",
                error
            );


            setError(
                "Failed to load analytics."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        loadAnalytics();

    }, []);


    // ==========================================
    // APPLICATION STATUS DATA
    // ==========================================

    const applicationStatusData = [

        {
            status: "Applied",

            count:
                analytics
                    .applicationsByStatus
                    ?.Applied || 0
        },

        {
            status: "Shortlisted",

            count:
                analytics
                    .applicationsByStatus
                    ?.Shortlisted || 0
        },

        {
            status: "Assessment",

            count:
                analytics
                    .applicationsByStatus
                    ?.Assessment || 0
        },

        {
            status: "Interview",

            count:
                analytics
                    .applicationsByStatus
                    ?.Interview || 0
        },

        {
            status: "Offer",

            count:
                analytics
                    .applicationsByStatus
                    ?.Offer || 0
        },

        {
            status: "Selected",

            count:
                analytics
                    .applicationsByStatus
                    ?.Selected || 0
        },

        {
            status: "Rejected",

            count:
                analytics
                    .applicationsByStatus
                    ?.Rejected || 0
        }

    ];


    // ==========================================
    // JOB STATUS DATA
    // ==========================================

    const jobStatusData = [

        {
            name: "Open",

            value:
                analytics
                    .overview
                    ?.openJobs || 0
        },

        {
            name: "Closed",

            value:
                analytics
                    .overview
                    ?.closedJobs || 0
        }

    ];


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <AdminLayout>

                <div className="analytics-page">

                    <div className="analytics-message">

                        <FaSyncAlt />

                        <p>
                            Loading analytics...
                        </p>

                    </div>

                </div>

            </AdminLayout>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <AdminLayout>

                <div className="analytics-page">

                    <div className="analytics-message error">

                        <FaFileAlt />

                        <h3>
                            Unable to load analytics
                        </h3>

                        <p>
                            {error}
                        </p>

                        <button
                            onClick={loadAnalytics}
                        >

                            <FaSyncAlt />

                            Try Again

                        </button>

                    </div>

                </div>

            </AdminLayout>

        );

    }


    // ==========================================
    // DASHBOARD
    // ==========================================

    return (

        <AdminLayout>

            <div className="analytics-page">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="analytics-header">

                    <div>

                        <span className="analytics-label">

                            ADMIN ANALYTICS

                        </span>


                        <h1>
                            Platform Analytics
                        </h1>


                        <p>

                            Monitor users, jobs and
                            application activity across
                            CareerCoach.

                        </p>

                    </div>


                    <button
                        className="analytics-refresh-btn"
                        onClick={loadAnalytics}
                    >

                        <FaSyncAlt />

                        Refresh

                    </button>

                </div>


                {/* ==================================
                    OVERVIEW CARDS
                ================================== */}

                <section className="analytics-stats">


                    {/* USERS */}

                    <div className="analytics-stat-card">

                        <div className="analytics-stat-icon">

                            <FaUsers />

                        </div>


                        <div>

                            <span>
                                Total Users
                            </span>

                            <h2>

                                {
                                    analytics
                                        .overview
                                        .totalUsers
                                }

                            </h2>

                        </div>

                    </div>


                    {/* PREMIUM */}

                    <div className="analytics-stat-card">

                        <div className="analytics-stat-icon">

                            <FaCrown />

                        </div>


                        <div>

                            <span>
                                Premium Users
                            </span>

                            <h2>

                                {
                                    analytics
                                        .overview
                                        .premiumUsers
                                }

                            </h2>

                        </div>

                    </div>


                    {/* JOBS */}

                    <div className="analytics-stat-card">

                        <div className="analytics-stat-icon">

                            <FaBriefcase />

                        </div>


                        <div>

                            <span>
                                Total Jobs
                            </span>

                            <h2>

                                {
                                    analytics
                                        .overview
                                        .totalJobs
                                }

                            </h2>

                        </div>

                    </div>


                    {/* APPLICATIONS */}

                    <div className="analytics-stat-card">

                        <div className="analytics-stat-icon">

                            <FaFileAlt />

                        </div>


                        <div>

                            <span>
                                Applications
                            </span>

                            <h2>

                                {
                                    analytics
                                        .overview
                                        .totalApplications
                                }

                            </h2>

                        </div>

                    </div>


                </section>


                {/* ==================================
                    CHART GRID
                ================================== */}

                <section className="analytics-chart-grid">


                    {/* ==================================
                        APPLICATION STATUS
                    ================================== */}

                    <div className="analytics-chart-card">

                        <div className="analytics-chart-heading">

                            <div>

                                <span>
                                    APPLICATION PIPELINE
                                </span>

                                <h2>
                                    Applications by Status
                                </h2>

                            </div>

                        </div>


                        <div className="analytics-chart">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={
                                        applicationStatusData
                                    }
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />

                                    <XAxis
                                        dataKey="status"
                                    />

                                    <YAxis
                                        allowDecimals={false}
                                    />

                                    <Tooltip />

                                    <Bar
                                        dataKey="count"
                                        radius={[
                                            8,
                                            8,
                                            0,
                                            0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>


                    {/* ==================================
                        JOB STATUS
                    ================================== */}

                    <div className="analytics-chart-card">

                        <div className="analytics-chart-heading">

                            <div>

                                <span>
                                    JOB STATUS
                                </span>

                                <h2>
                                    Open vs Closed Jobs
                                </h2>

                            </div>

                        </div>


                        <div className="analytics-pie-chart">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={
                                            jobStatusData
                                        }
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >

                                        {
                                            jobStatusData.map(
                                                (
                                                    entry,
                                                    index
                                                ) => (

                                                    <Cell
                                                        key={
                                                            `cell-${index}`
                                                        }
                                                    />

                                                )
                                            )
                                        }

                                    </Pie>


                                    <Tooltip />


                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>


                </section>


                {/* ==================================
                    MONTHLY APPLICATIONS
                ================================== */}

                <section className="analytics-wide-card">

                    <div className="analytics-chart-heading">

                        <div>

                            <span>
                                APPLICATION TREND
                            </span>

                            <h2>
                                Monthly Applications
                            </h2>

                        </div>

                    </div>


                    <div className="analytics-line-chart">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <LineChart
                                data={
                                    analytics
                                        .monthlyApplications
                                }
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="month"
                                />

                                <YAxis
                                    allowDecimals={false}
                                />

                                <Tooltip />


                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    strokeWidth={3}
                                    dot={{
                                        r: 4
                                    }}
                                    activeDot={{
                                        r: 7
                                    }}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </section>


                {/* ==================================
                    BOTTOM GRID
                ================================== */}

                <section className="analytics-bottom-grid">


                    {/* TOP COMPANIES */}

                    <div className="analytics-table-card">

                        <div className="analytics-chart-heading">

                            <div>

                                <span>
                                    JOB MARKET
                                </span>

                                <h2>
                                    Top Hiring Companies
                                </h2>

                            </div>

                        </div>


                        {
                            analytics
                                .topCompanies
                                ?.length > 0 ? (

                                <div className="analytics-company-list">

                                    {
                                        analytics
                                            .topCompanies
                                            .map(
                                                (
                                                    company,
                                                    index
                                                ) => (

                                                    <div
                                                        className="analytics-company-item"
                                                        key={
                                                            company._id ||
                                                            index
                                                        }
                                                    >

                                                        <span className="company-rank">

                                                            {
                                                                index + 1
                                                            }

                                                        </span>


                                                        <div>

                                                            <strong>

                                                                {
                                                                    company._id ||
                                                                    "Unknown Company"
                                                                }

                                                            </strong>


                                                            <small>

                                                                {
                                                                    company.jobs
                                                                }

                                                                {" "}

                                                                {
                                                                    company.jobs === 1
                                                                        ? "job"
                                                                        : "jobs"
                                                                }

                                                            </small>

                                                        </div>

                                                    </div>

                                                )
                                            )
                                    }

                                </div>

                            ) : (

                                <div className="analytics-empty">

                                    No job data available.

                                </div>

                            )
                        }

                    </div>


                    {/* JOB SUMMARY */}

                    <div className="analytics-table-card">

                        <div className="analytics-chart-heading">

                            <div>

                                <span>
                                    JOB OVERVIEW
                                </span>

                                <h2>
                                    Job Availability
                                </h2>

                            </div>

                        </div>


                        <div className="analytics-job-summary">


                            <div>

                                <span>
                                    Total Jobs
                                </span>

                                <strong>

                                    {
                                        analytics
                                            .overview
                                            .totalJobs
                                    }

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Open Jobs
                                </span>

                                <strong>

                                    {
                                        analytics
                                            .overview
                                            .openJobs
                                    }

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Closed Jobs
                                </span>

                                <strong>

                                    {
                                        analytics
                                            .overview
                                            .closedJobs
                                    }

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Premium Users
                                </span>

                                <strong>

                                    {
                                        analytics
                                            .overview
                                            .premiumUsers
                                    }

                                </strong>

                            </div>

                        </div>

                    </div>

                </section>


            </div>

        </AdminLayout>

    );

}


export default Analytics;
