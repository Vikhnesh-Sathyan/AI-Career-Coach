import { useEffect, useState } from "react";

import {
    FaUsers,
    FaBriefcase,
    FaBuilding,
    FaCalendarAlt,
    FaFilter,
    FaSyncAlt
} from "react-icons/fa";

import {
    getAllApplications,
    updateApplicationStatus
} from "../services/applicationService";

import AdminLayout from "../components/admin/AdminLayout";

import "../styles/adminapplications.css";


function AdminApplications() {

    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");


    // ==========================================
    // LOAD APPLICATIONS
    // ==========================================

    const loadApplications = async () => {

        try {

            setLoading(true);

            setError("");


            const data =
                await getAllApplications();


            if (data.success) {

                setApplications(
                    data.data || []
                );

            }

            else {

                setError(
                    data.message ||
                    "Failed to load applications."
                );

            }

        }

        catch (error) {

            console.error(
                "Load Applications Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load applications."
            );

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadApplications();

    }, []);


    // ==========================================
    // UPDATE STATUS
    // ==========================================

    const handleStatusChange = async (
        applicationId,
        status
    ) => {

        try {

            const data =
                await updateApplicationStatus(
                    applicationId,
                    status
                );


            if (data.success) {

                setApplications(
                    previous =>
                        previous.map(
                            application =>
                                application._id ===
                                applicationId
                                    ? {
                                        ...application,
                                        status
                                    }
                                    : application
                        )
                );

            }

            else {

                alert(
                    data.message ||
                    "Failed to update status."
                );

            }

        }

        catch (error) {

            console.error(
                "Update Status Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update application status."
            );

        }

    };

    
    // ==========================================
    // FILTER APPLICATIONS
    // ==========================================

    const filteredApplications =
        statusFilter === "All"
            ? applications
            : applications.filter(
                application =>
                    application.status ===
                    statusFilter
            );


    // ==========================================
    // STATUS CLASS
    // ==========================================

    const getStatusClass = (status) => {

        switch (status) {

            case "Shortlisted":
                return "shortlisted";

            case "Interview":
                return "interview";

            case "Selected":
                return "selected";

            case "Rejected":
                return "rejected";

            default:
                return "applied";

        }

    };


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        if (!date) {

            return "—";

        }

        return new Date(date)
            .toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <AdminLayout>

                <div className="admin-applications">

                    <div className="admin-applications-message">

                        <FaSyncAlt />

                        <p>
                            Loading applications...
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

                <div className="admin-applications">

                    <div className="admin-applications-message error">

                        <FaUsers />

                        <h3>
                            Unable to load applications
                        </h3>

                        <p>
                            {error}
                        </p>

                        <button
                            onClick={loadApplications}
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </AdminLayout>

        );

    }


    return (

        <AdminLayout>

            <div className="admin-applications">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="admin-applications-header">

                    <div>

                        <h1>
                            Applications
                        </h1>

                        <p>
                            Review applicants and manage
                            their selection process.
                        </p>

                    </div>


                    <button
                        className="refresh-applications-btn"
                        onClick={loadApplications}
                    >

                        <FaSyncAlt />

                        Refresh

                    </button>

                </div>


                {/* =================================
                    SUMMARY
                ================================= */}

                <div className="admin-applications-summary">


                    <div className="admin-application-stat">

                        <span>
                            Total Applications
                        </span>

                        <strong>
                            {applications.length}
                        </strong>

                    </div>


                    <div className="admin-application-stat">

                        <span>
                            Shortlisted
                        </span>

                        <strong>
                            {
                                applications.filter(
                                    application =>
                                        application.status ===
                                        "Shortlisted"
                                ).length
                            }
                        </strong>

                    </div>


                    <div className="admin-application-stat">

                        <span>
                            Interviews
                        </span>

                        <strong>
                            {
                                applications.filter(
                                    application =>
                                        application.status ===
                                        "Interview"
                                ).length
                            }
                        </strong>

                    </div>


                    <div className="admin-application-stat">

                        <span>
                            Selected
                        </span>

                        <strong>
                            {
                                applications.filter(
                                    application =>
                                        application.status ===
                                        "Selected"
                                ).length
                            }
                        </strong>

                    </div>


                </div>
                {/* =================================
    APPLICATION STATUS CHART
================================= */}

<div className="application-status-chart">

    <h2>Application Status</h2>

    <div className="status-chart">

        {[
            "Applied",
            "Shortlisted",
            "Interview",
            "Selected",
            "Rejected"
        ].map((status) => {

            const count =
                applications.filter(
                    application =>
                        application.status === status
                ).length;

            const maxCount = Math.max(
                ...[
                    "Applied",
                    "Shortlisted",
                    "Interview",
                    "Selected",
                    "Rejected"
                ].map(status =>
                    applications.filter(
                        application =>
                            application.status === status
                    ).length
                ),
                1
            );

            const height =
                count === 0
                    ? 5
                    : Math.max(
                        10,
                        (count / maxCount) * 100
                    );

            return (
                <div
                    className="status-chart-item"
                    key={status}
                >

                    <span className="status-chart-value">
                        {count}
                    </span>

                    <div className="status-chart-bar-container">

                        <div
                            className={`status-chart-bar ${
                                status
                                    .toLowerCase()
                                    .replace(" ", "-")
                            }`}
                            style={{
                                height: `${height}%`
                            }}
                        />

                    </div>

                    <span className="status-chart-label">
                        {status}
                    </span>

                </div>
            );

        })}

    </div>

</div>

                {/* =================================
                    FILTER
                ================================= */}

                <div className="admin-applications-toolbar">

                    <div className="applications-filter">

                        <FaFilter />

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                        >

                            <option value="All">
                                All Applications
                            </option>

                            <option value="Applied">
                                Applied
                            </option>

                            <option value="Shortlisted">
                                Shortlisted
                            </option>

                            <option value="Interview">
                                Interview
                            </option>

                            <option value="Selected">
                                Selected
                            </option>

                            <option value="Rejected">
                                Rejected
                            </option>

                        </select>

                    </div>


                    <span className="application-result-count">

                        Showing{" "}
                        {filteredApplications.length}
                        {" "}applications

                    </span>

                </div>


                {/* =================================
                    APPLICATION LIST
                ================================= */}

                {filteredApplications.length === 0 ? (

                    <div className="admin-applications-empty">

                        <FaUsers />

                        <h3>
                            No applications found
                        </h3>

                        <p>
                            There are no applications
                            matching this filter.
                        </p>

                    </div>

                ) : (

                    <div className="admin-applications-list">

                        {filteredApplications.map(
                            (application) => {

                                const applicant =
                                    application.applicant;

                                const job =
                                    application.job;


                                return (

                                    <div
                                        className="admin-application-card"
                                        key={
                                            application._id
                                        }
                                    >


                                        {/* APPLICANT */}

                                        <div className="admin-applicant-info">

                                            <div className="admin-applicant-avatar">

                                                {applicant?.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                    "U"}

                                            </div>


                                            <div>

                                                <h3>
                                                    {
                                                        applicant?.name ||
                                                        "Unknown applicant"
                                                    }
                                                </h3>

                                                <p>
                                                    {
                                                        applicant?.email ||
                                                        "No email"
                                                    }
                                                </p>

                                            </div>

                                        </div>


                                        {/* JOB */}

                                        <div className="admin-application-job">

                                            <div className="admin-application-job-title">

                                                <FaBriefcase />

                                                <strong>
                                                    {
                                                        job?.title ||
                                                        "Job unavailable"
                                                    }
                                                </strong>

                                            </div>


                                            <div className="admin-application-company">

                                                <FaBuilding />

                                                <span>
                                                    {
                                                        job?.company ||
                                                        "Unknown company"
                                                    }
                                                </span>

                                            </div>

                                        </div>


                                        {/* DATE */}

                                        <div className="admin-application-date">

                                            <FaCalendarAlt />

                                            <span>
                                                {
                                                    formatDate(
                                                        application.createdAt
                                                    )
                                                }
                                            </span>

                                        </div>


                                        {/* STATUS */}

                                        <div className="admin-application-status">

                                            <select
                                                className={
                                                    `admin-status-select ${
                                                        getStatusClass(
                                                            application.status
                                                        )
                                                    }`
                                                }

                                                value={
                                                    application.status
                                                }

                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        application._id,
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="Applied">
                                                    Applied
                                                </option>

                                                <option value="Shortlisted">
                                                    Shortlisted
                                                </option>

                                                <option value="Interview">
                                                    Interview
                                                </option>

                                                <option value="Selected">
                                                    Selected
                                                </option>

                                                <option value="Rejected">
                                                    Rejected
                                                </option>

                                            </select>

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </div>

        </AdminLayout>

    );

}


export default AdminApplications;