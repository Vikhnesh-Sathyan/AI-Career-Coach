import { useEffect, useState } from "react";

import JobHero from "../components/jobtracker/JobHero";
import ApplicationStats from "../components/jobtracker/ApplicationStats";
import AddApplication from "../components/jobtracker/AddApplication";
import JobBoard from "../components/jobtracker/JobBoard";
import Toast from "../components/jobtracker/Toast";

import { getApplications } from "../services/jobTrackerService";

import "../styles/jobtracker.css";

function JobTracker() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(null);

    const [toast, setToast] = useState({
        open: false,
        message: "",
        type: "success"
    });

    useEffect(() => {
        loadApplications();
    }, []);

    const showToast = (message, type = "success") => {

        setToast({
            open: true,
            message,
            type
        });

        setTimeout(() => {

            setToast({
                open: false,
                message: "",
                type: "success"
            });

        }, 3000);

    };

    const loadApplications = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = await getApplications(token);

            if (data.success) {

                setApplications(data.data || []);

            }

        }

        catch (error) {

            console.log(error);

            showToast("Failed to load applications", "error");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="loading-page">
                Loading Job Tracker...
            </div>
        );

    }

    return (

        <div className="jobtracker-page">

            <JobHero />

            <ApplicationStats
                applications={applications}
            />

            <AddApplication
                refresh={loadApplications}
                editData={editData}
                setEditData={setEditData}
                showToast={showToast}
            />

            <JobBoard
                applications={applications}
                refresh={loadApplications}
                setEditData={setEditData}
                showToast={showToast}
            />

            <Toast
                open={toast.open}
                message={toast.message}
                type={toast.type}
            />

        </div>

    );

}

export default JobTracker;