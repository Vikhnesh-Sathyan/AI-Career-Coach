import "../styles/dashboard.css";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatCard from "../components/dashboard/StatCard";
import AIAssistant from "../components/dashboard/AIAssistant";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";

import {
    FaChartLine,
    FaBriefcase,
    FaMicrophone,
    FaCode
} from "react-icons/fa";

function Dashboard() {

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <WelcomeCard />

                <div className="stats-grid">

                    <StatCard
                        title="ATS Score"
                        value="84%"
                        subtitle="Excellent Resume"
                        icon={<FaChartLine />}
                    />

                    <StatCard
                        title="Applications"
                        value="18"
                        subtitle="Jobs Applied"
                        icon={<FaBriefcase />}
                    />

                    <StatCard
                        title="Mock Interviews"
                        value="12"
                        subtitle="Completed"
                        icon={<FaMicrophone />}
                    />

                    <StatCard
                        title="Skills"
                        value="24"
                        subtitle="Technologies"
                        icon={<FaCode />}
                    />

                </div>

                <div className="dashboard-panels">

                    <AIAssistant />
                    <ActivityTimeline />

                </div>

            </div>

        </div>

    );

}

export default Dashboard;