import "../../styles/welcome.css";
import { motion } from "framer-motion";
import {
    FaCheckCircle,
    FaArrowRight
} from "react-icons/fa";

function WelcomeCard() {

    const score = 94;

    return (

        <motion.div
            className="welcome-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
        >

            <div className="welcome-left">

                <span className="welcome-tag">

                    🤖 AI Career Insights

                </span>

                <h2>

                    Your Resume is Looking Great 🚀

                </h2>

                <p className="welcome-description">

                    Your profile is above average. Keep improving your
                    resume to maximize interview opportunities.

                </p>

                <div className="insights-list">

                    <div className="insight">

                        <FaCheckCircle />

                        ATS Score above average

                    </div>

                    <div className="insight">

                        <FaCheckCircle />

                        Resume uploaded successfully

                    </div>

                    <div className="insight">

                        <FaCheckCircle />

                        18 Skills detected

                    </div>

                </div>

                <button className="hero-button">

                    Improve Resume

                    <FaArrowRight />

                </button>

            </div>

            <div className="welcome-right">

                <h3>

                    Resume Score

                </h3>

                <div className="score-value">

                    {score}%

                </div>

                <span>

                    Excellent

                </span>

                <div className="progress">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${score}%`
                        }}
                    />

                </div>

                <div className="score-stats">

                    <div>

                        <h4>

                            18

                        </h4>

                        <p>

                            Skills

                        </p>

                    </div>

                    <div>

                        <h4>

                            12

                        </h4>

                        <p>

                            Interviews

                        </p>

                    </div>

                </div>

            </div>

        </motion.div>

    );

}

export default WelcomeCard;