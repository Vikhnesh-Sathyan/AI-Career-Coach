import "../styles/dashboard.css";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatCard from "../components/dashboard/StatCard";
import ProgressRing from "../components/dashboard/ProgressRing";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import AIAssistant from "../components/dashboard/AIAssistant";

function Dashboard() {

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

            </div>

        </div>

    );

}

export default Dashboard;