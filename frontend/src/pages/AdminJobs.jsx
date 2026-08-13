import { useEffect, useState } from "react";

import { FaBriefcase } from "react-icons/fa";

import AdminLayout from "../components/admin/AdminLayout";

import JobForm from "../components/admin/JobForm";

import { getJobs } from "../services/jobService";

import "../styles/adminjobs.css";

function AdminJobs() {

    const [showForm, setShowForm] =
        useState(false);

    const [jobs, setJobs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    const loadJobs = async () => {

        try {

            setLoading(true);

            const data = await getJobs();

            if (data.success) {

                setJobs(data.data || []);

            }

        }
        catch (error) {

            console.log(
                "Failed to load jobs:",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadJobs();

    }, []);


    const openForm = () => {

        setShowForm(true);

    };


    const closeForm = () => {

        setShowForm(false);

    };


    return (

        <AdminLayout>

            <div className="admin-jobs">

                <div className="admin-jobs-header">

                    <div>

                        <h1>
                            Jobs
                        </h1>

                        <p>
                            Manage job opportunities available to users.
                        </p>

                    </div>


                    <button
                        className="create-job-btn"
                        onClick={openForm}
                    >
                        + Post New Job
                    </button>

                </div>


                <div className="jobs-overview">

                    <div className="job-stat-card">

                        <span>
                            Total Jobs
                        </span>

                        <h2>
                            {jobs.length}
                        </h2>

                    </div>


                    <div className="job-stat-card">

                        <span>
                            Open Jobs
                        </span>

                        <h2>
                            {
                                jobs.filter(
                                    job =>
                                        job.status === "Open"
                                ).length
                            }
                        </h2>

                    </div>


                    <div className="job-stat-card">

                        <span>
                            Closed Jobs
                        </span>

                        <h2>
                            {
                                jobs.filter(
                                    job =>
                                        job.status === "Closed"
                                ).length
                            }
                        </h2>

                    </div>

                </div>


                <div className="admin-jobs-list">

                    <div className="jobs-list-header">

                        <h2>
                            Posted Jobs
                        </h2>

                    </div>


                    {
                        loading ? (

                            <div className="empty-jobs">

                                <p>
                                    Loading jobs...
                                </p>

                            </div>

                        ) : jobs.length === 0 ? (

                            <div className="empty-jobs">

                                <FaBriefcase />

                                <h3>
                                    No jobs posted yet
                                </h3>

                                <p>
                                    Post your first job to make it available to users.
                                </p>

                            </div>

                        ) : (

                            <div className="jobs-table">

                                {
                                    jobs.map(job => (

                                        <div
                                            className="admin-job-item"
                                            key={job._id}
                                        >

                                            <div>

                                                <h3>
                                                    {job.title}
                                                </h3>

                                                <p>
                                                    {job.company}
                                                </p>

                                            </div>


                                            <span>
                                                {job.location || "Remote"}
                                            </span>


                                            <span>
                                                {job.employmentType}
                                            </span>


                                            <span
                                                className={
                                                    job.status === "Open"
                                                        ? "job-status open"
                                                        : "job-status closed"
                                                }
                                            >
                                                {job.status}
                                            </span>

                                        </div>

                                    ))
                                }

                            </div>

                        )

                    }

                </div>


                {
                    showForm && (

                        <JobForm

                            onClose={closeForm}

                            onSuccess={loadJobs}

                        />

                    )
                }

            </div>

        </AdminLayout>

    );

}

export default AdminJobs;