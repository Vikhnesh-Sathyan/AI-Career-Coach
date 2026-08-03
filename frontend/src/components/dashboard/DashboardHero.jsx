import "../../styles/dashboardhero.css";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
    FaFileAlt,
    FaSearch,
    FaMicrophone,
    FaRocket
} from "react-icons/fa";

function DashboardHero() {

    const navigate = useNavigate();

    return (

        <motion.div

            className="dashboard-hero"

            initial={{ opacity:0,y:30 }}

            animate={{ opacity:1,y:0 }}

            transition={{ duration:.6 }}

        >

            <div className="hero-left">

                <span className="hero-tag">

                    🤖 AI Career Coach

                </span>

              <h1>
                    Build Your Dream Career 
                    <FaRocket className="rocket-icon" />
            </h1>

                <p className="hero-quote">

                    Analyse resumes, match jobs, prepare interviews,
                    and land your next opportunity with AI-powered guidance.

                </p>

                <div className="hero-buttons">

                    <button onClick={() => navigate("/resume")}>

                        <FaFileAlt />

                        Resume Analyzer

                    </button>

                    <button onClick={() => navigate("/job-matcher")}>

                        <FaSearch />

                        Job Matcher

                    </button>

                    <button onClick={() => navigate("/interviews")}>

                        <FaMicrophone />

                        Mock Interview

                    </button>

                </div>

            </div>

            <div className="hero-right">

                <div className="hero-mini-card">

                    <h3>Profile Strength</h3>

                    <h2>94%</h2>

                    <div className="hero-progress">

                        <div
                            className="hero-progress-fill"
                            style={{width:"94%"}}
                        />

                    </div>

                    <div className="hero-stats">

                        <div>

                            <strong>18</strong>

                            <span>Applications</span>

                        </div>

                        <div>

                            <strong>12</strong>

                            <span>Interviews</span>

                        </div>

                    </div>

                </div>

            </div>

        </motion.div>

    );

}

export default DashboardHero;