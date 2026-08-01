import "../../styles/evaluationcard.css";

import { motion } from "framer-motion";

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import {
    FaRobot,
    FaStar
} from "react-icons/fa";

function EvaluationCard({ result }) {

    return (

        <motion.div

            className="evaluation-card"

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

        >

            <div className="evaluation-top">

                <div className="evaluation-progress">

                    <CircularProgressbar

                        value={result.score * 10}

                        text={`${result.score}/10`}

                        styles={buildStyles({

                            pathColor:"#2563EB",

                            textColor:"#fff",

                            trailColor:"#1E293B"

                        })}

                    />

                </div>

                <div>

                    <h2>

                        <FaRobot/>

                        AI Evaluation

                    </h2>

                    <p>

                        Your interview answer has been evaluated.

                    </p>

                </div>

            </div>

            <div className="feedback-box">

                <h3>

                    <FaStar/>

                    Feedback

                </h3>

                <p>

                    {result.feedback}

                </p>

            </div>

        </motion.div>

    );

}

export default EvaluationCard;