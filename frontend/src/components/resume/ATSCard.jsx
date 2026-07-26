import "../../styles/atscard.css";

import { motion } from "framer-motion";

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import CountUp from "react-countup";

function ATSCard() {

    const score = 84;

    return (

        <motion.div

            className="ats-card"

            initial={{ opacity:0, scale:.8 }}

            animate={{ opacity:1, scale:1 }}

            transition={{ duration:.7 }}

        >

            <div className="progress-wrapper">

                <CircularProgressbar

                    value={score}

                    strokeWidth={10}

                    styles={buildStyles({

                        pathColor:"#3B82F6",

                        trailColor:"#334155",

                        pathTransitionDuration:2.5

                    })}

                />

                <div className="progress-text">

                    <CountUp

                        end={score}

                        duration={2.5}

                    />

                    %

                </div>

            </div>

            <h2>

                ATS Score

            </h2>

            <p>

                Excellent Resume

            </p>

        </motion.div>

    );

}

export default ATSCard;