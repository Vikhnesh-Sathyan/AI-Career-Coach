import "../styles/dashboard.css";

import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatCard from "../components/dashboard/StatCard";
import AIAssistant from "../components/dashboard/AIAssistant";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import QuickActions from "../components/dashboard/QuickActions";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import InterviewChart from "../components/dashboard/InterviewChart";
import ATSChart from "../components/dashboard/ATSChart";

import {
    FaChartLine,
    FaBriefcase,
    FaMicrophone,
    FaCode
} from "react-icons/fa";

import DashboardHero from "../components/dashboard/DashboardHero";

import TodayGoals from "../components/dashboard/TodayGoals";

import ProfileCard from "../components/dashboard/ProfileCard";


import {
    getDashboardStats
} from "../services/dashboardService";



function Dashboard() {


    const [stats,setStats] = useState({

        atsScore:0,

        applications:0,

        interviews:0,

        skills:0

    });



    useEffect(()=>{


        const loadStats = async()=>{


            const token = localStorage.getItem("token");


            if(token){


                const data = await getDashboardStats(token);



                if(data.success){

                    setStats(data.stats);

                }


            }


        };


        loadStats();


    },[]);





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

                        value={`${stats.atsScore}%`}

                        subtitle="Resume Match"

                        icon={<FaChartLine />}

                        color="#3B82F6"

                        progress={stats.atsScore}

                        trend="+6%"

                    />




                    <StatCard

                        title="Job Matches"

                        value={stats.applications}

                        subtitle="Jobs Analyzed"

                        icon={<FaBriefcase />}

                        color="#10B981"

                        progress={stats.applications > 0 ? 70 : 0}

                        trend="+12%"

                    />





                    <StatCard

                        title="Mock Interviews"

                        value={stats.interviews}

                        subtitle="Completed"

                        icon={<FaMicrophone />}

                        color="#F59E0B"

                        progress={stats.interviews > 0 ? 60 : 0}

                        trend="+8%"

                    />





                    <StatCard

                        title="Skills"

                        value={stats.skills}

                        subtitle="Technologies"

                        icon={<FaCode />}

                        color="#8B5CF6"

                        progress={stats.skills > 0 ? 90 : 0}

                        trend="+18%"

                    />



                </div>

                <div className="dashboard-charts">

                    <InterviewChart />

                    <ATSChart />

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