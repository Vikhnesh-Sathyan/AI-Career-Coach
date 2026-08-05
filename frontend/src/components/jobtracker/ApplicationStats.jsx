import "../../styles/applicationstats.css";

import { motion } from "framer-motion";

import {
    FaBriefcase,
    FaUserCheck,
    FaAward,
    FaTimesCircle
} from "react-icons/fa";

function ApplicationStats({ applications }) {

    const total = applications.length;

    const interview = applications.filter(
        app => app.status === "Interview"
    ).length;

    const offer = applications.filter(
        app => app.status === "Offer"
    ).length;

    const rejected = applications.filter(
        app => app.status === "Rejected"
    ).length;

    const cards = [

        {
            title: "Applications",
            value: total,
            icon: <FaBriefcase />,
            color: "blue"
        },

        {
            title: "Interviews",
            value: interview,
            icon: <FaUserCheck />,
            color: "purple"
        },

        {
            title: "Offers",
            value: offer,
            icon: <FaAward />,
            color: "green"
        },

        {
            title: "Rejected",
            value: rejected,
            icon: <FaTimesCircle />,
            color: "red"
        }

    ];

    return (

        <div className="stats-grid">

            {

                cards.map((card, index) => (

                    <motion.div

                        key={card.title}

                        className={`stat-card ${card.color}`}

                        initial={{

                            opacity: 0,

                            y: 30

                        }}

                        animate={{

                            opacity: 1,

                            y: 0

                        }}

                        transition={{

                            delay: index * 0.15

                        }}

                        whileHover={{

                            y: -8,

                            scale: 1.03

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