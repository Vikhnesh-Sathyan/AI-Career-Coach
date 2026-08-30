import "../styles/atspage.css";

import ATSCard from "../components/ats/ATSCard";


function ATS() {

    const analysis = null;


    return (

        <div className="ats-page">

            <div className="ats-page-header">

                <span>
                    RESUME ANALYSIS
                </span>

                <h1>
                    ATS Score
                </h1>

                <p>
                    Analyse your resume to see your ATS score,
                    skills and improvement suggestions.
                </p>

            </div>


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
                            Upload and analyse your resume
                            from the Resume page to view
                            your ATS score.
                        </p>

                    </div>

                )

            }

        </div>

    );

}


export default ATS;