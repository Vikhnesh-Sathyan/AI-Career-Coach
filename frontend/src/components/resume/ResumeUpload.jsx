import "../../styles/resumeupload.css";

import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRef, useState } from "react";

import ResumeCard from "./ResumeCard";
import ATSCard from "./ATSCard";
import SkillsCard from "./SkillsCard";
import SuggestionsCard from "./SuggestionsCard";
import LoadingAnalysis from "./LoadingAnalysis";

function ResumeUpload() {

    const inputRef = useRef();

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [showAnalysis, setShowAnalysis] = useState(false);

    const handleFile = (e) => {

        if (e.target.files.length > 0) {

            setFile(e.target.files[0]);

            setShowAnalysis(false);

            setLoading(false);

        }

    };

    const handleAnalyse = () => {

        setLoading(true);

        setShowAnalysis(false);

        setTimeout(() => {

            setLoading(false);

            setShowAnalysis(true);

        }, 2500);

    };

    return (

        <>

            <motion.div

                className="upload-card"

                initial={{ opacity: 0, y: 40 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: .6 }}

            >

                <FaCloudUploadAlt className="upload-icon" />

                <h2>

                    Upload Resume

                </h2>

                <p>

                    Drag & Drop your resume here

                    <br />

                    or click below to browse.

                </p>

                <input

                    ref={inputRef}

                    type="file"

                    accept=".pdf"

                    hidden

                    onChange={handleFile}

                />

                <button

                    className="browse-btn"

                    onClick={() => inputRef.current.click()}

                >

                    Browse Resume

                </button>

            </motion.div>

            <ResumeCard

                file={file}

                onAnalyse={handleAnalyse}

            />

            {

                loading &&

                    <LoadingAnalysis/>

            }

            {

                showAnalysis &&

                <div className="analysis-grid">

                    <ATSCard />

                    <SkillsCard />

                    <SuggestionsCard />

                </div>

            }

        </>

    );

}

export default ResumeUpload;