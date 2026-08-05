import "../styles/dashboard.css";

import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import AIAssistant from "../components/dashboard/AIAssistant";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import QuickActions from "../components/dashboard/QuickActions";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import InterviewChart from "../components/dashboard/InterviewChart";
// import ATSChart from "../components/dashboard/ATSChart";
import RecentInterviews from "../components/dashboard/RecentInterviews";

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
import JobTracker from "./JobTracker";

// import RecentActivity from "../components/dashboard/RecentActivity";


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


                <div className="dashboard-charts">

                    <InterviewChart />

                    <RecentInterviews />


                    {/* <ATSChart /> */}

                    </div>

                    {/* <RecentActivity/> */}



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