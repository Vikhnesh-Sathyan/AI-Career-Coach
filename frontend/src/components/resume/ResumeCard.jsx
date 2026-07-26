import "../../styles/resumecard.css";

import { motion } from "framer-motion";

import {
    FaFilePdf,
    FaCheckCircle,
    FaClock,
    FaWeightHanging,
    FaRocket
} from "react-icons/fa";

function ResumeCard({ file, onAnalyse }) {

    if (!file) return null;

    const fileSize = (file.size / 1024).toFixed(1);

    return (

        <motion.div

            className="resume-preview"

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .5 }}

        >

            <div className="resume-icon">

                <FaFilePdf />

            </div>

            <div className="resume-details">

                <h3>{file.name}</h3>

                <p>

                    <FaWeightHanging />

                    {fileSize} KB

                </p>

                <p>

                    <FaClock />

                    Uploaded Just Now

                </p>

                <p className="success">

                    <FaCheckCircle />

                    Upload Successful

                </p>

            </div>

            <button

                className="analyse-btn"

                onClick={onAnalyse}

            >

                <FaRocket />

                Analyse Resume

            </button>

        </motion.div>

    );

}

export default ResumeCard;