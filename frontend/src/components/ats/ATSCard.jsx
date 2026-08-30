import "../../styles/atscard.css";

import { motion } from "framer-motion";

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import {
    useEffect,
    useState
} from "react";

import "react-circular-progressbar/dist/styles.css";


function ATSCard({ analysis }) {


    // ==========================================
    // FINAL ATS SCORE
    // ==========================================

    const finalScore =
        analysis?.atsScore || 0;


    // ==========================================
    // ANIMATED SCORE
    // ==========================================

    const [score, setScore] =
        useState(0);


    useEffect(() => {

        setScore(0);


        let current = 0;


        const timer = setInterval(() => {

            current++;

            setScore(current);


            if (
                current >= finalScore
            ) {

                clearInterval(timer);

            }

        }, 20);


        return () =>
            clearInterval(timer);


    }, [finalScore]);


    // ==========================================
    // DYNAMIC STATS
    // ==========================================

    const stats = [

        {
            title:
                "Keyword Match",

            value:
                analysis?.keywordMatch || 0
        },


        {
            title:
                "Formatting",

            value:
                analysis?.formatting || 0
        },


        {
            title:
                "Readability",

            value:
                analysis?.readability || 0
        },


        {
            title:
                "Projects",

            value:
                analysis?.projects || 0
        }

    ];


    // ==========================================
    // SCORE STATUS
    // ==========================================

    const getScoreLabel = () => {

        if (finalScore >= 80) {

            return {
                text:
                    "Excellent Resume",

                className:
                    "excellent"
            };

        }


        if (finalScore >= 60) {

            return {
                text:
                    "Good Resume",

                className:
                    "good"
            };

        }


        if (finalScore >= 40) {

            return {
                text:
                    "Needs Improvement",

                className:
                    "average"
            };

        }


        return {

            text:
                "Needs Improvement",

            className:
                "poor"

        };

    };


    const scoreStatus =
        getScoreLabel();


    return (

        <motion.div

            className="ats-card"

            initial={{
                opacity: 0,
                y: 30
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.7
            }}

        >


            {/* ==============================
                ATS HEADER
            ============================== */}

            <div className="ats-top">


                <div className="progress-wrapper">

                    <CircularProgressbar

                        value={score}

                        strokeWidth={10}

                        styles={buildStyles({

                            pathColor:
                                "#8b5cf6",

                            trailColor:
                                "#334155"

                        })}

                    />


                    <div
                        className="progress-text"
                    >

                        {score}%

                    </div>

                </div>


                <div>

                    <h2>
                        ATS Score
                    </h2>


                    <span
                        className={
                            scoreStatus.className
                        }
                    >

                        {
                            scoreStatus.text
                        }

                    </span>

                </div>


            </div>



            {/* ==============================
                SCORE DETAILS
            ============================== */}

            <div className="score-details">


                {

                    stats.map(
                        (item) => (

                            <div

                                key={
                                    item.title
                                }

                                className="
                                    score-item
                                "

                            >


                                <div
                                    className="
                                        score-header
                                    "
                                >

                                    <span>

                                        {
                                            item.title
                                        }

                                    </span>


                                    <strong>

                                        {
                                            item.value
                                        }%

                                    </strong>

                                </div>


                                <div
                                    className="
                                        progress-line
                                    "
                                >

                                    <div

                                        className="
                                            progress-fill
                                        "

                                        style={{

                                            width:
                                                `${item.value}%`

                                        }}

                                    />

                                </div>


                            </div>

                        )
                    )

                }


            </div>


        </motion.div>

    );

}


export default ATSCard;