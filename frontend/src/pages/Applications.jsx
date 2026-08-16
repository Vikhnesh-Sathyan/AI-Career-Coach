import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaBriefcase,
    FaBuilding,
    FaCalendarAlt,
    FaEye,
    FaInbox
} from "react-icons/fa";

import {
    getMyApplications
} from "../services/applicationService";

import "../styles/applications.css";


function Applications() {

    const navigate = useNavigate();

    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // LOAD APPLICATIONS
    // ==========================================

    const loadApplications = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getMyApplications();


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
                "Failed to load applications:",
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

            <div className="applications-page">

                <div className="applications-message">

                    <p>
                        Loading applications...
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="applications-page">

                <div className="applications-message error">

                    <FaInbox />

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

        );

    }


    return (

        <div className="applications-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="applications-header">

                <div>

                    <h1>
                        My Applications
                    </h1>

                    <p>
                        Track the jobs you have applied for
                        and monitor your application status.
                    </p>

                </div>

            </div>


            {/* =================================
                APPLICATION COUNT
            ================================= */}

            <div className="applications-summary">

                <div className="application-summary-card">

                    <span>
                        Total Applications
                    </span>

                    <strong>
                        {applications.length}
                    </strong>

                </div>

            </div>


            {/* =================================
                APPLICATION LIST
            ================================= */}

            {applications.length === 0 ? (

                <div className="applications-empty">

                    <FaBriefcase />

                    <h3>
                        No applications yet
                    </h3>

                    <p>
                        You haven't applied for any jobs yet.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        Browse Jobs
                    </button>

                </div>

            ) : (

                <div className="applications-list">

                    {applications.map(
                        (application) => {

                            const job =
                                application.job;


                            return (

                                <div
                                    className="application-card"
                                    key={application._id}
                                >


                                    {/* JOB ICON */}

                                    <div className="application-job-icon">

                                        <FaBriefcase />

                                    </div>


                                    {/* JOB INFORMATION */}

                                    <div className="application-job-info">

                                        <h3>
                                            {job?.title ||
                                                "Job unavailable"}
                                        </h3>

                                        <div className="application-company">

                                            <FaBuilding />

                                            <span>
                                                {job?.company ||
                                                    "Unknown company"}
                                            </span>

                                        </div>

                                        <div className="application-date">

                                            <FaCalendarAlt />

                                            <span>
                                                Applied on{" "}
                                                {formatDate(
                                                    application.createdAt
                                                )}
                                            </span>

                                        </div>

                                    </div>


                                    {/* STATUS */}

                                    <div className="application-status-wrapper">

                                        <span
                                            className={`application-status ${getStatusClass(
                                                application.status
                                            )}`}
                                        >
                                            {application.status}
                                        </span>

                                    </div>


                                    {/* VIEW JOB */}

                                    {job?._id && (

                                        <button
                                            className="view-application-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/jobs/${job._id}`
                                                )
                                            }
                                        >

                                            <FaEye />

                                            <span>
                                                View Job
                                            </span>

                                        </button>

                                    )}

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </div>

    );

}


export default Applications;