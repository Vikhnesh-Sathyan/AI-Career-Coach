import "../../styles/jobh.css";

import { motion } from "framer-motion";

import {

    FaBriefcase,

    FaRocket,

    FaChartLine

} from "react-icons/fa";

function JobHero() {

    return (

        <motion.div

            className="job-hero"

            initial={{ opacity: 0, y: 40 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .6 }}

        >

            <div className="hero-left">

                <span className="hero-badge">

                    <FaRocket />

                    Career Growth Hub

                </span>

                <h1>

                    Track Every Opportunity,

                    <span> Land Your Dream Job.</span>

                </h1>

                <p>

                    Organize applications, monitor interview stages,

                    manage offers, and never miss an opportunity with

                    your personal AI-powered job tracker.

                </p>

            </div>

            <div className="hero-right">

                <div className="hero-glass">

                    <FaBriefcase />

                    <h2>Job Tracker</h2>

                    <p>

                        Keep every application in one place.

                    </p>

                </div>

                <div className="hero-glass purple">

                    <FaChartLine />

                    <h2>Career Progress</h2>

                    <p>

                        Visualize your interview journey.

                    </p>

                </div>

            </div>

        </motion.div>

    );

}

export default JobHero;