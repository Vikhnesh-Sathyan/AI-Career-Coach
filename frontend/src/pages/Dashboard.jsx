import "../styles/dashboard.css";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatCard from "../components/dashboard/StatCard";
import AIAssistant from "../components/dashboard/AIAssistant";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import QuickActions from "../components/dashboard/QuickActions";
import WelcomeCard from "../components/dashboard/WelcomeCard";


import {
    FaChartLine,
    FaBriefcase,
    FaMicrophone,
    FaCode
} from "react-icons/fa";

import DashboardHero from "../components/dashboard/DashboardHero";

import TodayGoals from "../components/dashboard/TodayGoals";

import ProfileCard from "../components/dashboard/ProfileCard";

function Dashboard() {

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <DashboardHero />

                <WelcomeCard />

                <QuickActions />


                <div className="stats-grid">

                    <StatCard
                        title="ATS Score"
                        value="94%"
                        subtitle="Excellent Resume"
                        icon={<FaChartLine />}
                        color="#3B82F6"
                        progress={94}
                        trend="+6%"
                    />

                    <StatCard
                         title="Applications"
                         value="18"
                         subtitle="Jobs Applied"
                         icon={<FaBriefcase />}
                         color="#10B981"
                         progress={72}
                         trend="+12%"
                    />

                    <StatCard
                         title="Mock Interviews"
                         value="12"
                         subtitle="Completed"
                         icon={<FaMicrophone />}
                         color="#F59E0B"
                         progress={60}
                         trend="+8%"
                    />

                    <StatCard
                        title="Skills"
                        value="24"
                        subtitle="Technologies"
                        icon={<FaCode />}
                        color="#8B5CF6"
                        progress={96}
                        trend="+18%"
                    />
                </div>

                <div className="dashboard-grid">

                        <TodayGoals />

                        <AIAssistant />

                </div>

                <div className="dashboard-grid">

                        <ActivityTimeline />

                            <ProfileCard />
                </div>      

            </div>

        </div>

    );

}

export default Dashboard;