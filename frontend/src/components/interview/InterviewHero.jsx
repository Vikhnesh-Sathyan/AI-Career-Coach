import "../../styles/interviewhero.css";

import { motion } from "framer-motion";

import {
    FaRobot,
    FaCode,
    FaUserTie,
    FaBrain,
    FaChartLine
} from "react-icons/fa";

function InterviewHero(){

    return(

        <motion.section

            className="interview-hero"

            initial={{opacity:0,y:40}}

            animate={{opacity:1,y:0}}

            transition={{duration:.7}}

        >

            <div className="hero-left">

                <span className="hero-tag">

                    AI Powered Mock Interview

                </span>

                <h1>

                    Practice Interviews Like You're In A Real Company

                </h1>

                <p>

                    Improve your confidence with AI-generated interview
                    questions, receive instant feedback, and track your
                    interview performance over time.

                </p>

                <div className="hero-features">

                    <div>

                        <FaCode/>

                        Technical Questions

                    </div>

                    <div>

                        <FaUserTie/>

                        HR Interviews

                    </div>

                    <div>

                        <FaBrain/>

                        AI Evaluation

                    </div>

                </div>

            </div>

            <div className="hero-right">

                <div className="hero-card">

                    <FaChartLine className="chart-icon"/>

                    <h2>

                        Interview Success

                    </h2>

                    <div className="score">

                        92%

                    </div>

                    <p>

                        Average score after completing
                        multiple AI mock interviews.

                    </p>

                </div>

            </div>

        </motion.section>

    );

}

export default InterviewHero;