import "../../styles/assistant.css";

import {
    FaRobot,
    FaFileAlt,
    FaMicrophone,
    FaBriefcase,
    FaLightbulb
} from "react-icons/fa";

import { motion } from "framer-motion";

function AIAssistant() {

    return (

        <motion.div
            className="assistant-card"
            initial={{ opacity:0,x:-40 }}
            animate={{ opacity:1,x:0 }}
            transition={{ duration:.6 }}
        >

            <div className="assistant-header">

                <div className="assistant-avatar">

                    <FaRobot/>

                </div>

                <div>

                    <h2>AI Career Assistant</h2>

                    <p>Always here to help you</p>

                </div>

            </div>

            <div className="assistant-message">

                <h3>Hello, Vikhnesh 👋</h3>

                <p>

                    What would you like to improve today?

                </p>

            </div>

            <div className="assistant-actions">

                <button className="assistant-btn-primary">

                    <FaFileAlt/>

                    Analyse Resume

                </button>

                <button className="assistant-btn-secondary">

                    <FaMicrophone/>

                    Mock Interview

                </button>

                <button className="assistant-btn-secondary">

                    <FaBriefcase/>

                    Find Jobs

                </button>

            </div>

            <div className="assistant-tip">

                <FaLightbulb/>

                <div>

                    <h4>AI Tip</h4>

                    <p>

                        Add measurable achievements in your projects to improve
                        your ATS score.

                    </p>

                </div>

            </div>

        </motion.div>

    );

}

export default AIAssistant;