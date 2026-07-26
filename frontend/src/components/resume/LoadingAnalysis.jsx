import "../../styles/loadinganalysis.css";

import { motion } from "framer-motion";

function LoadingAnalysis() {

    return (

        <motion.div

            className="loading-card"

            initial={{ opacity:0 }}

            animate={{ opacity:1 }}

        >

            <h2>

                🤖 AI Resume Scanner

            </h2>

            <div className="progress">

                <div className="progress-bar"></div>

            </div>

            <div className="steps">

                <p>✅ Reading Resume</p>

                <p>✅ Extracting Skills</p>

                <p>⏳ Calculating ATS Score</p>

                <p>⏳ Generating Suggestions</p>

            </div>

        </motion.div>

    );

}

export default LoadingAnalysis;