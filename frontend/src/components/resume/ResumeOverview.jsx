import "../../styles/resumeoverview.css";

import { motion } from "framer-motion";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaFileAlt,
    FaChartLine
} from "react-icons/fa";

function ResumeOverview({ analysis }) {

    if (!analysis) return null;

    return (

        <motion.div

            className="overview-card"

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .6 }}

        >

            <h2>

                Resume Overview

            </h2>

            <div className="overview-item">

                <FaUser />

                <div>

                    <span>Name</span>

                    <strong>{analysis.name}</strong>

                </div>

            </div>

            <div className="overview-item">

                <FaEnvelope />

                <div>

                    <span>Email</span>

                    <strong>{analysis.email}</strong>

                </div>

            </div>

            <div className="overview-item">

                <FaPhone />

                <div>

                    <span>Phone</span>

                    <strong>{analysis.phone}</strong>

                </div>

            </div>

            <div className="overview-stats">

                <div>

                    <FaFileAlt />

                    <span>Skills</span>

                    <strong>{analysis.skills.length}</strong>

                </div>

                <div>

                    <FaChartLine />

                    <span>ATS Score</span>

                    <strong>{analysis.atsScore}%</strong>

                </div>

            </div>

            <div className="resume-status">

                ✅ Resume Parsed Successfully

            </div>

        </motion.div>

    );

}

export default ResumeOverview;