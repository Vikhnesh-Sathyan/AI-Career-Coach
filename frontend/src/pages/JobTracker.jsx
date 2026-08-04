import "../styles/jobtracker.css";

import { useEffect, useState } from "react";

import JobHero from "../components/jobtracker/JobHero";
import ApplicationStats from "../components/jobtracker/ApplicationStats";
import AddApplication from "../components/jobtracker/AddApplication";
import ApplicationTable from "../components/jobtracker/ApplicationTable";

import {

    getApplications,

    getApplicationStats

} from "../services/jobTrackerService";

function JobTracker() {

    const [applications, setApplications] = useState([]);

    const [stats, setStats] = useState({

        total: 0,

        applied: 0,

        interview: 0,

        offer: 0,

        rejected: 0

    });

    const [loading, setLoading] = useState(true);

    const loadApplications = async () => {

        try {

            const token = localStorage.getItem("token");

            const appData = await getApplications(token);

            const statData = await getApplicationStats(token);

            if (appData.success) {

                setApplications(appData.data);

            }

            if (statData.success) {

                setStats(statData.data);

            }

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadApplications();

    }, []);

    return (

        <div className="jobtracker-page">

            <JobHero />

            <ApplicationStats stats={stats} />

            <AddApplication refresh={loadApplications} />

            <ApplicationTable

                applications={applications}

                loading={loading}

                refresh={loadApplications}

            />

        </div>

    );

}

export default JobTracker;