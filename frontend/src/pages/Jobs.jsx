import { useEffect, useState } from "react";

import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

import { getJobs } from "../services/jobService";

import "../styles/jobs.css";


function Jobs() {

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    const loadJobs = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getJobs();

            if (data.success) {

                setJobs(data.data || []);

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


    return (

        <div className="jobs-page">

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


            {loading && (

                <div className="jobs-message">

                    <p>
                        Loading available jobs...
                    </p>

                </div>

            )}


            {!loading && error && (

                <div className="jobs-message error">

                    <p>
                        {error}
                    </p>

                    <button onClick={loadJobs}>
                        Try Again
                    </button>

                </div>

            )}


            {!loading && !error && jobs.length === 0 && (

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


            {!loading && !error && jobs.length > 0 && (

                <div className="jobs-grid">

                    {jobs.map((job) => (

                        <div
                            className="user-job-card"
                            key={job._id}
                        >

                            <div className="job-card-top">

                                <div className="company-icon">
                                    <FaBriefcase />
                                </div>

                                <span className="job-status">
                                    {job.status}
                                </span>

                            </div>


                            <h2>
                                {job.title}
                            </h2>


                            <h3>
                                {job.company}
                            </h3>


                            <div className="job-location">

                                <FaMapMarkerAlt />

                                <span>
                                    {job.location || "Remote"}
                                </span>

                            </div>


                            <div className="job-details">

                                <span>
                                    {job.employmentType}
                                </span>

                                <span>
                                    {job.experience || "Fresher"}
                                </span>

                            </div>


                            {job.salary && (

                                <p className="job-salary">
                                    {job.salary}
                                </p>

                            )}


                            <p className="job-description">

                                {job.description}

                            </p>


                            {job.skills?.length > 0 && (

                                <div className="job-skills">

                                    {job.skills.map(
                                        (skill, index) => (

                                            <span key={index}>
                                                {skill}
                                            </span>

                                        )
                                    )}

                                </div>

                            )}


                            <button
                                className="view-job-btn"
                            >
                                View Job
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}


export default Jobs;