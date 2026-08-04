import "../../styles/applicationstats.css";

import { motion } from "framer-motion";

import {

    FaBriefcase,

    FaUserCheck,

    FaAward,

    FaTimesCircle

} from "react-icons/fa";

function ApplicationStats({ stats }) {

    const cards = [

        {

            title: "Applications",

            value: stats.total,

            icon: <FaBriefcase />,

            color: "blue"

        },

        {

            title: "Interviews",

            value: stats.interview,

            icon: <FaUserCheck />,

            color: "purple"

        },

        {

            title: "Offers",

            value: stats.offer,

            icon: <FaAward />,

            color: "green"

        },

        {

            title: "Rejected",

            value: stats.rejected,

            icon: <FaTimesCircle />,

            color: "red"

        }

    ];

    return (

        <div className="stats-grid">

            {

                cards.map((card, index) => (

                    <motion.div

                        key={index}

                        className={`stat-card ${card.color}`}

                        initial={{

                            opacity:0,

                            y:30

                        }}

                        animate={{

                            opacity:1,

                            y:0

                        }}

                        transition={{

                            delay:index*0.15

                        }}

                        whileHover={{

                            y:-8,

                            scale:1.03

                        }}

                    >

                        <div className="stat-icon">

                            {card.icon}

                        </div>

                        <div>

                            <p>{card.title}</p>

                            <h2>{card.value}</h2>

                        </div>

                    </motion.div>

                ))

            }

        </div>

    );

}

export default ApplicationStats;