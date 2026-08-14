import { useEffect, useState } from "react";

import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaTimes,
    FaMoneyBillWave,
} from "react-icons/fa";

import { getJobs } from "../services/jobService";

import "../styles/jobs.css";


function Jobs() {

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [selectedJob, setSelectedJob] =
        useState(null);


    // =========================================
    // LOAD JOBS
    // =========================================

    const loadJobs = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getJobs();

            if (data.success) {

                setJobs(
                    data.data || []
                );

            }

        }

        catch (error) {

            console.error(
                "Failed to load jobs:",
                error
            );

            setError(
                "Unable to load jobs. Please try again."
            );

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadJobs();

    }, []);


    // =========================================
    // CLOSE MODAL
    // =========================================

    const closeJobDetails = () => {

        setSelectedJob(null);

    };


    return (

        <div className="jobs-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="jobs-header">

                <div>

                    <h1>
                        Available Jobs
                    </h1>

                    <p>
                        Explore job opportunities posted by our team.
                    </p>

                </div>


                <div className="jobs-header-icon">

                    <FaBriefcase />

                </div>

            </div>



            {/* =================================
                LOADING
            ================================= */}

            {loading && (

                <div className="jobs-message">

                    <p>
                        Loading available jobs...
                    </p>

                </div>

            )}



            {/* =================================
                ERROR
            ================================= */}

            {!loading && error && (

                <div className="jobs-message error">

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={loadJobs}
                    >
                        Try Again
                    </button>

                </div>

            )}



            {/* =================================
                EMPTY
            ================================= */}

            {!loading &&
                !error &&
                jobs.length === 0 && (

                    <div className="jobs-message">

                        <FaBriefcase />

                        <h3>
                            No jobs available
                        </h3>

                        <p>
                            New job opportunities will appear here when they are posted.
                        </p>

                    </div>

                )}



            {/* =================================
                JOB LIST
            ================================= */}

            {!loading &&
                !error &&
                jobs.length > 0 && (

                    <div className="jobs-list">

                        {jobs.map((job) => (

                            <div
                                className="job-list-item"
                                key={job._id}
                            >


                                {/* JOB ICON */}

                                <div className="job-list-icon">

                                    <FaBriefcase />

                                </div>



                                {/* JOB MAIN INFO */}

                                <div className="job-list-info">

                                    <h2>
                                        {job.title}
                                    </h2>

                                    <p className="job-company">
                                        {job.company}
                                    </p>


                                    <div className="job-meta">

                                        <span>

                                            <FaMapMarkerAlt />

                                            {job.location || "Remote"}

                                        </span>


                                        <span>
                                            {job.employmentType}
                                        </span>


                                        <span>
                                            {job.experience || "Fresher"}
                                        </span>

                                    </div>

                                </div>



                                {/* STATUS */}

                                <div className="job-list-status">

                                    <span>
                                        {job.status}
                                    </span>

                                </div>



                                {/* ACTION */}

                                <button
                                    className="view-job-btn"
                                    onClick={() =>
                                        setSelectedJob(job)
                                    }
                                >
                                    View Details
                                </button>

                            </div>

                        ))}

                    </div>

                )}



            {/* =================================
                JOB DETAILS MODAL
            ================================= */}

            {selectedJob && (

                <div
                    className="job-details-overlay"
                    onClick={closeJobDetails}
                >

                    <div
                        className="job-details-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >


                        {/* MODAL HEADER */}

                        <div className="job-details-header">

                            <div>

                                <div className="job-details-icon">

                                    <FaBriefcase />

                                </div>

                            </div>


                            <button
                                className="close-job-details"
                                onClick={closeJobDetails}
                            >

                                <FaTimes />

                            </button>

                        </div>



                        {/* TITLE */}

                        <h2 className="job-details-title">

                            {selectedJob.title}

                        </h2>


                        <p className="job-details-company">

                            {selectedJob.company}

                        </p>



                        {/* STATUS */}

                        <span className="job-details-status">

                            {selectedJob.status}

                        </span>



                        {/* META */}

                        <div className="job-details-meta">

                            <div>

                                <FaMapMarkerAlt />

                                <span>
                                    {selectedJob.location || "Remote"}
                                </span>

                            </div>


                            <div>

                                <FaBriefcase />

                                <span>
                                    {selectedJob.employmentType}
                                </span>

                            </div>


                            <div>

                                <span>
                                    🎓
                                </span>

                                <span>
                                    {selectedJob.experience || "Fresher"}
                                </span>

                            </div>


                            {selectedJob.salary && (

                                <div>

                                    <FaMoneyBillWave />

                                    <span>
                                        {selectedJob.salary}
                                    </span>

                                </div>

                            )}

                        </div>



                        {/* DESCRIPTION */}

                        <div className="job-details-section">

                            <h3>
                                Job Description
                            </h3>

                            <p>
                                {selectedJob.description ||
                                    "No description provided."}
                            </p>

                        </div>



                        {/* SKILLS */}

                        {selectedJob.skills?.length > 0 && (

                            <div className="job-details-section">

                                <h3>
                                    Required Skills
                                </h3>


                                <div className="job-details-skills">

                                    {selectedJob.skills.map(
                                        (skill, index) => (

                                            <span
                                                key={index}
                                            >
                                                {skill}
                                            </span>

                                        )
                                    )}

                                </div>

                            </div>

                        )}



                        {/* APPLY */}

                        <div className="job-details-actions">

                            <button
                                className="apply-job-btn"
                            >
                                Apply Now
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}


export default Jobs;