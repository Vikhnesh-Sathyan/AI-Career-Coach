import "../../styles/jobhero.css";

import { motion } from "framer-motion";

import {
    FaBriefcase,
    FaRobot,
    FaChartLine
} from "react-icons/fa";

function JobHero() {

    return (

        <motion.div
            className="job-hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
        >

            <div className="job-hero-left">

                <span className="job-tag">

                    🤖 AI Powered Job Matcher

                </span>

                <h1>

                    Find Your Perfect Job Match

                </h1>

                <p>

                    Upload your resume and paste a job description.
                    Our AI compares skills, identifies missing technologies,
                    and provides personalized recommendations to improve
                    your chances of getting shortlisted.

                </p>

                <div className="hero-features">

                    <div>

                        <FaRobot />

                        AI Analysis

                    </div>

                    <div>

                        <FaChartLine />

                        ATS Match Score

                    </div>

                    <div>

                        <FaBriefcase />

                        Skill Comparison

                    </div>

                </div>

            </div>

            <div className="job-hero-right">

                <div className="match-preview">

                    <h3>

                        Match Preview

                    </h3>

                    <div className="preview-score">

                        92%

                    </div>

                    <span>

                        Excellent Match

                    </span>

                    <div className="preview-bar">

                        <div className="preview-fill"></div>

                    </div>

                    <small>

                        Upload your resume to calculate your real score

                    </small>

                </div>

            </div>

        </motion.div>

    );

}

export default JobHero;