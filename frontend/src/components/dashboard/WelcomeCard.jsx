import "../../styles/welcome.css";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

function WelcomeCard() {

    return (

        <motion.div
            className="welcome-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
        >

            <div>

                <p className="welcome-tag">
                    AI Career Coach
                </p>

                <h2>
                    Build Your Dream Career 🚀
                </h2>

                <p className="welcome-description">

                    Track your ATS score, prepare for interviews,
                    analyse resumes and land your next opportunity
                    with AI-powered guidance.

                </p>

                <button className="hero-button">

                    <FaRocket />

                    Get Started

                </button>

            </div>

            <div className="hero-score">

                <h3>ATS Score</h3>

                <div className="score-circle">

                    84%

                </div>

                <span>Excellent Progress</span>

            </div>

        </motion.div>

    );

}

export default WelcomeCard;