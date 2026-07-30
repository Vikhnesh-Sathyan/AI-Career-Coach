import "../../styles/jdinput.css";

import { useState } from "react";

import {
    FaUpload,
    FaSearch,
    FaFileAlt
} from "react-icons/fa";

import { analyzeJobMatch } from "../../services/jobMatcherService";

import MatchResult from "./MatchResult";

function JDInput() {

    const [jobDescription, setJobDescription] = useState("");

    const [resume, setResume] = useState(null);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {

        if (!resume) {

            alert("Please upload your resume.");

            return;

        }

        if (jobDescription.trim() === "") {

            alert("Please paste a Job Description.");

            return;

        }

        try {

            setLoading(true);

            const data = await analyzeJobMatch(
                resume,
                jobDescription
            );

            setResult(data);

        } catch (error) {

            console.error(error);

            alert("Failed to analyze job match.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="jd-card">

            <h2>

                Job Description

            </h2>

            <p>

                Paste the Job Description and upload your resume.

            </p>

            <textarea

                placeholder="Paste Job Description here..."

                value={jobDescription}

                onChange={(e) => setJobDescription(e.target.value)}

            />

            <div className="upload-section">

                <label className="upload-btn">

                    <FaUpload />

                    Upload Resume

                    <input

                        type="file"

                        accept=".pdf"

                        hidden

                        onChange={(e) => setResume(e.target.files[0])}

                    />

                </label>

                {

                    resume && (

                        <div className="resume-name">

                            <FaFileAlt />

                            {resume.name}

                        </div>

                    )

                }

            </div>

            <button

                className="analyze-btn"

                onClick={handleAnalyze}

                disabled={loading}

            >

                <FaSearch />

                {

                    loading

                        ? "Analyzing..."

                        : "Analyze Match"

                }

            </button>

            {

                result && result.success && (

                    <MatchResult analysis={result} />

                )

            }

        </div>

    );

}

export default JDInput;