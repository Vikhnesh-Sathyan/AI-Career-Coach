import "../../styles/resumepreview.css";

import { FaFilePdf, FaCheckCircle, FaSyncAlt } from "react-icons/fa";

import { motion } from "framer-motion";

function ResumePreview({ analysis, onChangeResume }) {

    return (

        <motion.div

            className="resume-preview"

            initial={{ opacity: 0, x: -30 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: .5 }}

        >

            <div className="resume-top">

                <FaFilePdf className="pdf-icon"/>

                <div>

                    <h3>

                        Resume.pdf

                    </h3>

                    <span>

                        <FaCheckCircle/>

                        Resume Ready

                    </span>

                </div>

            </div>

            <div className="resume-stats">

                <div>

                    <h2>

                        {analysis?.atsScore || 0}%

                    </h2>

                    <p>ATS Score</p>

                </div>

                <div>

                    <h2>

                        {analysis?.skills?.length || 0}

                    </h2>

                    <p>Skills</p>

                </div>

            </div>

            <button

                className="change-btn"

                onClick={onChangeResume}

            >

                <FaSyncAlt/>

                Change Resume

            </button>

        </motion.div>

    );

}

export default ResumePreview;