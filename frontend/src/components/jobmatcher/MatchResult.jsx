import "../../styles/matchresult.css";

import { motion } from "framer-motion";

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import {
    FaCheckCircle,
    FaTimesCircle,
    FaRobot
} from "react-icons/fa";

function MatchResult({ analysis }) {

    return (

        <motion.div

            className="match-result"

            initial={{ opacity: 0, y: 40 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .6 }}

        >

            <div className="match-top">

                <div className="score-circle">

                    <CircularProgressbar

                        value={analysis.matchScore}

                        text={`${analysis.matchScore}%`}

                        styles={buildStyles({

                            textColor: "#fff",

                            pathColor: "#3B82F6",

                            trailColor: "#334155"

                        })}

                    />

                </div>

                <div>

                    <h2>

                        Resume Match Score

                    </h2>

                    <p>

                        {

                            analysis.matchScore >= 85

                                ? "Excellent Match"

                                : analysis.matchScore >= 70

                                ? "Good Match"

                                : "Needs Improvement"

                        }

                    </p>

                </div>

            </div>

            <div className="match-grid">

                <div className="match-box">

                    <h3>

                        <FaCheckCircle />

                        Matched Skills

                    </h3>

                    <div className="chips">

                        {

                            analysis.matchedSkills.map(skill => (

                                <span

                                    key={skill}

                                    className="chip success"

                                >

                                    {skill}

                                </span>

                            ))

                        }

                    </div>

                </div>

                <div className="match-box">

                    <h3>

                        <FaTimesCircle />

                        Missing Skills

                    </h3>

                    <div className="chips">

                        {

                            analysis.missingSkills.map(skill => (

                                <span

                                    key={skill}

                                    className="chip danger"

                                >

                                    {skill}

                                </span>

                            ))

                        }

                    </div>

                </div>

            </div>

            <div className="ai-box">

                <h3>

                    <FaRobot />

                    AI Suggestions

                </h3>

                {

                    analysis.suggestions.map((item, index) => (

                        <p key={index}>

                            • {item}

                        </p>

                    ))

                }

            </div>

        </motion.div>

    );

}

export default MatchResult;