import "../styles/atspage.css";

import ATSCard from "../components/ats/ATSCard";

import {
    getLatestResumeAnalysis
} from "../services/resumeService";

import {
    useEffect,
    useState
} from "react";


function ATS() {

    const [analysis, setAnalysis] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // LOAD LATEST RESUME ANALYSIS
    // ==========================================

    useEffect(() => {

        const loadAnalysis = async () => {

            try {

                setLoading(true);

                setError("");


                const response =
                    await getLatestResumeAnalysis();


                if (response?.success) {

                    setAnalysis(
                        response.data
                    );

                }

                else {

                    setError(
                        response?.message ||
                        "Failed to load ATS analysis."
                    );

                }

            }

            catch (error) {

                console.error(
                    "ATS page error:",
                    error
                );


                if (
                    error.response?.status === 404
                ) {

                    setAnalysis(null);

                }

                else {

                    setError(
                        "Failed to load ATS analysis."
                    );

                }

            }

            finally {

                setLoading(false);

            }

        };


        loadAnalysis();

    }, []);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="ats-page">

                <div className="ats-page-header">

                    <span>
                        RESUME ANALYSIS
                    </span>

                    <h1>
                        ATS Score
                    </h1>

                </div>


                <div className="ats-empty-state">

                    <p>
                        Loading ATS analysis...
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="ats-page">

                <div className="ats-page-header">

                    <span>
                        RESUME ANALYSIS
                    </span>

                    <h1>
                        ATS Score
                    </h1>

                </div>


                <div className="ats-empty-state">

                    <h3>
                        Unable to load analysis
                    </h3>

                    <p>
                        {error}
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="ats-page">


            {/* ==================================
                HEADER
            ================================== */}

            <div className="ats-page-header">

                <span>
                    RESUME ANALYSIS
                </span>

                <h1>
                    ATS Score
                </h1>

                <p>
                    Analyse your resume to see
                    your ATS score, skills and
                    improvement suggestions.
                </p>

            </div>


            {/* ==================================
                ANALYSIS
            ================================== */}

            {

                analysis ? (

                    <ATSCard
                        analysis={analysis}
                    />

                ) : (

                    <div className="ats-empty-state">

                        <h3>
                            No Resume Analysis Yet
                        </h3>

                        <p>
                            Upload and analyse your
                            resume from the Resume page
                            to view your ATS score.
                        </p>

                    </div>

                )

            }


        </div>

    );

}


export default ATS;