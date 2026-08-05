import { useEffect, useState } from "react";

import JobHero from "../components/jobtracker/JobHero";
import ApplicationStats from "../components/jobtracker/ApplicationStats";
import AddApplication from "../components/jobtracker/AddApplication";
import JobBoard from "../components/jobtracker/JobBoard";

import { getApplications } from "../services/jobTrackerService";

import "../styles/jobtracker.css";

function JobTracker() {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editData, setEditData] = useState(null);

    useEffect(() => {

        loadApplications();

    }, []);

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

            />

            <JobBoard

                applications={applications}

                refresh={loadApplications}

                setEditData={setEditData}

            />

        </div>

    );

}

export default JobTracker;