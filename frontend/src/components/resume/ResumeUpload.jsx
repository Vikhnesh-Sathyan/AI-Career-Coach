import "../../styles/resumeupload.css";

import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRef, useState } from "react";

import ResumeCard from "./ResumeCard";
import ATSCard from "../ats/ATSCard";
import SkillsCard from "./SkillsCard";
import SuggestionsCard from "./SuggestionsCard";
import LoadingAnalysis from "../ats/LoadingAnalysis";
import ResumeOverview from "./ResumeOverview";
import ResumeHealth from "./ResumeHealth";

import { uploadResume } from "../../services/resumeService";

function ResumeUpload() {

    // ==========================================
    // REFERENCES
    // ==========================================

    const inputRef = useRef();


    // ==========================================
    // STATES
    // ==========================================

    const [file, setFile] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [showAnalysis, setShowAnalysis] =
        useState(false);

    const [analysis, setAnalysis] =
        useState(null);


    // ==========================================
    // HANDLE FILE SELECTION
    // ==========================================

    const handleFile = (e) => {

        const selectedFile =
            e.target.files?.[0];


        if (selectedFile) {

            setFile(selectedFile);

            // Reset previous analysis
            setAnalysis(null);

            setShowAnalysis(false);

            setLoading(false);

        }

    };


    // ==========================================
    // ANALYSE RESUME
    // ==========================================

    const handleAnalyse = async () => {

        if (!file) {

            alert(
                "Please select a resume."
            );

            return;

        }


        try {

            setLoading(true);

            setShowAnalysis(false);


            const formData =
                new FormData();


            formData.append(
                "resume",
                file
            );


            const response =
                await uploadResume(
                    formData
                );


            // Save analysis result
            setAnalysis(response);


            // Small loading animation delay
            setTimeout(() => {

                setLoading(false);

                setShowAnalysis(true);

            }, 1500);

        }

        catch (error) {

            console.error(
                "Resume analysis error:",
                error
            );


            setLoading(false);

            setShowAnalysis(false);


            alert(
                error.response?.data?.message ||
                "Resume upload failed."
            );

        }

    };


    return (

        <>

            {/* ==================================
                RESUME UPLOAD CARD
            ================================== */}

            <motion.div

                className="upload-card"

                initial={{
                    opacity: 0,
                    y: 40
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 0.6
                }}

            >

                <FaCloudUploadAlt
                    className="upload-icon"
                />


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

                    type="button"

                    onClick={() =>
                        inputRef.current?.click()
                    }

                >

                    Browse Resume

                </button>

            </motion.div>


            {/* ==================================
                SELECTED RESUME
            ================================== */}

            <ResumeCard

                file={file}

                onAnalyse={handleAnalyse}

            />


            {/* ==================================
                LOADING
            ================================== */}

            {

                loading && (

                    <LoadingAnalysis />

                )

            }


            {/* ==================================
                RESUME ANALYSIS
            ================================== */}

            {

                showAnalysis &&
                analysis && (

                    <div className="analysis-grid">

                        <ResumeOverview
                            analysis={analysis}
                        />


                        <ATSCard
                            analysis={analysis}
                        />


                        <SkillsCard
                            analysis={analysis}
                        />


                        <ResumeHealth
                            analysis={analysis}
                        />


                        <SuggestionsCard
                            analysis={analysis}
                        />

                    </div>

                )

            }

        </>

    );

}


export default ResumeUpload;