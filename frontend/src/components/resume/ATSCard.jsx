import "../../styles/atscard.css";

import { motion } from "framer-motion";

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import { useEffect, useState } from "react";

import "react-circular-progressbar/dist/styles.css";

function ATSCard({ analysis }) {

    const finalScore = analysis?.atsScore || 0;

    const [score, setScore] = useState(0);

    useEffect(() => {

        setScore(0);

        let current = 0;

        const timer = setInterval(() => {

            current++;

            setScore(current);

            if (current >= finalScore) {

                clearInterval(timer);

            }

        }, 25);

        return () => clearInterval(timer);

    }, [finalScore]);

    const stats = [

        {
            title: "Keyword Match",
            value: 89
        },

        {
            title: "Formatting",
            value: 82
        },

        {
            title: "Readability",
            value: 91
        },

        {
            title: "Projects",
            value: 80
        }

    ];

    return (

        <motion.div

            className="ats-card"

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .7 }}

        >

            <div className="ats-top">

                <div className="progress-wrapper">

                    <CircularProgressbar

                        value={score}

                        strokeWidth={10}

                        styles={buildStyles({

                            pathColor: "#3B82F6",

                            trailColor: "#334155"

                        })}

                    />

                    <div className="progress-text">

                        {score}%

                    </div>

                </div>

                <div>

                    <h2>ATS Score</h2>

                    <span className="excellent">

                        Excellent Resume

                    </span>

                </div>

            </div>

            <div className="score-details">

                {

                    stats.map((item) => (

                        <div
                            key={item.title}
                            className="score-item"
                        >

                            <div className="score-header">

                                <span>{item.title}</span>

                                <strong>{item.value}%</strong>

                            </div>

                            <div className="progress-line">

                                <div

                                    className="progress-fill"

                                    style={{
                                        width: `${item.value}%`
                                    }}

                                ></div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </motion.div>

    );

}

export default ATSCard;