import { useEffect, useState } from "react";

import {
    FaBriefcase,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import AdminLayout from "../components/admin/AdminLayout";

import JobForm from "../components/admin/JobForm";

import {
    getAdminJobs,
    deleteJob,
    updateJob
} from "../services/jobService";

import "../styles/adminjobs.css";


function AdminJobs() {

    const [showForm, setShowForm] =
        useState(false);

    const [editingJob, setEditingJob] =
        useState(null);

    const [jobs, setJobs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [deletingId, setDeletingId] =
        useState(null);

    const [updatingId, setUpdatingId] =
        useState(null);


    // ==========================================
    // LOAD JOBS
    // ==========================================

    const loadJobs = async () => {

        try {

            setLoading(true);

            const data =
                await getAdminJobs();


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

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadJobs();

    }, []);


    // ==========================================
    // CREATE JOB
    // ==========================================

    const openCreateForm = () => {

        setEditingJob(null);

        setShowForm(true);

    };


    // ==========================================
    // EDIT JOB
    // ==========================================

    const openEditForm = (job) => {

        setEditingJob(job);

        setShowForm(true);

    };


    // ==========================================
    // CLOSE FORM
    // ==========================================

    const closeForm = () => {

        setShowForm(false);

        setEditingJob(null);

    };


    // ==========================================
    // DELETE JOB
    // ==========================================

    const handleDelete = async (job) => {

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${job.title}"?`
            );


        if (!confirmed) {

            return;

        }


        try {

            setDeletingId(job._id);


            const data =
                await deleteJob(
                    job._id
                );


            if (data.success) {

                setJobs(
                    previousJobs =>
                        previousJobs.filter(
                            item =>
                                item._id !== job._id
                        )
                );

            }

            else {

                alert(
                    data.message ||
                    "Failed to delete job."
                );

            }

        }

        catch (error) {

            console.error(
                "Failed to delete job:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to delete job."
            );

        }

        finally {

            setDeletingId(null);

        }

    };


    // ==========================================
    // TOGGLE JOB STATUS
    // ==========================================

    const handleToggleStatus = async (job) => {

        const newStatus =
            job.status === "Open"
                ? "Closed"
                : "Open";


        try {

            setUpdatingId(job._id);


            const data =
                await updateJob(
                    job._id,
                    {
                        status: newStatus
                    }
                );


            if (data.success) {

                setJobs(
                    previousJobs =>
                        previousJobs.map(
                            item =>
                                item._id === job._id
                                    ? {
                                        ...item,
                                        status: newStatus
                                    }
                                    : item
                        )
                );

            }

            else {

                alert(
                    data.message ||
                    "Failed to update job status."
                );

            }

        }

        catch (error) {

            console.error(
                "Failed to update job status:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to update job status."
            );

        }

        finally {

            setUpdatingId(null);

        }

    };


    // ==========================================
    // MAIN RETURN
    // ==========================================

    return (

        <AdminLayout>

            <div className="admin-jobs">


                {/* =================================
                    HEADER
                ================================= */}

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
                        onClick={openCreateForm}
                    >
                        + Post New Job
                    </button>

                </div>


                {/* =================================
                    STATISTICS
                ================================= */}

                <div className="jobs-overview">


                    {/* TOTAL */}

                    <div className="job-stat-card">

                        <span>
                            Total Jobs
                        </span>

                        <h2>
                            {jobs.length}
                        </h2>

                    </div>


                    {/* OPEN */}

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


                    {/* CLOSED */}

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


                {/* =================================
                    JOB LIST
                ================================= */}

                <div className="admin-jobs-list">


                    <div className="jobs-list-header">

                        <h2>
                            Posted Jobs
                        </h2>

                    </div>


                    {/* ============================
                        LOADING
                    ============================ */}

                    {
                        loading ? (

                            <div className="empty-jobs">

                                <p>
                                    Loading jobs...
                                </p>

                            </div>

                        ) : jobs.length === 0 ? (


                            /* ========================
                               EMPTY
                            ======================== */

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


                            /* ========================
                               JOB TABLE
                            ======================== */

                            <div className="jobs-table">

                                {
                                    jobs.map(
                                        job => (

                                            <div
                                                className="admin-job-item"
                                                key={job._id}
                                            >


                                                {/* ======================
                                                    JOB INFO
                                                ====================== */}

                                                <div className="admin-job-info">

                                                    <h3>
                                                        {job.title}
                                                    </h3>

                                                    <p>
                                                        {job.company}
                                                    </p>

                                                </div>


                                                {/* ======================
                                                    LOCATION
                                                ====================== */}

                                                <span>
                                                    {
                                                        job.location ||
                                                        "Remote"
                                                    }
                                                </span>


                                                {/* ======================
                                                    EMPLOYMENT TYPE
                                                ====================== */}

                                                <span>
                                                    {job.employmentType}
                                                </span>


                                                {/* ======================
                                                    STATUS
                                                ====================== */}

                                                <span
                                                    className={
                                                        job.status === "Open"
                                                            ? "job-status open"
                                                            : "job-status closed"
                                                    }
                                                >

                                                    {
                                                        job.status === "Open"
                                                            ? "Open"
                                                            : "Closed"
                                                    }

                                                </span>


                                                {/* ======================
                                                    ACTIONS
                                                ====================== */}

                                                <div className="job-actions">


                                                    {/* EDIT */}

                                                    <button
                                                        className="edit-job-btn"
                                                        title="Edit Job"
                                                        onClick={() =>
                                                            openEditForm(job)
                                                        }
                                                    >

                                                        <FaEdit />

                                                    </button>


                                                    {/* CLOSE / REOPEN */}

                                                    <button
                                                        className={
                                                            job.status === "Open"
                                                                ? "close-job-btn"
                                                                : "reopen-job-btn"
                                                        }
                                                        title={
                                                            job.status === "Open"
                                                                ? "Close Job"
                                                                : "Reopen Job"
                                                        }
                                                        disabled={
                                                            updatingId === job._id
                                                        }
                                                        onClick={() =>
                                                            handleToggleStatus(job)
                                                        }
                                                    >

                                                        {
                                                            updatingId === job._id
                                                                ? "..."
                                                                : job.status === "Open"
                                                                    ? "Close"
                                                                    : "Reopen"
                                                        }

                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        className="delete-job-btn"
                                                        title="Delete Job"
                                                        disabled={
                                                            deletingId === job._id
                                                        }
                                                        onClick={() =>
                                                            handleDelete(job)
                                                        }
                                                    >

                                                        <FaTrash />

                                                    </button>


                                                </div>


                                            </div>

                                        )
                                    )
                                }

                            </div>

                        )
                    }


                </div>


                {/* =================================
                    CREATE / EDIT FORM
                ================================= */}

                {
                    showForm && (

                        <JobForm

                            job={editingJob}

                            onClose={closeForm}

                            onSuccess={() => {

                                closeForm();

                                loadJobs();

                            }}

                        />

                    )
                }


            </div>

        </AdminLayout>

    );

}


export default AdminJobs;
