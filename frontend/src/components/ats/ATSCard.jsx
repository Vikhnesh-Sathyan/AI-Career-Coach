import "../../styles/atscard.css";

import { motion } from "framer-motion";

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import {
    FaCheckCircle,
    FaLightbulb
} from "react-icons/fa";

import {
    useEffect,
    useState
} from "react";

import "react-circular-progressbar/dist/styles.css";


function ATSCard({ analysis }) {


    // ==========================================
    // FINAL ATS SCORE
    // ==========================================

    const finalScore = Math.min(
        Number(analysis?.atsScore) || 0,
        100
    );


    // ==========================================
    // ANIMATED SCORE
    // ==========================================

    const [score, setScore] = useState(0);


    useEffect(() => {

        setScore(0);

        if (finalScore === 0) {
            return;
        }

        let current = 0;

        const timer = setInterval(() => {

            current += 1;

            if (current >= finalScore) {

                setScore(finalScore);

                clearInterval(timer);

                return;

            }

            setScore(current);

        }, 20);


        return () => {
            clearInterval(timer);
        };

    }, [finalScore]);


    // ==========================================
    // ATS DETAILS
    // ==========================================

    const stats = [

        {
            title: "Keyword Match",

            value: Math.min(
                Number(analysis?.keywordMatch) || 0,
                100
            )
        },

        {
            title: "Formatting",

            value: Math.min(
                Number(analysis?.formatting) || 0,
                100
            )
        },

        {
            title: "Readability",

            value: Math.min(
                Number(analysis?.readability) || 0,
                100
            )
        },

        {
            title: "Projects",

            value: Math.min(
                Number(analysis?.projects) || 0,
                100
            )
        }

    ];


    // ==========================================
    // DETECTED SKILLS
    // ==========================================

    const skills =
        Array.isArray(analysis?.skills)
            ? analysis.skills
            : [];


    // ==========================================
    // SUGGESTIONS
    // ==========================================

    const suggestions =
        Array.isArray(analysis?.suggestions)
            ? analysis.suggestions
            : [];


    // ==========================================
    // SCORE STATUS
    // ==========================================

    const getScoreLabel = () => {

        if (finalScore >= 80) {

            return {
                text: "Excellent Resume",
                className: "excellent"
            };

        }


        if (finalScore >= 60) {

            return {
                text: "Good Resume",
                className: "good"
            };

        }


        if (finalScore >= 40) {

            return {
                text: "Needs Improvement",
                className: "average"
            };

        }


        return {
            text: "Needs Improvement",
            className: "poor"
        };

    };


    const scoreStatus =
        getScoreLabel();


    // ==========================================
    // UI
    // ==========================================

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

            {/* =================================
                ATS SCORE
            ================================= */}

            <div className="ats-top">

                <div className="progress-wrapper">

                    <CircularProgressbar

                        value={score}

                        maxValue={100}

                        strokeWidth={10}

                        styles={buildStyles({

                            pathColor: "#8b5cf6",

                            trailColor: "#334155",

                            strokeLinecap: "round"

                        })}

                    />

                    <div className="progress-text">

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

                        {scoreStatus.text}

                    </span>

                </div>

            </div>


            {/* =================================
                SCORE DETAILS
            ================================= */}

            <div className="score-details">

                {stats.map((item) => (

                    <div
                        key={item.title}
                        className="score-item"
                    >

                        <div className="score-header">

                            <span>
                                {item.title}
                            </span>

                            <strong>
                                {item.value}%
                            </strong>

                        </div>


                        <div className="progress-line">

                            <motion.div

                                className="progress-fill"

                                initial={{
                                    width: 0
                                }}

                                animate={{
                                    width:
                                        `${item.value}%`
                                }}

                                transition={{
                                    duration: 0.8
                                }}

                            />

                        </div>

                    </div>

                ))}

            </div>


            {/* =================================
                DETECTED SKILLS
            ================================= */}

            <div className="ats-section">

                <div className="ats-section-title">

                    <FaCheckCircle />

                    <h3>
                        Detected Skills
                    </h3>

                </div>


                {skills.length > 0 ? (

                    <div className="ats-skills">

                        {skills.map(
                            (skill, index) => (

                                <span
                                    key={`${skill}-${index}`}
                                    className="ats-skill"
                                >

                                    {skill}

                                </span>

                            )
                        )}

                    </div>

                ) : (

                    <p className="ats-empty-text">

                        No technical skills detected.

                    </p>

                )}

            </div>


            {/* =================================
                IMPROVEMENT SUGGESTIONS
            ================================= */}

            <div className="ats-section">

                <div className="ats-section-title">

                    <FaLightbulb />

                    <h3>
                        Improvement Suggestions
                    </h3>

                </div>


                {suggestions.length > 0 ? (

                    <div className="ats-suggestions">

                        {suggestions.map(
                            (suggestion, index) => (

                                <div
                                    key={index}
                                    className="ats-suggestion"
                                >

                                    <span>
                                        {index + 1}
                                    </span>

                                    <p>
                                        {suggestion}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                ) : (

                    <p className="ats-empty-text">

                        Your resume looks good.
                        No major suggestions at the moment.

                    </p>

                )}

            </div>

        </motion.div>

    );

}


export default ATSCard;