import "../styles/adminjobs.css";

import { FaBriefcase } from "react-icons/fa";

import AdminLayout from "../components/admin/AdminLayout";

function AdminJobs() {

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

                    <button className="create-job-btn">
                        + Post New Job
                    </button>

                </div>


                <div className="jobs-overview">

                    <div className="job-stat-card">

                        <span>
                            Total Jobs
                        </span>

                        <h2>
                            0
                        </h2>

                    </div>


                    <div className="job-stat-card">

                        <span>
                            Open Jobs
                        </span>

                        <h2>
                            0
                        </h2>

                    </div>


                    <div className="job-stat-card">

                        <span>
                            Closed Jobs
                        </span>

                        <h2>
                            0
                        </h2>

                    </div>

                </div>


                <div className="admin-jobs-list">

                    <div className="jobs-list-header">

                        <h2>
                            Posted Jobs
                        </h2>

                    </div>

                    <div className="empty-jobs">

                        <FaBriefcase />

                        <h3>
                            No jobs posted yet
                        </h3>

                        <p>
                            Post your first job to make it available to users.
                        </p>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default AdminJobs;