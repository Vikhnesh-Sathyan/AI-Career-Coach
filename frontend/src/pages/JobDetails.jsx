import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaBriefcase,
    FaBuilding,
    FaCalendarAlt,
    FaGraduationCap,
    FaMapMarkerAlt,
    FaClock,
    FaCheckCircle,
    FaExternalLinkAlt,
    FaTimesCircle
} from "react-icons/fa";

import { getJobById } from "../services/jobService";

import {
    applyForJob,
    getMyApplications
} from "../services/applicationService";

import "../styles/jobdetails.css";


function JobDetails() {

    const { id } = useParams();

    const navigate = useNavigate();


    // ==========================================
    // STATE
    // ==========================================

    const [job, setJob] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [applying, setApplying] =
        useState(false);

    const [applicationLoading, setApplicationLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [applicationStatus, setApplicationStatus] =
        useState(null);


    // ==========================================
    // LOAD JOB
    // ==========================================

    const loadJob = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getJobById(id);


            if (data.success) {

                setJob(data.data);

            }

            else {

                setError(
                    data.message ||
                    "Failed to load job."
                );

            }

        }

        catch (error) {

            console.error(
                "Load Job Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load job."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // CHECK EXISTING APPLICATION
    // ==========================================

    const checkApplication = async () => {

        try {

            setApplicationLoading(true);

            const data =
                await getMyApplications();


            if (data.success) {

                const applications =
                    data.data || [];


                // ==========================================
                // FIND APPLICATION FOR CURRENT JOB
                // ==========================================

                const currentApplication =
                    applications.find(
                        (application) => {

                            const applicationJob =
                                application.job;

                            if (!applicationJob) {
                                return false;
                            }


                            const applicationJobId =
                                typeof applicationJob === "object"
                                    ? applicationJob._id
                                    : applicationJob;


                            return (
                                applicationJobId === id
                            );

                        }
                    );


                if (currentApplication) {

                    setApplicationStatus(
                        currentApplication.status
                    );

                }

                else {

                    setApplicationStatus(null);

                }

            }

            else {

                setApplicationStatus(null);

            }

        }

        catch (error) {

            console.error(
                "Check Application Error:",
                error
            );

            // Do not block the job page
            // if application checking fails.

            setApplicationStatus(null);

        }

        finally {

            setApplicationLoading(false);

        }

    };


    // ==========================================
    // LOAD PAGE DATA
    // ==========================================

    useEffect(() => {

        loadJob();

        checkApplication();

    }, [id]);


    // ==========================================
    // APPLY FOR JOB
    // ==========================================

    const handleApply = async () => {

        try {

            setApplying(true);

            setError("");

            setSuccess("");


            const data =
                await applyForJob(id);


            if (data.success) {

                setSuccess(
                    "Application submitted successfully!"
                );


                // ==========================================
                // UPDATE LOCAL APPLICATION STATUS
                // ==========================================

                setApplicationStatus(
                    "Applied"
                );

            }

            else {

                setError(
                    data.message ||
                    "Failed to submit application."
                );

            }

        }

        catch (error) {

            console.error(
                "Apply Job Error:",
                error
            );


            const message =
                error.response?.data?.message ||
                "Failed to submit application.";


            setError(message);


            // ==========================================
            // DUPLICATE APPLICATION
            // ==========================================

            if (
                message
                    .toLowerCase()
                    .includes("already applied")
            ) {

                setApplicationStatus(
                    "Applied"
                );

            }

        }

        finally {

            setApplying(false);

        }

    };


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        if (!date) {

            return "No deadline";

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
    // GET APPLICATION STATUS CLASS
    // ==========================================

    const getApplicationStatusClass = () => {

        switch (applicationStatus) {

            case "Shortlisted":
                return "shortlisted";

            case "Interview":
                return "interview";

            case "Selected":
                return "selected";

            case "Rejected":
                return "rejected";

            case "Applied":
            default:
                return "applied";

        }

    };


    // ==========================================
    // GET APPLICATION STATUS MESSAGE
    // ==========================================

    const getApplicationStatusMessage = () => {

        switch (applicationStatus) {

            case "Shortlisted":
                return "You have been shortlisted for this position.";

            case "Interview":
                return "Your application has moved to the interview stage.";

            case "Selected":
                return "Congratulations! You have been selected for this position.";

            case "Rejected":
                return "Your application was not selected for this position.";

            case "Applied":
            default:
                return "Your application has been submitted successfully.";

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="job-details-page">

                <div className="job-details-message">

                    <p>
                        Loading job details...
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error && !job) {

        return (

            <div className="job-details-page">

                <div className="job-details-message error">

                    <h3>
                        Unable to load job
                    </h3>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        Back to Jobs
                    </button>

                </div>

            </div>

        );

    }


    if (!job) {

        return null;

    }


    // ==========================================
    // JOB STATUS
    // ==========================================

    const isOpen =
        job.status === "Open";


    // ==========================================
    // APPLICATION EXISTS
    // ==========================================

    const hasApplication =
        Boolean(applicationStatus);


    return (

        <div className="job-details-page">


            {/* ==========================================
                BACK BUTTON
            ========================================== */}

            <button
                className="back-to-jobs"
                onClick={() =>
                    navigate("/jobs")
                }
            >

                <FaArrowLeft />

                <span>
                    Back to Jobs
                </span>

            </button>



            {/* ==========================================
                JOB HEADER
            ========================================== */}

            <div className="job-details-header">

                <div className="job-details-title-section">


                    <div className="job-details-icon">

                        <FaBriefcase />

                    </div>


                    <div>

                        <div className="job-title-row">

                            <h1>
                                {job.title}
                            </h1>


                            <span
                                className={
                                    `job-status ${
                                        isOpen
                                            ? "open"
                                            : "closed"
                                    }`
                                }
                            >

                                {job.status}

                            </span>

                        </div>


                        <div className="job-company">

                            <FaBuilding />

                            <span>
                                {job.company}
                            </span>

                        </div>

                    </div>

                </div>



                {/* ==========================================
                    JOB META
                ========================================== */}

                <div className="job-meta">


                    {job.location && (

                        <div className="job-meta-item">

                            <FaMapMarkerAlt />

                            <span>
                                {job.location}
                            </span>

                        </div>

                    )}


                    {job.employmentType && (

                        <div className="job-meta-item">

                            <FaClock />

                            <span>
                                {job.employmentType}
                            </span>

                        </div>

                    )}


                    {job.experience && (

                        <div className="job-meta-item">

                            <FaGraduationCap />

                            <span>
                                {job.experience}
                            </span>

                        </div>

                    )}

                </div>

            </div>



            {/* ==========================================
                MAIN CONTENT
            ========================================== */}

            <div className="job-details-layout">


                {/* ==========================================
                    LEFT SIDE
                ========================================== */}

                <div className="job-details-main">


                    {/* DESCRIPTION */}

                    <section className="job-details-section">

                        <h2>
                            Job Description
                        </h2>

                        <div className="job-description">

                            {job.description}

                        </div>

                    </section>



                    {/* SKILLS */}

                    {job.skills &&
                        job.skills.length > 0 && (

                            <section
                                className="job-details-section"
                            >

                                <h2>
                                    Required Skills
                                </h2>


                                <div className="job-skills">

                                    {job.skills.map(
                                        (skill, index) => (

                                            <span
                                                key={index}
                                                className="job-skill"
                                            >
                                                {skill}
                                            </span>

                                        )
                                    )}

                                </div>

                            </section>

                        )}



                    {/* SALARY */}

                    {job.salary && (

                        <section
                            className="job-details-section"
                        >

                            <h2>
                                Salary
                            </h2>

                            <p className="job-salary">

                                {job.salary}

                            </p>

                        </section>

                    )}



                    {/* DEADLINE */}

                    {job.applicationDeadline && (

                        <section
                            className="job-details-section"
                        >

                            <h2>
                                Application Deadline
                            </h2>

                            <div className="job-deadline">

                                <FaCalendarAlt />

                                <span>

                                    {formatDate(
                                        job.applicationDeadline
                                    )}

                                </span>

                            </div>

                        </section>

                    )}

                </div>



                {/* ==========================================
                    RIGHT SIDE
                ========================================== */}

                <aside className="job-details-sidebar">


                    <div className="apply-card">


                        <h2>
                            Interested in this job?
                        </h2>


                        <p>

                            {hasApplication
                                ? getApplicationStatusMessage()
                                : "Apply directly through AI Career Coach and track your application status."
                            }

                        </p>



                        {/* ==========================================
                            APPLICATION LOADING
                        ========================================== */}

                        {applicationLoading ? (

                            <div className="application-loading">

                                Checking application status...

                            </div>

                        ) : hasApplication ? (

                            <>
                                {/* ==========================================
                                    EXISTING APPLICATION STATUS
                                ========================================== */}

                                <div
                                    className={
                                        `application-status-card ${getApplicationStatusClass()}`
                                    }
                                >

                                    {applicationStatus === "Rejected" ? (

                                        <FaTimesCircle />

                                    ) : (

                                        <FaCheckCircle />

                                    )}

                                    <div>

                                        <strong>
                                            {applicationStatus === "Applied"
                                                ? "Already Applied"
                                                : applicationStatus
                                            }
                                        </strong>

                                        <span>
                                            Application Status
                                        </span>

                                    </div>

                                </div>


                                {/* ==========================================
                                    VIEW APPLICATIONS
                                ========================================== */}

                                <button
                                    className="view-applications-btn"
                                    onClick={() =>
                                        navigate(
                                            "/applications"
                                        )
                                    }
                                >

                                    View My Applications

                                </button>

                            </>

                        ) : (

                            <>
                                {/* ==========================================
                                    SUCCESS MESSAGE
                                ========================================== */}

                                {success && (

                                    <div className="application-success">

                                        <FaCheckCircle />

                                        <span>
                                            {success}
                                        </span>

                                    </div>

                                )}


                                {/* ==========================================
                                    ERROR MESSAGE
                                ========================================== */}

                                {error && job && (

                                    <div className="application-error">

                                        {error}

                                    </div>

                                )}


                                {/* ==========================================
                                    APPLY BUTTON
                                ========================================== */}

                                {isOpen ? (

                                    <button
                                        className="apply-job-btn"
                                        onClick={handleApply}
                                        disabled={applying}
                                    >

                                        {applying ? (

                                            "Submitting..."

                                        ) : (

                                            <>
                                                <FaCheckCircle />

                                                Apply Now
                                            </>

                                        )}

                                    </button>

                                ) : (

                                    <button
                                        className="closed-job-btn"
                                        disabled
                                    >

                                        Job Closed

                                    </button>

                                )}


                                {/* ==========================================
                                    VIEW APPLICATIONS
                                ========================================== */}

                                <button
                                    className="view-applications-btn"
                                    onClick={() =>
                                        navigate(
                                            "/applications"
                                        )
                                    }
                                >

                                    View My Applications

                                </button>

                            </>

                        )}



                        {/* ==========================================
                            EXTERNAL URL
                            OPTIONAL
                        ========================================== */}

                        {job.jobUrl && (

                            <a
                                href={job.jobUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="external-job-link"
                            >

                                <FaExternalLinkAlt />

                                External Application

                            </a>

                        )}

                    </div>

                </aside>

            </div>

        </div>

    );

}


export default JobDetails;
