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
    FaExternalLinkAlt
} from "react-icons/fa";

import { getJobById } from "../services/jobService";
import { applyForJob } from "../services/applicationService";

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

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [alreadyApplied, setAlreadyApplied] =
        useState(false);


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


    useEffect(() => {

        loadJob();

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

                setAlreadyApplied(true);

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

                setAlreadyApplied(true);

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

                            Apply directly through
                            AI Career Coach and track
                            your application status.

                        </p>



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

                            alreadyApplied ? (

                                <button
                                    className="already-applied-btn"
                                    disabled
                                >

                                    <FaCheckCircle />

                                    Already Applied

                                </button>

                            ) : (

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

                            )

                        ) : (

                            <button
                                className="closed-job-btn"
                                disabled
                            >

                                Job Closed

                            </button>

                        )}



                        {/* ==========================================
                            APPLICATIONS
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