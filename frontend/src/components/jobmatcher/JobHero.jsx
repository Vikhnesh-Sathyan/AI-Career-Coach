import "../../styles/jobhero.css";

import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

function JobHero() {

    return (

        <motion.div

            className="job-hero"

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .6 }}

        >

            <div>

                <div className="job-icon">

                    <FaBriefcase />

                </div>

                <h1>

                    AI Job Matcher

                </h1>

                <p>

                    Match your resume with any Job Description and discover
                    your ATS compatibility, missing skills and AI suggestions.

                </p>

            </div>

        </motion.div>

    );

}

export default JobHero;