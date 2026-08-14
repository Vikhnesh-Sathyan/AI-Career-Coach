import { useEffect, useState } from "react";

import {
    FaArrowLeft,
    FaBriefcase,
    FaMapMarkerAlt,
    FaClock,
    FaGraduationCap,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaExternalLinkAlt
} from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";

import { getJobById } from "../services/jobService";

import "../styles/jobdetails.css";


function JobDetails() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [job, setJob] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


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
                    "Unable to load job."
                );

            }

        }

        catch (error) {

            console.error(
                "Failed to load job:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Unable to load job. Please try again."
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

    if (error || !job) {

        return (

            <div className="job-details-page">

                <div className="job-details-message error">

                    <FaBriefcase />

                    <h3>
                        Job not found
                    </h3>

                    <p>
                        {
                            error ||
                            "This job is no longer available."
                        }
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


    // ==========================================
    // JOB STATUS
    // ==========================================

    const isOpen =
        job.status === "Open";


    return (

        <div className="job-details-page">


            {/* =================================
                BACK BUTTON
            ================================= */}

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


            {/* =================================
                JOB HEADER
            ================================= */}

            <div className="job-details-header">


                <div className="job-company-icon">

                    <FaBriefcase />

                </div>


                <div className="job-header-info">


                    <div className="job-title-row">


                        <h1>
                            {job.title}
                        </h1>


                        <span
                            className={
                                isOpen
                                    ? "details-job-status open"
                                    : "details-job-status closed"
                            }
                        >

                            {isOpen
                                ? "Open"
                                : "Closed"
                            }

                        </span>


                    </div>


                    <h2>
                        {job.company}
                    </h2>


                    <div className="job-meta">


                        <span>

                            <FaMapMarkerAlt />

                            {job.location || "Remote"}

                        </span>


                        <span>

                            <FaClock />

                            {job.employmentType}

                        </span>


                        <span>

                            <FaGraduationCap />

                            {job.experience || "Fresher"}

                        </span>


                    </div>

                </div>

            </div>


            {/* =================================
                MAIN CONTENT
            ================================= */}

            <div className="job-details-layout">


                <main className="job-details-main">


                    {/* =================================
                        DESCRIPTION
                    ================================= */}

                    <section className="job-details-section">

                        <h3>
                            Job Description
                        </h3>


                        <p className="full-job-description">

                            {job.description}

                        </p>

                    </section>


                    {/* =================================
                        SKILLS
                    ================================= */}

                    {
                        job.skills?.length > 0 && (

                            <section className="job-details-section">

                                <h3>
                                    Required Skills
                                </h3>


                                <div className="details-skills">

                                    {
                                        job.skills.map(
                                            (skill, index) => (

                                                <span
                                                    key={index}
                                                >
                                                    {skill}
                                                </span>

                                            )
                                        )
                                    }

                                </div>

                            </section>

                        )
                    }


                    {/* =================================
                        ADDITIONAL INFORMATION
                    ================================= */}

                    <section className="job-details-section">

                        <h3>
                            Additional Information
                        </h3>


                        <div className="additional-info">


                            {/* SALARY */}

                            {
                                job.salary && (

                                    <div className="info-item">

                                        <FaMoneyBillWave />

                                        <div>

                                            <span>
                                                Salary
                                            </span>

                                            <strong>
                                                {job.salary}
                                            </strong>

                                        </div>

                                    </div>

                                )
                            }


                            {/* EMPLOYMENT TYPE */}

                            <div className="info-item">

                                <FaBriefcase />

                                <div>

                                    <span>
                                        Employment Type
                                    </span>

                                    <strong>
                                        {job.employmentType}
                                    </strong>

                                </div>

                            </div>


                            {/* EXPERIENCE */}

                            <div className="info-item">

                                <FaGraduationCap />

                                <div>

                                    <span>
                                        Experience
                                    </span>

                                    <strong>
                                        {
                                            job.experience ||
                                            "Fresher"
                                        }
                                    </strong>

                                </div>

                            </div>


                            {/* DEADLINE */}

                            {
                                job.applicationDeadline && (

                                    <div className="info-item">

                                        <FaCalendarAlt />

                                        <div>

                                            <span>
                                                Application Deadline
                                            </span>

                                            <strong>

                                                {
                                                    new Date(
                                                        job.applicationDeadline
                                                    ).toLocaleDateString()
                                                }

                                            </strong>

                                        </div>

                                    </div>

                                )
                            }


                        </div>

                    </section>

                </main>


                {/* =================================
                    APPLY CARD
                ================================= */}

                <aside className="job-apply-card">


                    <h3>

                        {
                            isOpen
                                ? "Interested in this job?"
                                : "Applications are closed"
                        }

                    </h3>


                    <p>

                        {
                            isOpen
                                ? "Review the job requirements and apply through the provided application link."
                                : "This position is no longer accepting applications."
                        }

                    </p>


                    {/* =================================
                        OPEN JOB
                    ================================= */}

                    {
                        isOpen ? (

                            job.jobUrl ? (

                                <a
                                    href={job.jobUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="apply-job-btn"
                                >

                                    Apply Now

                                    <FaExternalLinkAlt />

                                </a>

                            ) : (

                                <button
                                    className="apply-job-btn disabled"
                                    disabled
                                >

                                    Application Link Unavailable

                                </button>

                            )

                        ) : (

                            /* =================================
                               CLOSED JOB
                            ================================= */

                            <button
                                className="apply-job-btn disabled"
                                disabled
                            >

                                Applications Closed

                            </button>

                        )
                    }


                    <button
                        className="secondary-back-btn"
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >

                        Browse More Jobs

                    </button>


                </aside>


            </div>

        </div>

    );

}


export default JobDetails;
